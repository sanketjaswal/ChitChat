import { api } from '../apis';
import { ConvoIds, ConvoNames } from '../models';

interface ConversationResponse {
  conversationid: number | undefined;
}

interface CreateConversationResponse {
  conversation_type: string | undefined;
  id: number | undefined;
  name: string | undefined;
}

// Get conversation between 2 users
export const getConversation = async ({ userOne, userTwo }: ConvoIds) => {
  // console.log('userOne', userOne, ', userTwo', userTwo);
  const res = await api.get<ConversationResponse>(
    `/api/conversations/getConversationId/${userOne}.${userTwo}`,
  );

  // console.log(res);
  return res?.data;
};

//Create New converation using 2 users names
export const createNewConversation = async ({
  userOne,
  userTwo,
}: ConvoNames) => {
  console.log('userOne', userOne, ', userTwo', userTwo);
  const res = await api.post<CreateConversationResponse>(
    `/api/conversations/conversation`,
    {
      method: 'POST',
      body: JSON.stringify({
        name: (userOne ?? 'user1') + (userTwo ?? 'user2'),
      }),
    },
  );

  // console.log(res);
  return res?.data;
};
