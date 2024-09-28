// src/components/ChatArea.tsx
import * as React from 'react';
import { styled } from 'styled-components';
import MessageInput from './message/MessageInput';

const ChatAreaWrapper = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: #202329;
`;

const LabelText = styled.span`
  color: #000;
`;

const Fullname = styled.span`
  color: #1f2937;
  font-weight: bold;
`;

export const ChatArea: React.FC = () => {
  return (
    <ChatAreaWrapper>
      <LabelText>To:</LabelText> <Fullname>Selected user</Fullname>
      <MessageInput />
    </ChatAreaWrapper>
  );
};
