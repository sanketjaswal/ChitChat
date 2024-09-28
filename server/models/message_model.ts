import { client } from '../db/connectToPostgres';

export const createMessageTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

  await client.query(query);
};

export interface Message {
  conversationId: number;
  senderId: number;
  content: string;
}

export const createMessage = async () => {
  const query = 'INSERT INTO messages (conversation_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *';
  return query;
};

export const deleteMessage = async () => {
  const query = `
        DELETE FROM messages
        WHERE id = $1 RETURNING *;
    `;
  return query;
};
