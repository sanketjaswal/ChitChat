import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { LocalStorage } from 'node-localstorage';

dotenv.config();

// const localstorage = new LocalStorage('./');

const generateJWTandStore = (user: unknown) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET || 'basic_secret', {
    expiresIn: '1d',
  });

  return token;
};

export default generateJWTandStore;
