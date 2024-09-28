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
export const createConversation = async () => {
  //   const { name, conversationType } = conversation;

  const query = `
        INSERT INTO conversations (name, conversation_type)
        VALUES ($1, $2)
        RETURNING id, name, conversation_type, created_at
    `;

  return query;
};

// Function to get all conversations
export const getConversations = async () => {
  const query = 'SELECT * FROM conversations ORDER BY created_at DESC';

  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// Function to get a conversation by ID
export const getConversationById = async (id: number) => {
  const query = 'SELECT * FROM conversations WHERE id = $1';

  try {
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

// Function to update a conversation
export const updateConversation = async (id: number, conversation: Partial<Conversation>) => {
  const { name, conversationType } = conversation;

  const query = `
        UPDATE conversations
        SET name = COALESCE($1, name), conversationType = COALESCE($2, conversationType)
        WHERE id = $3
        RETURNING id, name, conversationType, created_at
    `;

  const values = [name, conversationType, id];

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating conversation:', error);
    throw error;
  }
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
