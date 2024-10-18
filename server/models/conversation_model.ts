// conversation.ts
import { client } from '../db/connectToPostgres';

export const createConversationTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Conversations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    conversation_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

  await client.query(query);
};

export interface Conversation {
  id?: number;
  name?: string;
  conversationType: 'direct' | 'group';
}

// Function to create a new conversation
export const createConversation = () =>
  `INSERT INTO conversations (name, conversation_type)
    VALUES ($1, $2)
    RETURNING id, name, conversation_type, created_at;
    `;

// Function to get all conversations
export const getConversations = async () => {
  const query = 'SELECT * FROM conversations ORDER BY created_at DESC;';

  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// Function to get a conversation by 2 users Id's
export const getConversationByUserIds = () => {
  const query =
    'SELECT p1.conversationid FROM partipants AS p1 JOIN partipants AS p2 ON p1.conversationid = p2.conversationid WHERE p1.userid = $1 AND p2.userid = $2';

  return query;
  // try {
  //   const result = await client.query(query, [id]);
  //   return result.rows[0];
  // } catch (error) {
  //   console.error('Error fetching conversation:', error);
  //   throw error;
  // }
};

// Function to delete a conversation
export const deleteConversation = async (id: number) => {
  const query = 'DELETE FROM conversations WHERE id = $1 RETURNING id';

  try {
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
};
