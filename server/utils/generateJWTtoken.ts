import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LocalStorage } from 'node-localstorage';

dotenv.config();

const localstorage = new LocalStorage('./');

const generateJWTandStore = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'basic_secret', {
    expiresIn: '1d',
  });

  localstorage.setItem('chatUser', token);
  return token;
};

export default generateJWTandStore;
