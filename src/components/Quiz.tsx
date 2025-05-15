import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Question } from '../data/questions';
import { questions } from '../data/questions';
import { useNavigate } from 'react-router-dom';
import { saveScore } from '../utils/storage';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0.5rem auto;
    width: 90%;
  }
`;

const QuestionText = styled.h2`
  color: #2C3E50;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  word-wrap: break-word;
  font-weight: bold;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e9ecef;
  border-radius: 8px;
  margin-bottom: 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 8px;
    margin-bottom: 1.5rem;
  }
`;

const Progress = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: #4CAF50;
  border-radius: 8px;
  transition: width 0.3s ease;
`;

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? '#d32f2f' : '#4CAF50'};
  margin: 1.5rem 0;
  font-weight: bold;
  text-align: center;
  font-size: 1.1rem;
  word-wrap: break-word;
  background: ${props => props.isError ? '#FFEBEE' : '#E8F5E9'};
  padding: 1.2rem;
  border-radius: 8px;
  border: 1px solid ${props => props.isError ? '#ffcdd2' : '#c8e6c9'};
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 1rem 0;
    padding: 1rem;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem auto;
    width: 90%;
  }

  h2 {
    font-size: 1.5rem;
    color: #2C3E50;
    font-weight: bold;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const OptionButton = styled.button`
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  word-wrap: break-word;
  display: flex;
  align-items: center;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionLabel = styled.span`
  margin-right: 1rem;
  font-weight: bold;
  color: #6c757d;
`;

const HintText = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  font-style: italic;
`;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number, total: number }>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Randomly select 5 questions, ensuring diversity across categories
      const categories = Array.from(new Set(questions.map(q => q.category)));
      let selected: Question[] = [];
      
      // First, ensure at least one question from different categories (up to 5)
      const shuffledCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 5);
      shuffledCategories.forEach(category => {
        const categoryQuestions = questions.filter(q => q.category === category);
        const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
        if (randomQuestion) {
          selected.push(randomQuestion);
        }
      });
      
      // If we have less than 5 questions, fill the remaining slots randomly
      const remainingCount = 5 - selected.length;
      if (remainingCount > 0) {
        const remainingQuestions = questions.filter(q => !selected.includes(q));
        const shuffled = [...remainingQuestions].sort(() => 0.5 - Math.random());
        selected = [...selected, ...shuffled.slice(0, remainingCount)];
      }
      
      // Shuffle the final selection
      selected = selected.sort(() => 0.5 - Math.random());
      
      if (selected.length === 0) {
        throw new Error('No questions available');
      }
      
      setSelectedQuestions(selected);
      
      // Initialize category scores
      const initialCategoryScores: Record<string, { correct: number, total: number }> = {};
      categories.forEach(category => {
        initialCategoryScores[category] = { correct: 0, total: 0 };
      });
      setCategoryScores(initialCategoryScores);
      
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOptionClick = (option: string) => {
    setPassword(option);
    setSelectedOption(option);
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / 5) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = password.toLowerCase() === currentQuestion?.password?.toLowerCase();
    setShowResult(true);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      
      // Update category scores
      if (currentQuestion?.category) {
        setCategoryScores(prev => ({
          ...prev,
          [currentQuestion.category]: {
            correct: prev[currentQuestion.category]?.correct + 1,
            total: (prev[currentQuestion.category]?.total || 0) + 1
          }
        }));
      }

      // Move to next question after a short delay
      setTimeout(async () => {
        if (currentQuestionIndex < 4) {
          setCurrentQuestionIndex(prev => prev + 1);
          setPassword('');
          setShowResult(false);
          setSelectedOption(null);
        } else {
          // Calculate final scores
          const finalCategoryScores = Object.entries(categoryScores)
            .filter(([_, scores]) => scores.total > 0)
            .reduce((acc, [category, scores]) => {
              const updatedScores = category === currentQuestion.category 
                ? { correct: scores.correct + 1, total: scores.total + 1 }
                : scores;
              acc[category] = updatedScores;
              return acc;
            }, {} as Record<string, { correct: number, total: number }>);

          const finalScore = score + 1;
          
          // Save score to database
          try {
            const userData = localStorage.getItem('quizUserData');
            if (!userData) {
              throw new Error('User data not found');
            }
            
            const { name, _id } = JSON.parse(userData);
            const saved = await saveScore({
              userId: _id,
              name,
              totalScore: finalScore,
              categoryScores: finalCategoryScores
            });
            
            if (!saved) {
              throw new Error('Failed to save score');
            }
          } catch (err) {
            console.error('Error saving score:', err);
            setError('Failed to save your score, but the quiz is complete.');
          }

          // Show final score with category breakdown
          const scoreMessage = `Final Score: ${finalScore}/5\n\nCategory Breakdown:\n${
            Object.entries(finalCategoryScores)
              .map(([category, scores]) => 
                `${category}: ${scores.correct}/${scores.total} (${Math.round((scores.correct/scores.total)*100)}%)`
              )
              .join('\n')
          }`;
          
          alert(scoreMessage);
          navigate('/');
        }
      }, 1500);
    } else {
      // End session on wrong password
      setTimeout(() => {
        alert('Incorrect answer. Quiz session ended.');
        navigate('/');
      }, 1500);
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
        <button onClick={() => navigate('/')}>Return to Home</button>
      </LoadingContainer>
    );
  }

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <QuizContainer>
      {error && <Message isError>{error}</Message>}
      <ProgressBar>
        <Progress width={progress} />
      </ProgressBar>
      
      <QuestionText>
        Question {currentQuestionIndex + 1}/5: {currentQuestion.question}
      </QuestionText>

      <HintText>Click an option to select your answer:</HintText>

      <OptionsContainer>
        {currentQuestion.options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              background: selectedOption === option ? '#e9ecef' : '#f8f9fa',
              border: selectedOption === option ? '2px solid #4CAF50' : '1px solid #e9ecef'
            }}
          >
            <OptionLabel>{optionLabels[index]})</OptionLabel>
            {option}
          </OptionButton>
        ))}
      </OptionsContainer>

      <form onSubmit={handleSubmit}>
        <PasswordInput
          type="hidden"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={showResult}
          autoComplete="off"
        />
        <SubmitButton type="submit" disabled={!password || showResult}>
          Submit Answer
        </SubmitButton>
      </form>

      {showResult && (
        <Message isError={!isCorrect}>
          {isCorrect 
            ? '✨ Correct! Moving to next question...' 
            : '❌ Incorrect answer. Session ending...'}
        </Message>
      )}
    </QuizContainer>
  );
};

export default Quiz; 