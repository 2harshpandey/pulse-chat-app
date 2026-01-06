import React, { createContext, useState, ReactNode } from 'react';

// This interface is now exported and includes all necessary fields
export interface UserProfile {
  userId: string;
  username: string;
  isTyping?: boolean; // Added for the typing indicator
}

interface UserContextType {
  profile: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const login = (userProfile: UserProfile) => {
    setProfile(userProfile);
  };

  const logout = () => {
    localStorage.removeItem('pulseUserId');
    localStorage.removeItem('pulseUsername');
    // TODO: Clear any other user-specific preferences from localStorage or database
    setProfile(null);
  };

  return (
    <UserContext.Provider value={{ profile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};