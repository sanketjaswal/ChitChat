import * as React from 'react';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { decodeJWTToken } from '../utils/decodeToken';

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
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  // Extract and decode token
  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('chat-user') || 'null');

    if (token) {
      try {
        const tokenUser = decodeJWTToken(token) as AuthUser;
        setAuthUser(tokenUser);
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
