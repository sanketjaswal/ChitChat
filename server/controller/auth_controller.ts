import { Request, Response } from 'express';

import {
  User,
  createNewUserQuery,
  fingUserByUsernameQuery,
  getAllUsers,
  userSchema,
  loginSchema,
} from '../models/user_model';
import { checkPassword, generatePasswordHash, generateJWTandStore, generateProfilePic } from './../utils';
import { client } from '../db/connectToPostgres';

interface AuthResponse {
  token?: string;
  error?: string | unknown;
}

export const registerControl = async (req: Request<object, object, User>, res: Response<AuthResponse>) => {
  try {
    const { name, username, password, gender, email } = req.body;

    // if (!name || !username || !email) {
    //   return res.status(404).json({ error: 'Name, username, and email are required' });
    // }

    //picture assignation
    const profilePic = generateProfilePic({ username, gender });

    //validation
    await userSchema.validate({
      name: name,
      username: username,
      password: password,
      gender: gender,
      email: email,
      profilePic: profilePic,
    });

    //Hash Password
    const hashedPassword = await generatePasswordHash(password);

    //set values
    const values = [name, username, hashedPassword, gender, email, profilePic];

    // console.log(values);

    //get query
    const query = createNewUserQuery();

    //api call
    const result = await client.query(query, values);
    console.log(result);
    const addeduser = result.rows[0];

    //Generate JWT Token
    const token = generateJWTandStore(addeduser);

    //return response
    return res.status(201).json({
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const loginControl = async (req: Request<object, object, User>, res: Response<AuthResponse>) => {
  const { username, password } = req.body;

  //get query
  const query = fingUserByUsernameQuery(username);

  //validation
  await loginSchema.validate({
    username: username,
    password: password,
  });

  //api call
  const result = await client.query(query);
  const foundUser = result?.rows[0];

  //Check Password
  const isPasswordCorrect = await checkPassword(password, foundUser?.password || '');

  //User and password Validadtion
  if (!foundUser || !isPasswordCorrect) {
    return console.error('Invalid username or password');
  }

  //generate JWT Token
  const token = generateJWTandStore(foundUser);

  //Return Response
  return res.status(201).json({
    token: token,
  });

  //Token conversion to data
  // const base64 = token.split('.')[1];
  // const tokenPayload = JSON.parse(Buffer.from(base64, 'base64').toString());
  // console.log('base64', base64);
  // console.log('tokenPayload', tokenPayload);
};

export const logoutControl = (req: Request<object, object, User>, res: Response) => {
  try {
    // localstorage.removeItem('chat-user');
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.log('Error in Logout Controller', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listUsers = async (req: Request<object, object, User>, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const searchUserConrol = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    if (!username) {
      return console.log('username not provided');
    }
    const query = fingUserByUsernameQuery(username);
    const result = await client.query<User>(query);
    // console.log(result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
