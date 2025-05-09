import { client } from '../db/connectToPostgres';
import * as yup from 'yup';

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      gender VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      profilePic VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await client.query(query);
};

export const userSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().min(3).required(),
  gender: yup.string().required(),
  email: yup.string().email().required(),
  profilePic: yup.string().required(),
});

export const loginSchema = yup.object({
  username: userSchema.fields.username,
  password: userSchema.fields.password,
});

// export const loginSchema = yup.object({
//   username: yup.string().required(),
//   password: yup.string().min(3).required(),
// });

export interface User {
  name: string;
  username: string;
  password: string;
  gender: string;
  email: string;
  profilePic: string;
}

export const createNewUserQuery = () =>
  'INSERT INTO users (name, username, password, gender, email, profilePic) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

export const fingUserByUsernameQuery = (username: string) => `SELECT * FROM users WHERE username = '${username}';`;

export const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const res = await client.query(query);
  return res.rows;
};

export const findUserByUsername = async (username: string) => {
  const res = await client.query<User>(fingUserByUsernameQuery(username));
  return res.rows;
};
