import { createPartcipant, getUserParticipants } from './../models/participant_model';
import { Request, Response } from 'express';
import { client } from '../db/connectToPostgres';

export const addNewParticipants = async (req: Request, res: Response) => {
  try {
    const { userId, secondUserId, conversationId } = req.body;
    const firstValue = [userId, conversationId];
    const secondValue = [secondUserId, conversationId];
    console.log('Participants values: ', userId, secondUserId, conversationId);

    const query = createPartcipant();
    const result1 = await client.query(query, firstValue);
    const result2 = await client.query(query, secondValue);

    console.log(result1.rows[0]);
    console.log(result2.rows[0]);
    const ressss = [result1.rows[0], result2.rows[0]];
    return res.status(200).json(ressss);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const getParticipantsControl = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const values = [userId];
    const query = getUserParticipants();
    const result = await client.query(query, values);

    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
