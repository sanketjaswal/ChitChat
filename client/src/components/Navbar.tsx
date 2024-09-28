// src/components/Sidebar.tsx
import * as React from 'react';
import { styled } from 'styled-components';

const NavbarWrapper = styled.aside`
  width: 100px;
  background-color: #131313;
  color: white;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-block: 40px 0;
  flex: 1;
  gap: 10px;
`;

const Nav = styled.div`
  width: 80%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  border-radius: 15px;
  transition: 0.5s;

  &:hover {
    background-color: #3e3e3e;
    transform: scale(1.1);
    transition: 0.1s;
  }

  &:active {
    background-color: #3e3e3e;
    transform: scale(1);
    transition: 0.1s;
  }
`;

export const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <img
        width="50"
        height="50"
        src="https://img.icons8.com/ios-filled/50/FFFFFF/chat-message--v1.png"
        alt="chat-message--v1"
      />
      <Room>
        <Nav>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/FFFFFF/chat.png"
            alt="chat"
          />
          All chats
        </Nav>
        <Nav>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/folder-invoices.png"
            alt="folder-invoices"
          />
          Work
        </Nav>
        <Nav>Random</Nav>
      </Room>
      <Room>
        <Nav>Logout</Nav>
      </Room>
    </NavbarWrapper>
  );
};
