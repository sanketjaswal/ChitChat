// src/components/Sidebar.tsx
import * as React from 'react';
import { useAuthContext } from '../../context/Auth_context';
import styled from 'styled-components'; // Corrected import statement
import { socket } from '../../socket';
import { useRoomContext } from '../../context/Room_context';
import { getConversation } from '../../apis';

interface ConversationProps {
  id: number;
  image: string;
  name: string;
  gender: string;
}

export const Conversation: React.FC<ConversationProps> = ({
  id,
  name,
  image,
  gender,
}) => {
  const [selected, setSelected] = React.useState(false);
  const { room, setRoom } = useRoomContext();
  const { authUser } = useAuthContext();

  const onClickConversation = async () => {
    setSelected(true);

    try {
      //get conversation id
      const convoId = await getConversation({
        userOne: id,
        userTwo: authUser?.id,
      });

      //leave active room
      socket.emit('leave_room', room);

      //join socket room
      socket.emit('join_room', convoId.conversationid);
      // alert('Room joined: ' + convoId.conversationid);

      //set room context
      setRoom(convoId.conversationid);
    } catch (error) {
      console.error('Error Joining conversation room:', error);
    }
  };

  return (
    <ConversationContainer
      selected={selected}
      onClick={onClickConversation} // onClick prop is simplified
    >
      <Avatar>
        <div className="avatar">
          <AvatarImage src={image} alt={`${name}'s avatar`} />{' '}
          {/* Improved alt text */}
        </div>
      </Avatar>
      <ConversationHeader>
        <ConversationName>{name}</ConversationName>
        <ConversationText>I am {gender}</ConversationText>
      </ConversationHeader>
    </ConversationContainer>
  );
};

interface SelectedProps {
  selected: boolean; // Keeping this boolean
}

const ConversationContainer = styled.div<SelectedProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.5s;
  margin-block: 5px;
  /* background-color: ${({ selected }) =>
    selected ? 'gray' : 'transparent'}; */
  border: 1px solid ${({ selected }) => (selected ? 'white' : 'transparent')};

  &:hover {
    background-color: #383b41; // Hover effect
    transition: background-color 0.1s;
  }
`;

const Avatar = styled.div`
  .avatar {
    &.online {
      /* Add styles for online avatar here */
      border: 2px solid green; // Example style for online status
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
  font-size: 17px;
  color: #e5e7eb;
`;

const ConversationText = styled.p`
  color: white;
  flex: 1;
`;
