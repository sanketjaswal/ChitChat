import { Request, Response } from 'express';
import { Conversation, createConversation, getConversationByUserIds } from '../models/conversation_model';
import { client } from '../db/connectToPostgres';
// import Colors from 'colors';

export const addConversation = async (req: Request<object, object, Conversation>, res: Response) => {
  try {
    const { name } = req.body;
    const values = [name, 'direct'];
    // console.log(values);

    const query: string = createConversation();
    const result = await client.query(query, values);
    console.log(result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const getConversationIdByUserIds = async (req: Request, res: Response) => {
  try {
    const ids = req.params.ids;
    const values = ids.split('.');

    const query = getConversationByUserIds();
    const result = await client.query(query, values);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
