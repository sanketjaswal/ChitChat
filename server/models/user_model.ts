import { client } from '../db/connectToPostgres';

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

export interface User {
  name: string;
  username: string;
  password: string;
  gender: string;
  email: string;
  profilePic: string;
  confirmPassword: string;
}

export const createUser = async () => {
  const query =
    'INSERT INTO users (name, username, password, gender, email, profilePic) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  return query;
};

export const findOneUser = async (username: string) => {
  const query = `SELECT * FROM users WHERE username = '${username}' LIMIT 1;`;
  return query;
};

export const getUsers = async () => {
  const query = 'SELECT * FROM users';
  const res = await client.query(query);
  return res.rows;
};
