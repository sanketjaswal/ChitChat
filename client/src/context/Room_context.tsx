import * as React from 'react';
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface RoomType {
  id: number;
}

// Context type
interface RoomContextType {
  room: number | undefined;
  setRoom: (room: number | undefined) => void;
}

// Create the context
const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Custom hook to use the RoomContext
export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomContextProvider');
  }
  return context;
};

// Provider component
interface RoomContextProviderProps {
  children: ReactNode;
}

export const RoomContextProvider: FC<RoomContextProviderProps> = ({
  children,
}) => {
  const [room, setRoom] = useState<number | undefined>(undefined);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
