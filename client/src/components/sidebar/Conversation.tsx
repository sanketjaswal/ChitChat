// src/components/Sidebar.tsx
import * as React from 'react';
import { styled } from 'styled-components';

const ConversationContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.5s;
  margin-block: 5px;

  &:hover {
    background-color: #383b41;
    transition: 0.1s;
  }
`;

const Avatar = styled.div`
  .avatar {
    &.online {
      /* Add styles for online avatar here */
    }
  }
`;

const AvatarImage = styled.img`
  width: 3rem;
  border-radius: 25%;
  background-color: #fff;
`;

const ConversationHeader = styled.div`
  display: flex;
  flex: 1;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

const ConversationName = styled.p`
  /* font-weight: bold; */
  font-size: 17px;
  color: #e5e7eb;
`;

const ConversationText = styled.p`
  color: white;
  flex: 1;
`;

export const Conversation: React.FC = () => {
  return (
    <ConversationContainer
    // isSelected={isSelected}
    // onClick={() => setSelectedConversation(conversation)}
    >
      <Avatar>
        <div className={`avatar `}>
          <div>
            <AvatarImage
              src={'https://avatar.iran.liara.run/public/boy?username=boy'}
              alt="user avatar"
            />
          </div>
        </div>
      </Avatar>
      <ConversationHeader>
        <ConversationName>{/* {conversation.fullname} */}Name</ConversationName>
        <ConversationText>helo</ConversationText>
      </ConversationHeader>
    </ConversationContainer>
  );
};
