import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Question } from '../data/questions';
import { questions } from '../data/questions';
import { useNavigate } from 'react-router-dom';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const QuestionText = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button<{ selected?: boolean; correct?: boolean }>`
  padding: 1rem;
  border: 2px solid ${props => {
    if (props.selected && props.correct) return '#4CAF50';
    if (props.selected) return '#d32f2f';
    return '#ddd';
  }};
  border-radius: 5px;
  background: ${props => {
    if (props.selected && props.correct) return '#E8F5E9';
    if (props.selected) return '#FFEBEE';
    return 'white';
  }};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => {
      if (props.selected && props.correct) return '#E8F5E9';
      if (props.selected) return '#FFEBEE';
      return '#f0f0f0';
    }};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  margin-bottom: 2rem;
`;

const Progress = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: #4CAF50;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#d32f2f' : '#4CAF50'};
  margin: 1rem 0;
  font-weight: 500;
  text-align: center;
`;

const NextButton = styled.button`
  padding: 1rem 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Randomly select 5 questions
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      
      if (selected.length === 0) {
        throw new Error('No questions available');
      }
      
      setSelectedQuestions(selected);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / 5) * 100;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
    setIsCorrect(option === currentQuestion?.correctAnswer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
      setShowResult(false);
    } else {
      alert('Congratulations! You have completed the quiz!');
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <h2>Loading questions...</h2>
      </LoadingContainer>
    );
  }

  if (!currentQuestion || selectedQuestions.length === 0) {
    return (
      <LoadingContainer>
        <h2>No questions available</h2>
        <NextButton onClick={() => navigate('/')}>Return to Home</NextButton>
      </LoadingContainer>
    );
  }

  return (
    <QuizContainer>
      <ProgressBar>
        <Progress width={progress} />
      </ProgressBar>
      
      <QuestionText>
        Question {currentQuestionIndex + 1}/5: {currentQuestion.question}
      </QuestionText>

      <OptionsContainer>
        {currentQuestion.options.map((option, index) => (
          <Option
            key={index}
            selected={selectedOption === option}
            correct={option === currentQuestion.correctAnswer}
            onClick={() => !showResult && handleOptionSelect(option)}
            disabled={showResult}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>

      {showResult && (
        <>
          <Message isError={!isCorrect}>
            {isCorrect 
              ? '✨ Correct! Well done!' 
              : `❌ Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
          </Message>
          <NextButton onClick={handleNextQuestion}>
            {currentQuestionIndex < 4 ? 'Next Question' : 'Complete Quiz'}
          </NextButton>
        </>
      )}
    </QuizContainer>
  );
};

export default Quiz; 