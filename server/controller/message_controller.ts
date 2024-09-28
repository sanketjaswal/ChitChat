import { Request, Response } from 'express';
// import { Conversation, createConversation } from '../models/conversation_model';
import { client } from '../db/connectToPostgres';
import { createMessage, Message } from '../models/message_model';

export const addMessage = async (req: Request<object, object, Message>, res: Response) => {
  try {
    const { conversationId, senderId, content } = req.body;
    const values = [conversationId, senderId, content];
    console.log(values);

    const query = await createMessage();
    const result = await client.query(query, values);
    console.log(res);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
