import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Import API_URL from storage
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://quiz-app-backend-vpp3.onrender.com/api';

const AdminContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2C3E50;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
`;

const Title = styled.h2`
  color: #2C3E50;
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const ExportButton = styled.button`
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
`;

interface Score {
  id: number;
  user_id: number;
  total_score: number;
  category_scores: Record<string, { correct: number; total: number }>;
  timestamp: string;
}

interface UserWithScores {
  id: number;
  name: string;
  email: string;
  contact: string;
  timestamp: string;
  scores: Score[];
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserWithScores[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersWithScores = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/users-with-scores`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users with scores');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch score data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithScores();
    const interval = setInterval(fetchUsersWithScores, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Score', 'Timestamp'];
    const csvData = [
      headers.join(','),
      ...filteredUsers.map(user => {
        const latestScore = user.scores && user.scores.length > 0
          ? user.scores.reduce((a, b) => new Date(a.timestamp) > new Date(b.timestamp) ? a : b)
          : null;
        return [
          user.name,
          latestScore ? latestScore.total_score : '',
          latestScore ? new Date(latestScore.timestamp).toLocaleString() : ''
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-scores-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading && users.length === 0) {
    return (
      <AdminContainer>
        <Title>Quiz Scores</Title>
        <LoadingMessage>Loading score data...</LoadingMessage>
      </AdminContainer>
    );
  }

  if (error) {
    return (
      <AdminContainer>
        <Title>Quiz Scores</Title>
        <ErrorMessage>{error}</ErrorMessage>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Title>Quiz Scores</Title>
      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="Search by name or user ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ExportButton onClick={exportToCSV}>
          Export to CSV
        </ExportButton>
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => {
            const latestScore = user.scores && user.scores.length > 0
              ? user.scores.reduce((a, b) => new Date(a.timestamp) > new Date(b.timestamp) ? a : b)
              : null;
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{latestScore ? latestScore.total_score : ''}</td>
                <td>{latestScore ? new Date(latestScore.timestamp).toLocaleString() : ''}</td>
              </tr>
            );
          })}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>
                {searchTerm ? 'No matching users found' : 'No scores yet'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default Admin; 