// src/components/ChatArea.tsx
import * as React from 'react';
import { styled } from 'styled-components';
import MessageInput from './message/MessageInput';

const ChatAreaWrapper = styled.main`
  flex: 1;
  display: flex;
  padding: 1rem;
  background-color: #202329;
  max-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const LabelText = styled.span`
  color: #000;
`;

const Fullname = styled.span`
  color: white;
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface MessageBubbleProps {
  sender: 'me' | 'other';
}
const MessageBubble = styled.div<MessageBubbleProps>`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ sender }) => (sender === 'me' ? '#a1c4fc' : '#FFF')};
  align-self: ${({ sender }) => (sender === 'me' ? 'flex-end' : 'flex-start')};
  color: ${({ sender }) => (sender === 'me' ? '#000' : '#333')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

export const ChatArea: React.FC = () => {
  interface Message {
    id: number;
    text: string;
    sender: 'me' | 'other';
  }

  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, text: 'Hi Sanket!', sender: 'other' },
    { id: 2, text: 'Hi! How are you?', sender: 'me' },
  ]);
  const [messageText, setMessageText] = React.useState('');

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sender: 'me',
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  return (
    <ChatAreaWrapper>
      <div>
        <LabelText>To:</LabelText> <Fullname>Selected user</Fullname>
      </div>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id} sender={message.sender}>
            {message.text}
          </MessageBubble>
        ))}
      </MessagesContainer>
      <InputContainer>
        <MessageInput
          handleSendMessage={handleSendMessage}
          messageText={messageText}
          setMessageText={setMessageText}
        />
      </InputContainer>
    </ChatAreaWrapper>
  );
};
