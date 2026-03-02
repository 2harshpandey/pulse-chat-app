import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 2rem;
  background-color: #f7fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #e2e8f0;
  padding: 1rem;
`;

const LoginBox = styled.div`
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const EyeIconButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.25rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #4a5568;
  }
`;

const PasswordInput = styled.input`
  padding: 0.75rem 3rem 0.75rem 1rem; /* Add padding-right for icon */
  font-size: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  width: 100%;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 0.65rem;
    height: 0.65rem;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.6-3.6%205.4-7.9%205.4-12.9%200-5-1.8-9.2-5.4-12.7z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    pointer-events: none;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  padding-right: 2.5rem; /* Make space for custom arrow */
  font-size: 1rem;
  width: 100%;
  margin-bottom: 0; 
  flex: none; 
  min-width: auto;
  
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background-color: white;
  transition: all 0.2s;
  
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);

  ${Input}, ${SelectWrapper} {
    flex: 1;
    min-width: 160px;
    max-width: none;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0.75rem;

    ${Input}, ${SelectWrapper} {
      flex: 1 1 100%;
      min-width: unset;
    }
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s;
  white-space: nowrap;
  &:hover {
    background-color: #2563EB;
  }
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: #EF4444;
  margin-top: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #cbd5e0;
  margin-bottom: -1px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex-shrink: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#3B82F6' : '#4a5568'};
  border: 1px solid ${props => props.active ? '#cbd5e0' : 'transparent'};
  border-bottom: 1px solid ${props => props.active ? 'white' : '#cbd5e0'};
  margin-bottom: -1px;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  outline: none;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover {
    color: #3B82F6;
  }
  @media (max-width: 600px) {
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
  }
`;





const TabContent = styled.div`
  border: 1px solid #cbd5e0;
  padding: 2rem;
  border-radius: 0 0.25rem 0.25rem 0.25rem;
  background-color: white;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    border-top-right-radius: 0.25rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const WideTable = styled(Table)`
  min-width: 580px;
`;

const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f7fafc;
  font-weight: 600;
  color: #4a5568;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  overflow-wrap: break-word;
  word-break: normal;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 4px;
`;

const LogoutButton = styled(Button)`
  background-color: #EF4444;
  flex-shrink: 0;
  &:hover {
    background-color: #DC2626;
  }
`;

const ActivityLogContainer = styled.div`
  height: calc(100vh - 20rem);
  min-height: 200px;
  width: 100%;
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  overflow-y: auto;
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    height: 55vh;
    min-height: 180px;
    padding: 0.75rem;
    font-size: 0.78rem;
  }
`;

const LogViewerContainer = styled.pre`
  height: calc(100vh - 20rem);
  min-height: 200px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: auto;
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    height: 55vh;
    min-height: 180px;
    padding: 0.75rem;
    font-size: 0.78rem;
  }
`;

const ActivityLogItem = styled.div`
  padding: 0.25rem 0;
`;

interface UserProfile {
  userId: string;
  username: string;
}

type Tab = 'messages' | 'users' | 'activity' | 'logs';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const ClearHistoryButton = styled(Button)`
  background-color: #e53e3e;
  flex-shrink: 0;
  &:hover {
    background-color: #c53030;
  }
`;

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [serverLogs, setServerLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('messages');
  const [activityLogs, setActivityLogs] = useState<string[]>(() => {
    const savedLogs = sessionStorage.getItem('admin-activity-logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const ws = useRef<WebSocket | null>(null);
  const activityLogRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [filterMessageId, setFilterMessageId] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterEventType, setFilterEventType] = useState('All');
  const [filterContent, setFilterContent] = useState('');

  useEffect(() => {
    if (activityLogRef.current) {
      activityLogRef.current.scrollTop = 0;
    }
  }, [activityLogs]);
  
  useEffect(() => {
    console.log('Users state updated:', users);
  }, [users]);
  
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const storedPassword = sessionStorage.getItem('admin-password');
      if (storedPassword) {
        setIsLoading(true);
        try {
          const [usersResponse, historyResponse, serverLogsResponse] = await Promise.all([
            fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`, { headers: { 'x-admin-password': storedPassword } }),
            fetch(`${process.env.REACT_APP_API_URL}/api/admin/history`, { headers: { 'x-admin-password': storedPassword } }),
            fetch(`${process.env.REACT_APP_API_URL}/api/admin/server-logs`, { headers: { 'x-admin-password': storedPassword } })
          ]);

          if (usersResponse.ok && historyResponse.ok && serverLogsResponse.ok) {
            const usersData = await usersResponse.json();
            console.log('Users data:', usersData);
            const historyData = await historyResponse.json();
            const serverLogsData = await serverLogsResponse.text();
            setUsers(usersData);
            setHistoryLogs(historyData.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
            setServerLogs(serverLogsData.split('\n').reverse());
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('admin-password');
          }
        } catch (err) {
          console.error("Failed to fetch admin data", err);
          sessionStorage.removeItem('admin-password');
        }
        setIsLoading(false);
      }
    };
    checkAuthAndFetchData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const storedPassword = sessionStorage.getItem('admin-password');
    if (!storedPassword) return;

    const wsUrl = `${process.env.REACT_APP_API_URL?.replace('http', 'ws') || 'ws://localhost:8080'}?admin=true`;
    ws.current = new WebSocket(wsUrl);
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'admin_auth', password: storedPassword }));
      console.log('Admin WebSocket connected');
    };
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case 'activity':
          setActivityLogs(prevLogs => {
            const newLogs = [`[${new Date().toLocaleTimeString()}] ${message.data}`, ...prevLogs].slice(0, 50);
            sessionStorage.setItem('admin-activity-logs', JSON.stringify(newLogs));
            return newLogs;
          });
          break;
        case 'history':
          setHistoryLogs(prevLogs => [message.data, ...prevLogs].sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
          break;
        case 'chat_cleared':
          setHistoryLogs([]);
          setActivityLogs(prev => [`[${new Date().toLocaleTimeString()}] Chat history permanently cleared.`, ...prev]);
          break;
        case 'user_joined':
          setUsers(prevUsers => [...prevUsers, message.data]);
          break;
        case 'user_left':
          setUsers(prevUsers => prevUsers.filter(user => user.userId !== message.data.userId));
          break;
        case 'server_logs':
           setServerLogs(message.data.split('\n').reverse());
          break;
        default:
          break;
      }
    };
    ws.current.onclose = () => console.log('Admin WebSocket disconnected');
    ws.current.onerror = (error) => console.error('Admin WebSocket error:', error);

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [isAuthenticated]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [usersResponse, historyResponse, serverLogsResponse] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`, { headers: { 'x-admin-password': password } }),
        fetch(`${process.env.REACT_APP_API_URL}/api/admin/history`, { headers: { 'x-admin-password': password } }),
        fetch(`${process.env.REACT_APP_API_URL}/api/admin/server-logs`, { headers: { 'x-admin-password': password } })
      ]);

      if (usersResponse.ok && historyResponse.ok && serverLogsResponse.ok) {
        sessionStorage.setItem('admin-password', password);
        const usersData = await usersResponse.json();
        const historyData = await historyResponse.json();
        const serverLogsData = await serverLogsResponse.text();
        setUsers(usersData);
        setHistoryLogs(historyData.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        setServerLogs(serverLogsData.split('\n').reverse());
        setIsAuthenticated(true);
      } else {
        setError('Incorrect password.');
      }
    } catch (err) {
      setError('An error occurred while trying to log in.');
    }
    setIsLoading(false);
  };
  
  const handleLogout = () => {
    if (ws.current) ws.current.close();
    sessionStorage.removeItem('admin-password');
    sessionStorage.removeItem('admin-activity-logs');
    setIsAuthenticated(false);
    setPassword('');
    setActivityLogs([]);
  }

  const handlePermanentClear = async () => {
    const enteredPassword = prompt("This is a destructive action. Please re-enter the admin password to proceed.");
    const storedPassword = sessionStorage.getItem('admin-password');

    if (enteredPassword !== storedPassword) {
      alert("Incorrect password.");
      return;
    }

    if (window.confirm("ARE YOU SURE?\n\nThis will permanently delete all messages and events from the database. This action cannot be undone.")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/all`, {
          method: 'DELETE',
          headers: {
            'x-admin-secret': process.env.REACT_APP_ADMIN_SECRET || ''
          }
        });

        if (response.ok) {
          alert("All chat history has been permanently deleted.");
          setHistoryLogs([]); // Clear logs from UI immediately
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Failed to clear history.'}`);
        }
      } catch (err) {
        alert("A network error occurred.");
        console.error("Failed to clear history", err);
      }
    }
  };

  const handleRefreshServerLogs = async () => {
    const storedPassword = sessionStorage.getItem('admin-password');
    if (storedPassword) {
      try {
        const serverLogsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/server-logs`, { headers: { 'x-admin-password': storedPassword } });
        if (serverLogsResponse.ok) {
          const serverLogsData = await serverLogsResponse.text();
          setServerLogs(serverLogsData.split('\n').reverse());
        }
      } catch (err) {
        console.error("Failed to fetch server logs", err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin();
  };

  const renderEventType = (logType: string) => {
    switch (logType) {
        case 'create': return 'Create';
        case 'edit': return 'Edit';
        case 'upload': return 'Upload';
        case 'delete_everyone': return 'Delete (Everyone)';
        default: return logType;
    }
  }

  const renderMessageDetails = (log: any) => {
    const formatMedia = (content: any) => {
      if (!content) return '"[Empty]"';
      const text = content.text || '';
      if (content.url) {
        const isGif = content.url.includes('tenor.com');
        const fileName = content.originalName || (isGif ? 'GIF' : 'Uploaded File');
        return <>{text && `"${text}" `}<a href={content.url} target="_blank" rel="noopener noreferrer">[{fileName}]</a></>;
      }
      return `"${text}"`;
    };

    switch (log.type) {
      case 'create':
        return <>Content: {formatMedia(log.message)}</>;
      case 'edit':
        return <>Old: "{log.oldText}" → New: "{log.newText}"</>;
      case 'delete_everyone':
        return <>Deleted Content: {formatMedia(log.deletedContent)}</>;
      case 'upload':
        return `File: '${log.file.originalname}' (${(log.file.size / 1024).toFixed(2)} KB)`;
      default:
        return JSON.stringify(log);
    }
  };

  const enrichedHistoryLogs = useMemo(() => {
    const userMap = new Map(users.map(u => [u.userId, u.username]));
    return historyLogs.map(log => {
      const username = log.username || userMap.get(log.userId) || 'Unknown';
      return {
        ...log,
        username: username,
      };
    });
  }, [historyLogs, users]);

  const filteredHistoryLogs = useMemo(() => {
    return enrichedHistoryLogs.filter(log => {
      const messageIdMatch = filterMessageId ? (log.messageId || log.message?.id)?.toLowerCase().includes(filterMessageId.toLowerCase()) : true;
      const userMatch = filterUser ? (log.username || '').toLowerCase().includes(filterUser.toLowerCase()) : true;
      const eventTypeMatch = filterEventType === 'All' ? true : log.type === filterEventType.toLowerCase().replace(' (everyone)', '_everyone');
      
      const contentMatch = !filterContent ? true : (() => {
        const lowerCaseFilter = filterContent.toLowerCase();
        if (log.type === 'create' && log.message?.text) {
            return log.message.text.toLowerCase().includes(lowerCaseFilter);
        }
        if (log.type === 'edit') {
            return (log.oldText && log.oldText.toLowerCase().includes(lowerCaseFilter)) || (log.newText && log.newText.toLowerCase().includes(lowerCaseFilter));
        }
        if (log.type === 'delete_everyone' && log.deletedContent?.text) {
            return log.deletedContent.text.toLowerCase().includes(lowerCaseFilter);
        }
        if (log.type === 'upload' && log.file?.originalname) {
            return log.file.originalname.toLowerCase().includes(lowerCaseFilter);
        }
        return false;
      })();

      return messageIdMatch && userMatch && eventTypeMatch && contentMatch;
    });
  }, [enrichedHistoryLogs, filterMessageId, filterUser, filterEventType, filterContent]);

  if (!isAuthenticated) {
    return (
      <LoginFormContainer>
        <LoginBox>
          <Title>Admin Login</Title>
          <PasswordInputWrapper>
            <PasswordInput
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <EyeIconButton type="button" onClick={() => setIsPasswordVisible(prev => !prev)}>
              {isPasswordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </EyeIconButton>
          </PasswordInputWrapper>
          <Button onClick={handleLogin} disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginBox>
      </LoginFormContainer>
    );
  }

  return (
    <AdminContainer>
      <HeaderRow>
        <Title>Admin Panel</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </HeaderRow>

      <TabContainer>
        <TabButton active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>Message Log</TabButton>
        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>Users</TabButton>
        <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')}>Live Activity</TabButton>
        <TabButton active={activeTab === 'logs'} onClick={() => setActiveTab('logs')}>Server Logs</TabButton>
      </TabContainer>

      <TabContent>
        {activeTab === 'messages' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h2 style={{ margin: 0 }}>Message Log</h2>
              <ClearHistoryButton onClick={handlePermanentClear}>Clear Chat History</ClearHistoryButton>
            </div>
            <FilterContainer>
              <Input
                type="text"
                placeholder="Filter by Message ID"
                value={filterMessageId}
                onChange={(e) => setFilterMessageId(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Filter by User"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
              <SelectWrapper>
                <Select
                  value={filterEventType}
                  onChange={(e) => setFilterEventType(e.target.value)}
                >
                  <option value="All">All Events</option>
                  <option value="Create">Create</option>
                  <option value="Edit">Edit</option>
                  <option value="Upload">Upload</option>
                  <option value="Delete (Everyone)">Delete (Everyone)</option>
                </Select>
              </SelectWrapper>
              <Input
                type="text"
                placeholder="Filter by Content"
                value={filterContent}
                onChange={(e) => setFilterContent(e.target.value)}
              />
            </FilterContainer>
            {isLoading ? (
                <p>Loading history...</p>
            ) : (
                <TableWrapper>
                  <WideTable>
                    <thead>
                        <tr>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            <Th>Event</Th>
                            <Th>User</Th>
                            <Th>Message ID</Th>
                            <Th>Details</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistoryLogs.map((log, index) => (
                            <tr key={index}>
                                <Td>{formatDate(log.timestamp)}</Td>
                                <Td>{formatTime(log.timestamp)}</Td>
                                <Td>{renderEventType(log.type)}</Td>
                                <Td>{log.username} ({log.userId})</Td>
                                <Td>{log.messageId || log.message?.id || 'N/A'}</Td>
                                <Td>{renderMessageDetails(log)}</Td>
                            </tr>
                        ))}
                    </tbody>
                  </WideTable>
                </TableWrapper>
            )}
          </>
        )}

        {activeTab === 'users' && (
          <>
            <h2>Users</h2>
            {isLoading ? (
              <p>Loading users...</p>
            ) : (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>User ID</Th>
                      <Th>Username</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.userId}>
                        <Td>{user.userId}</Td>
                        <Td>{user.username}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
            )}
          </>
        )}

        {activeTab === 'activity' && (
            <>
                <h2>Real-Time Activity</h2>
                <ActivityLogContainer ref={activityLogRef}>
                {activityLogs.map((log, index) => (
                    <ActivityLogItem key={index}>{log}</ActivityLogItem>
                ))}
                </ActivityLogContainer>
            </>
        )}

        {activeTab === 'logs' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h2 style={{ margin: 0 }}>Server Logs</h2>
                <Button onClick={handleRefreshServerLogs}>Refresh</Button>
              </div>
              {isLoading ? (
                  <p>Loading server logs...</p>
              ) : (
                  <LogViewerContainer>
                      {serverLogs.map((log, index) => (
                          <div key={index}>{log}</div>
                      ))}
                  </LogViewerContainer>
              )}
            </>
        )}
      </TabContent>
    </AdminContainer>
  );
};

export default Admin;