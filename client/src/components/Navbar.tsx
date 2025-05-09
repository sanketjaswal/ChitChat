// src/components/Sidebar.tsx
import * as React from 'react';
import { keyframes, styled } from 'styled-components';
import { useAuthContext } from '../context/Auth_context';

interface NavbarProps {
  connected: boolean | undefined;
}

// interface TokenItem {
//   image: string | null;
// }

export const Navbar: React.FC<NavbarProps> = ({ connected }) => {
  const { setAuthUser } = useAuthContext();

  const handleLogout = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    localStorage.removeItem('chat-user');
    setAuthUser(null);
  };

  //Extract Image from token
  const [foundImage, setFoundImage] = React.useState<string | null>();
  const [foundName, setFoundName] = React.useState<string | null>();

  React.useEffect(() => {
    const token: string | null = localStorage.getItem('chat-user');

    const base64 = token?.split('.')[1];
    if (base64) {
      const tokenPayload = JSON.parse(atob(base64).toString());
      // console.log(tokenPayload.user.profilepic);
      setFoundImage(tokenPayload.user.profilepic);
      setFoundName(tokenPayload.user.username);
    }
  }, []);

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
        <Nav onClick={handleLogout}>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-up.png"
            alt="logout-rounded-up"
          />
          Logout
        </Nav>
        <Nav>
          <img
            width="40"
            height="40"
            src={
              foundImage
                ? foundImage
                : 'https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png'
            }
            alt="profile-pic"
          />
          <Dot connected={connected}></Dot>
          {foundName}
        </Nav>
      </Room>
    </NavbarWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Dot = styled.div<NavbarProps>`
  width: 8px;
  height: 8px;
  right: 15px;
  position: absolute;
  border-radius: 50%;
  transition: 1s;
  transform: ${({ connected }) => (connected ? 'scale(1.4)' : 'scale(1)')};
  background-color: ${({ connected }) => (connected ? 'green' : 'red')};
`;

const NavbarWrapper = styled.aside`
  width: 100px;
  background-color: #131313;
  color: white;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out 0.5s forwards;
`;

const Room = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
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
  position: relative;
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
