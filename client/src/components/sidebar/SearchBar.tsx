import * as React from 'react';
import { useState, FormEvent } from 'react';
import { styled } from 'styled-components';

import { User } from '../../models';
import { findUserByUsername } from '../../apis';

interface NewUser extends User {
  id?: number;
  profilepic: string;
}
interface SearchBarProps {
  selectOrAddConversation?: (user: NewUser | null) => void;
}

// Component
const SearchBar: React.FC<SearchBarProps> = ({ selectOrAddConversation }) => {
  const [search, setSearch] = useState<string>('');
  const [foundUser, setFoundUser] = useState<NewUser | null>(null);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      return console.log('Search length should be more than 2 characters long');
    }

    try {
      const res = await findUserByUsername(search);
      // console.log(res);
      setSearch('');
      setFoundUser(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DropDiv
        found={foundUser?.name}
        onClick={() => {
          if (selectOrAddConversation) {
            selectOrAddConversation(foundUser);
          }
          setFoundUser(null);
        }}
      >
        <img width="25" height="25" src={foundUser?.profilepic} alt="profile" />
        {foundUser?.name}
      </DropDiv>
      <Button type="submit">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/FFFFFF/search--v1.png"
          alt="search--v1"
        />
      </Button>
    </Form>
  );
};

export default SearchBar;

// Styled Components
const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  position: relative;
  margin-bottom: 10px;
  /* background-color: #fff; */
`;

interface DropDivProps {
  found: string | undefined;
}

const DropDiv = styled.div<DropDivProps>`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  color: black;
  background-color: #d1e3ff;
  position: absolute;
  bottom: -100%;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
  width: 77%;
  display: ${({ found }) => (found ? 'flex' : 'none')};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #b1cfff;
    color: white;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 20%;
  background-color: #3b82f6;
  color: white;
  border: none;
  transition: all.4s;
  cursor: pointer;
  &:active {
    outline: none;
    transition: all.1s;
    transform: scale(0.9);
  }
`;
