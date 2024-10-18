import { api } from '../apis';
import { User } from '../models';

type Login = Pick<User, 'username' | 'password'>;

interface AuthResponse {
  token: string;
}

//Login API
export const login = async (data: Login) => {
  const res = await api.post<AuthResponse>('/api/users/login', data);

  return res?.data;
};

// Register api
export const register = async (user: User) => {
  const res = await api.post<AuthResponse>('/api/users/signup', {
    ...user,
  });

  return res?.data;
};

// find User By Username API
export const findUserByUsername = async (searchUsername: string) => {
  const res = await api.get(`/api/users/searchUser/${searchUsername}`);

  return res?.data;
};
