import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import API_URL from storage
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
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

const CategoryScores = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

interface Score {
  id: number;
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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/users-with-scores`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCategoryScores = (categoryScores: Record<string, { correct: number; total: number }>) => {
    return Object.entries(categoryScores)
      .map(([category, scores]) => 
        `${category}: ${scores.correct}/${scores.total} (${Math.round((scores.correct/scores.total)*100)}%)`
      )
      .join(' | ');
  };

  if (loading && users.length === 0) {
    return (
      <AdminContainer>
        <Title>User List</Title>
        <LoadingMessage>Loading user data...</LoadingMessage>
      </AdminContainer>
    );
  }

  if (error) {
    return (
      <AdminContainer>
        <Title>User List</Title>
        <ErrorMessage>{error}</ErrorMessage>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Title>User List</Title>
      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/scores">
          <ExportButton as="span">View All Scores</ExportButton>
        </Link>
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Latest Score</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => {
            const latestScore = user.scores[0]; // Scores are ordered by timestamp DESC
            const totalScore = user.scores.reduce((sum, score) => sum + score.total_score, 0);
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  {latestScore ? `${latestScore.total_score}/5` : 'No attempts'}
                </td>
                <td>
                  {latestScore ? totalScore : '-'}
                </td>
              </tr>
            );
          })}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                {searchTerm ? 'No matching users found' : 'No users yet'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default Admin; 