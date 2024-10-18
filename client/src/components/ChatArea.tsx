import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import MessageInput from './message/MessageInput';
import { socket } from '../socket';
import NoChatMessage from './message/NochatPage';

// component starts here
export const ChatArea: React.FC = () => {
  // interface Message {
  //   id: number;
  //   text: string;
  //   sender: 'me' | 'other';
  // }
  // const [messages, setMessages] = useState<Message[]>([
  //   { id: 1, text: 'Hi Sanket!', sender: 'other' },
  //   { id: 2, text: 'Hi! How are you?', sender: 'me' },
  // ]);

  // const [messageText, setMessageText] = useState('');

  // const handleSendMessage = (): void => {
  //   if (messageText.trim()) {
  //     const newMessage: Message = {
  //       id: messages.length + 1,
  //       text: messageText,
  //       sender: 'me',
  //     };
  //     setMessages([...messages, newMessage]);
  //     setMessageText('');
  //     sendMessage();
  //   }
  // };

  const [chatSelected, setChatSelected] = useState<boolean>();

  const [room, setRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageReceived, setMessageReceived] = useState<string>('');

  const joinRoom = (): void => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = (): void => {
    setMessage('');
    socket.emit('send_message', { message, room });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <ChatAreaWrapper>
      {/* <NoChatMessage /> */}
      <label>Room</label>
      <input
        type="text"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>set room</button>
      <div>
        <LabelText>To:</LabelText> <Fullname>Selected user</Fullname>
      </div>
      <MessagesContainer>
        {/* {messages.map((mess) => (
          <MessageBubble key={mess.id} sender={mess.sender}>
            {mess.text}
          </MessageBubble>
        ))} */}
        <MessageBubble key={''} sender={'other'}>
          {messageReceived}
        </MessageBubble>
      </MessagesContainer>
      <InputContainer>
        {/* <MessageInput
          handleSendMessage={handleSendMessage}
          messageText={messageText}
          setMessageText={setMessageText}
        /> */}
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
