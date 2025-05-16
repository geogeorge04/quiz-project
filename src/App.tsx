import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login'; // Assuming Login.tsx is in ./components
import Quiz from './components/Quiz';     // Assuming Quiz.tsx is in ./components
import Admin from './components/Admin';
import AdminAuth from './components/AdminAuth';
import styled from 'styled-components';
import { saveUser } from './utils/storage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Title = styled.h1`
  color: #2C3E50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  padding: 0 1rem;
  word-wrap: break-word;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const AppContent = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4rem);
  
  @media (max-width: 768px) {
    min-height: calc(100vh - 2rem);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    padding: 0.8rem;
  }
`;

// Separate component for the routes to use navigation
const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (userInfo: { name: string; email: string; contact: string }) => {
    try {
      setError(null);
      const saved = await saveUser(userInfo);
      if (!saved) {
        throw new Error('Failed to save user data');
      }
      navigate('/quiz');
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('There was an error saving your information. Please try again.');
    }
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Routes>
        <Route path="/" element={<Login onStart={handleStartQuiz} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
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
