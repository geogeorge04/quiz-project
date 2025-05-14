import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login'; // Assuming Login.tsx is in ./components
import Quiz from './components/Quiz';     // Assuming Quiz.tsx is in ./components
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const AppContent = styled.div`
  width: 100%;
  max-width: 800px; /* Adjust as needed */
`;

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = (userInfo: { name: string; email: string; contact: string }) => {
    console.log('User Info:', userInfo);
    //  You might want to store user info in a global state management solution (like Redux or React Context)
    //  so that the Quiz component can access it.  For now, we just navigate.
    navigate('/quiz');
  };

  return (
    <AppContainer>
      <Title>Interactive Quiz Challenge</Title>
      <AppContent>
        <Routes>
          <Route path="/" element={<Login onStart={handleStartQuiz} />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </AppContent>
    </AppContainer>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
