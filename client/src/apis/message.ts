import { api } from './api';
import { MessageValues } from '../models';

export const createNewMessage = async ({
  senderId,
  conversationId,
  content,
}: MessageValues) => {
  console.log(senderId, conversationId, content);

  try {
    const res = await api.post(`/api/messages/addmessage`, {
      senderId,
      conversationId,
      content,
    });

    console.log('res', res);
    return res;
  } catch (error) {
    console.error('Error sending Message', error);
  }
};

interface MessageResponse {
  id: number | undefined;
  conversation_id: number | undefined;
  sender_id: number | undefined;
  content: string | undefined;
}

export const fetchAllMessages = async (room: number | undefined) => {
  try {
    if (room) {
      const res = await api.get<MessageResponse[]>(
        `/api/messages/getmessages/${room}`,
      );

      // console.log(res.data);
      return res.data;
    }
  } catch (error) {
    console.error('Error getting Message', error);
  }
};
