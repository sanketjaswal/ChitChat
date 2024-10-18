// src/components/Sidebar.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import SearchBar from './sidebar/SearchBar';
import { useAuthContext } from '../context/Auth_context';
import { Conversation } from './sidebar/Conversation';
import {
  // createNewConversationwithUsername,
  getConversation,
  getParticipants,
} from '../apis';
import { User } from '../models';

interface NewUser extends User {
  id?: number;
  profilepic: string;
}

export const Sidebar: React.FC = () => {
  const [users, setUsers] = useState<NewUser[]>([]);
  const [userSearched, setUserSearched] = useState<NewUser | undefined>(
    undefined,
  );
  const [conversationId, setConversatonId] = useState<number>();

  const { authUser } = useAuthContext();

  // Fetch users friends
  const fetchUsers = async (): Promise<void> => {
    try {
      // Api call
      const res = await getParticipants(authUser?.id);

      // console.log(res);
      setTimeout(() => {
        return setUsers(res);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  // Create or select converastion
  const selectOrAddConversation = async (
    foundUser: NewUser | null,
  ): Promise<void> => {
    try {
      if (foundUser) {
        setUserSearched(foundUser);
      } else {
        console.log('user not found', foundUser);
      }

      let found = false;
      for (const item of users) {
        if (item.id === foundUser?.id) {
          found = true;
        }
      }
      //Found Old Conversation
      if (found) {
        console.log('user already Exists, find conversation');

        // get Conversation API
        const res = await getConversation({
          userOne: authUser?.id,
          userTwo: foundUser?.id,
        });

        // console.log(res.conversationid);
        setConversatonId(res.conversationid);
        //Create New Conversation
      } else {
        console.log('new User to be added, create conversation');
        console.log(foundUser?.name, authUser?.name);
        // const res = await fetch(
        //   `${process.env.REACT_APP_NODE_URL}/api/conversations/conversation`,
        //   {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       name: (foundUser?.name ?? 'found') + (authUser?.name ?? 'user'),
        //     }),
        //   },
        // );

        // const res = createNewConversationwithUsername();
        // const data = await res.json();
        // console.log(data?.id);
        // addNewUser(data?.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add new Participants
  const addNewUser = async (newConvoId: number): Promise<void> => {
    try {
      console.log(newConvoId);
      const res = await fetch(
        `${process.env.REACT_APP_NODE_URL}/api/participants/addParticipant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: authUser?.id,
            secondUserId: userSearched?.id,
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SidebarWrapper>
      <SearchBar selectOrAddConversation={selectOrAddConversation} />
      {users?.map((item) => {
        return (
          <Conversation
            key={item.id}
            image={item.profilepic}
            name={item.name}
            gender={item.gender}
          />
        );
      })}
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
