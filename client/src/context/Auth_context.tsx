import * as React from 'react';
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface AuthUser {
  id: string;
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
  let tokenPayload: any = null;

  const token = JSON.parse(localStorage.getItem('chat-user') || 'null');

  if (token) {
    try {
      const base64 = token?.split('.')[1];
      tokenPayload = JSON.parse(atob(base64));
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  const [authUser, setAuthUser] = useState<AuthUser | null>(
    tokenPayload?.user || null,
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
