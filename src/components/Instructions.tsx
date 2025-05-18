import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const InstructionsContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const InstructionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 2rem 0;

  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
    color: #2C3E50;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #3498db;
    }
  }
`;

const ContinueButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;

  &:hover {
    background: #2980b9;
  }
`;

const Title = styled.h2`
  color: #2C3E50;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Instructions: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <InstructionsContainer>
      <Title>Quiz Instructions</Title>
      <InstructionsList>
        <li>The quiz consists of 5 questions in total.</li>
        <li>You will have 3 minutes to complete the quiz.</li>
        <li>The quiz will terminate immediately upon submitting a wrong answer.</li>
        <li>If you answer all questions correctly without any errors, you will receive a certificate of completion.</li>
        <li>You must enter the exact correct answer as the password for each question. Any spelling mistake or variation will be treated as incorrect and will end the quiz.</li>
        <li>The decision of the committee will be final in all matters related to the quiz.</li>
      </InstructionsList>
      <ContinueButton onClick={handleContinue}>
        Continue to Login
      </ContinueButton>
    </InstructionsContainer>
  );
};

export default Instructions; 