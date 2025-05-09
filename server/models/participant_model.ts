import { client } from '../db/connectToPostgres';

export const createPartipantsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Partipants(  
    id SERIAL NOT NULL PRIMARY KEY,
    userId int,
    conversationId int,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (conversationId) REFERENCES conversations(id)
);
  `;

  await client.query(query);
};

export interface Participant {
  id?: number;
  userId?: number;
  conversationId?: number;
}

export const createPartcipant = () =>
  `INSERT INTO Partipants (userId, conversationId)
    VALUES ($1, $2)
    RETURNING id, userId, conversationId;
    `;

export const getUserParticipants = () =>
  `SELECT u.* FROM Users AS u JOIN partipants AS p ON u.id = p.userId WHERE p.conversationId IN (
    SELECT conversationId FROM partipants WHERE userId = $1 ) AND u.id != $1;`;
