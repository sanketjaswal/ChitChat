import Colors from 'colors';
import { Request, Response } from 'express';
// import { Conversation, createConversation } from '../models/conversation_model';
import { client } from '../db/connectToPostgres';
import { createMessage, getMessagesByConvoIds, Message } from '../models/message_model';

export const addMessage = async (req: Request<object, object, Message>, res: Response) => {
  try {
    const { conversationId, senderId, content } = req.body;
    const values = [conversationId, senderId, content];
    console.log('values : ', values);

    const query = await createMessage();
    const result = await client.query(query, values);
    console.log(result.rows);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const ids = req.params.ids;
    const convoId = Number(ids);
    const query = getMessagesByConvoIds();
    const result = await client.query(query, [convoId]);
    console.log(Colors.blue(result.rows[0]));
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
