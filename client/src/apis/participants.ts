import { api } from './api';
import { User, ParticipantsValues } from '../models';

interface NewUser extends User {
  id: number;
  profilepic: string;
}

export const getParticipants = async (userId: number) => {
  const res = await api.get<NewUser[]>(
    `/api/participants/getUserParticipants/${userId}`,
  );

  //   console.log('getParticipants', res.data);
  return res?.data;
};

export const createNewParticipants = async ({
  userId,
  secondUserId,
  conversationId,
}: ParticipantsValues) => {
  console.log(userId, secondUserId, conversationId);

  await api.post(`/api/participants/addParticipant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      secondUserId: secondUserId,
      conversationId: conversationId,
    }),
  });
};
