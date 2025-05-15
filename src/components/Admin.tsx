import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

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

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  flex: 1;
  min-width: 150px;
  
  h3 {
    color: #2C3E50;
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
  }
  
  p {
    color: #4CAF50;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

interface UserData {
  id: string;
  name: string;
  email: string;
  contact: string;
  timestamp: {
    toDate: () => Date;
  };
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'quiz-users'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData: UserData[] = [];
      snapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() } as UserData);
      });
      setUsers(userData);
      setFilteredUsers(userData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.contact.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const getTodayCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return users.filter(user => user.timestamp.toDate() >= today).length;
  };

  return (
    <AdminContainer>
      <Title>Quiz User Data</Title>
      
      <StatsContainer>
        <StatCard>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </StatCard>
        <StatCard>
          <h3>Today's Logins</h3>
          <p>{getTodayCount()}</p>
        </StatCard>
      </StatsContainer>

      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="Search by name, email, or contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.timestamp?.toDate().toLocaleString()}</td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
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