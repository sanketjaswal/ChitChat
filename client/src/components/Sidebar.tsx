// src/components/Sidebar.tsx
import * as React from 'react';
import styled from 'styled-components';

import SearchBar from './sidebar/SearchBar';
import { useAuthContext } from '../context/Auth_context';

import {
  createNewConversation,
  createNewParticipants,
  getConversation,
  getParticipants,
} from '../apis';
import { User } from '../models';
import { Conversation } from './sidebar/Conversation';

interface NewUser extends User {
  id: number;
  profilepic: string;
}

export const Sidebar: React.FC = () => {
  const [users, setUsers] = React.useState<NewUser[]>([]);
  const [userSearched, setUserSearched] = React.useState<NewUser | undefined>(
    undefined,
  );
  const { authUser } = useAuthContext();

  // Fetch users' friends
  const fetchUsers = async (): Promise<void> => {
    try {
      if (authUser?.id) {
        const res = await getParticipants(authUser.id);
        setUsers(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create or select conversation
  const selectOrAddConversation = async (
    foundUser: NewUser | null,
  ): Promise<void> => {
    try {
      if (foundUser) {
        setUserSearched(foundUser);
      } else {
        console.log('User not found:', foundUser);
        return;
      }

      const userExists = users.some((item) => item.id === foundUser.id);

      if (userExists) {
        console.log('User already exists, finding conversation');

        const res = await getConversation({
          userOne: authUser?.id,
          userTwo: foundUser.id,
        });
      } else {
        console.log('New user to be added, creating conversation');

        const data = await createNewConversation({
          userOne: authUser?.name,
          userTwo: foundUser.name,
        });

        console.log('Conversation ID:', data?.id);
        addNewUser(data?.id, foundUser.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add new participant
  const addNewUser = async (
    newConvoId?: number,
    foundUserId?: number,
  ): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/participants/addParticipant`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: authUser?.id,
            secondUserId: foundUserId,
            conversationId: newConvoId,
          }),
        },
      );

      const data = await res.json();
      console.log(data);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SidebarWrapper>
      <SearchBar selectOrAddConversation={selectOrAddConversation} />
      {users.map((item) => (
        <Conversation
          key={item.id}
          id={item.id}
          image={item.profilepic}
          name={item.name}
          gender={item.gender}
        />
      ))}
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  width: 300px;
  background-color: #202329;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid grey;
  box-shadow: 0px 0 2px 5px red;
`;
