import React from 'react';
import Quiz from './components/Quiz';
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

const App: React.FC = () => {
  return (
    <AppContainer>
      <Title>Interactive Quiz Challenge</Title>
      <Quiz />
    </AppContainer>
  );
};

export default App;
