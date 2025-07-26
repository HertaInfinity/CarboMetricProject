import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  greenScore: number;
  totalSavedEmissions: number;
  level: string;
  badges: string[];
  streak: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateGreenScore: (score: number) => void;
  addBadge: (badge: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Shambavi Singh',
    email: 'shambhi@carbometric.com',
    avatar: '🌱',
    greenScore: 85,
    totalSavedEmissions: 142.5,
    level: 'Eco Warrior',
    badges: ['Plastic-Free Week', 'Low Carbon Commute', 'Green Warrior'],
    streak: 7
  });

  const updateGreenScore = (score: number) => {
    if (user) {
      setUser({ ...user, greenScore: score });
    }
  };

  const addBadge = (badge: string) => {
    if (user && !user.badges.includes(badge)) {
      setUser({ ...user, badges: [...user.badges, badge] });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateGreenScore, addBadge }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};