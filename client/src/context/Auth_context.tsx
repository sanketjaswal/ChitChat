import * as React from 'react';
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
}

// Context type
interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
};

// Provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  interface TokenUser {
    id: number;
    name: string;
    username: string;
    email: string;
    gender: string;
  }

  interface TokenPayload {
    user: TokenUser;
    iat: number;
    exp: number;
  }

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  // Extract and decode token
  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('chat-user') || 'null');

    if (token) {
      try {
        const base64Payload = token.split('.')[1];
        const decodedPayload = atob(base64Payload);
        const tokenPayload: TokenPayload = JSON.parse(decodedPayload);
        // console.log('Decoded Token Payload:', tokenPayload);

        setAuthUser(tokenPayload.user);
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
