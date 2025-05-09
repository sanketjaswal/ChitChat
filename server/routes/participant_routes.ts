import { addNewParticipants, getParticipantsControl } from './../controller/participant_controller';
import express from 'express';

export const participantRouter = express.Router();

participantRouter.post('/addParticipant', addNewParticipants);

participantRouter.get('/getUserParticipants/:userId', getParticipantsControl);
