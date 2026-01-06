import React, { useState } from 'react';
import styled from 'styled-components';
import { UserProfile } from './UserContext'; // Import the full profile type

// --- UTILITY ---
const getUserId = (): string => {
  let userId = localStorage.getItem('pulseUserId');
  if (!userId) {
    userId = Date.now().toString() + Math.random().toString(36).substring(2);
    localStorage.setItem('pulseUserId', userId);
  }
  return userId;
};

// --- STYLED COMPONENTS ---
const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e2e8f0;
`;
const AuthBox = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #4F46E5;
    box-shadow: 0 0 0 2px #c7d2fe;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #4F46E5;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  &:hover {
    background-color: #4338CA;
    transform: scale(1.02);
  }
`;
const ErrorMessage = styled.p`
  color: #DC2626;
  margin-top: 1rem;
`;


// --- COMPONENT ---
interface AuthProps {
  onAuthSuccess: (profile: UserProfile) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(() => localStorage.getItem('pulseUsername') || '');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password !== 'Khushi123') {
      setError('Incorrect password.');
      return;
    }
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    if (username.length > 30) {
      setError('Username cannot exceed 30 characters.');
      return;
    }
    localStorage.setItem('pulseUsername', username);
    onAuthSuccess({ userId: getUserId(), username });
  };

  return (
    <AuthContainer>
      <AuthBox>
        <Title>Join Pulse</Title>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={30}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />
        <Button onClick={handleLogin}>Join Chat</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </AuthBox>
    </AuthContainer>
  );
};

export default Auth;
