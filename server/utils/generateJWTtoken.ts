import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateJWTandStore = (user: unknown) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET || 'basic_secret', {
    expiresIn: '1d',
  });

  return token;
};
