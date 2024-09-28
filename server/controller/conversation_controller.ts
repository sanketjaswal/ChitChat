import { Request, Response } from 'express';
import { Conversation, createConversation } from '../models/conversation_model';
import { client } from '../db/connectToPostgres';

export const addConversation = async (req: Request<object, object, Conversation>, res: Response) => {
  try {
    const { name, conversationType } = req.body;
    const values = [name, conversationType];
    console.log(name, conversationType);

    const query = await createConversation();
    const result = await client.query(query, values);
    console.log(res);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
