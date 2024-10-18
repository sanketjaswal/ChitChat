import { api } from './api';
import { User } from '../models';

interface NewUser extends User {
  id?: number;
  profilepic: string;
}

export const getParticipants = async (userId: number | undefined) => {
  const res = await api.get<NewUser[]>(
    `/api/participants/getUserParticipants/${userId}`,
  );

  //   console.log('getParticipants', res.data);
  return res?.data;
};
