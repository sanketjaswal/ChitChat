import bcrypt from 'bcrypt';
import { User } from '../models/user_model';

//Hash Password
export const generatePasswordHash = async (password: User['password']) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  return hashedpassword;
};

//Check Password
export const checkPassword = async (password: string, passwordHash: string) => {
  return await bcrypt.compare(password, passwordHash);
};
