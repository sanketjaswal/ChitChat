import * as React from 'react';
// import { useState, FormEvent } from 'react';
import { styled } from 'styled-components';

// Styled Components
const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  margin-right: 8px;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #336ecd;
  }
`;

interface MessageInputProps {
  handleSendMessage: () => void;
  messageText: string;
  setMessageText: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  handleSendMessage,
  messageText,
  setMessageText,
}) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Send a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <SendButton onClick={handleSendMessage}>Send</SendButton>
    </>
  );
};

export default MessageInput;
