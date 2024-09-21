import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateJWTandStore = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'basic_secret', {
    expiresIn: '1d',
  });

  localStorage.setItem('chatUser', token);
  // return token;
};

export default generateJWTandStore;
