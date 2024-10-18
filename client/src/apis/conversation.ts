import { api } from '../apis';
import { ConvoIds } from '../models';

interface ConversationResponse {
  conversationid: number | undefined;
}

// Get conversation between 2 users
export const getConversation = async ({ userOne, userTwo }: ConvoIds) => {
  console.log('userOne', userOne, ', userTwo', userTwo);
  const res = await api.get<ConversationResponse>(
    `/api/conversations/getConversationId/${userOne}.${userTwo}`,
  );

  return res?.data;
};

//Create New converation using 2 users names
// export const createNewConversationwithUsername = async (data) => {
//   const res = await api.post('/api/users/login');

//   return res?.data;
// };
