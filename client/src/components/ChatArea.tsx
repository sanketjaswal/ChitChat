import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { socket } from '../socket';
import { createNewMessage, fetchAllMessages } from '../apis';
import { useRoomContext } from '../context/Room_context';
import { useAuthContext } from '../context/Auth_context';
import MessageInput from './message/MessageInput';
import NoChatMessage from './message/NochatPage';

export const ChatArea: React.FC = () => {
  interface Message {
    id: number | undefined;
    content: string | undefined;
    sender_id: number | undefined;
    conversation_id: number | undefined;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const { authUser } = useAuthContext();
  const { room } = useRoomContext();
  const [message, setMessage] = useState<string>('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = await createNewMessage({
      senderId: authUser?.id,
      conversationId: room,
      content: message,
    });

    if (newMessage?.data) {
      setMessages((prevMessages) => [...prevMessages, newMessage.data]);

      socket.emit('send_message', { message: newMessage.data, room });
      setMessage('');
    }
  };

  const getMessages = async () => {
    const data = await fetchAllMessages(room);
    setMessages(data ?? []);
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => {
        const uniqueMessages = [...prevMessages, data.message].filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
        );
        return uniqueMessages;
      });
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Load messages when room changes
  useEffect(() => {
    getMessages();
  }, [room]);

  return (
    <ChatAreaWrapper>
      <div>
        <LabelText>To:</LabelText> <Fullname>Selected user</Fullname>
      </div>
      <MessagesContainer>
        {messages.map((mess) => (
          <MessageBubble
            key={mess.id}
            authUser={authUser?.id}
            sender={mess.sender_id}
          >
            {mess.content}
          </MessageBubble>
        ))}
      </MessagesContainer>
      <InputContainer>
        <MessageInput
          handleSendMessage={sendMessage}
          messageText={message}
          setMessageText={setMessage}
        />
      </InputContainer>
    </ChatAreaWrapper>
  );
};

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

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #cd0000; /* color of the scrollbar track */
    border-radius: 40px;
  }

  &::-webkit-scrollbar-thumb {
    background: #1f04b9; /* color of the scrollbar handle */
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #00ea13; /* darker color on hover */
  }
`;

interface MessageBubbleProps {
  sender: number | undefined;
  authUser: number | undefined;
}
const MessageBubble = styled.div<MessageBubbleProps>`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ sender, authUser }) =>
    sender === authUser ? '#a1c4fc' : '#FFF'};
  align-self: ${({ sender, authUser }) =>
    sender === authUser ? 'flex-end' : 'flex-start'};
  color: ${({ sender, authUser }) => (sender === authUser ? '#000' : '#333')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;
