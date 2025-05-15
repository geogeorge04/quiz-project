import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login'; // Assuming Login.tsx is in ./components
import Quiz from './components/Quiz';     // Assuming Quiz.tsx is in ./components
import Admin from './components/Admin';
import styled from 'styled-components';
import { saveUser } from './utils/storage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  color: #2C3E50;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  padding: 0 1rem;
  word-wrap: break-word;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const AppContent = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 0.5rem;
  
  @media (min-width: 768px) {
    padding: 0;
  }
`;

// Separate component for the routes to use navigation
const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = async (userInfo: { name: string; email: string; contact: string }) => {
    try {
      const saved = saveUser(userInfo);
      if (!saved) {
        throw new Error('Failed to save user data');
      }
      navigate('/quiz');
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login onStart={handleStartQuiz} />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/quiz-project">
      <AppContainer>
        <Title>Interactive Quiz Challenge</Title>
        <AppContent>
          <AppRoutes />
        </AppContent>
      </AppContainer>
    </Router>
  );
};

export default App;
