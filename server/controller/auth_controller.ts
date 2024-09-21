import { Request, Response } from 'express';
import { User, createUser, findOneUser, getUsers } from '../models/user_model';
import { client } from '../db/connectToPostgres';
import generateJWTandStore from '../utils/generateJWTtoken';
import bcrypt from 'bcrypt';

export const registerControl = async (req: Request<object, object, User>, res: Response) => {
  try {
    const { name, username, password, confirmPassword, gender, email } = req.body;
    const query = await createUser();

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords dont match' });
    }

    // console.log(query);

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let profilePic: string;

    if (gender === 'male') {
      profilePic = boyProfilePic;
    } else {
      profilePic = girlProfilePic;
    }

    const values = [name, username, hashedpassword, gender, email, profilePic];

    const result = await client.query(query, values);
    console.log(result);
    const addeduser = result.rows[0];

    return res.status(201).json(addeduser);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const loginControl = async (req: Request<object, object, User>, res: Response) => {
  const { username, password } = req.body;
  const query = await findOneUser(username);
  const result = await client.query(query);
  const foundUser = result?.rows[0];

  console.log(foundUser);

  const isPasswordCorrect = await bcrypt.compare(password, foundUser?.password || '');

  if (!foundUser || !isPasswordCorrect) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = generateJWTandStore(foundUser?.id);
  console.log(token);

  return res.status(201).json(foundUser);
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
