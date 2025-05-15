interface UserData {
  name: string;
  email: string;
  contact: string;
  timestamp: string;
}

export interface ScoreData {
  userId: string;
  name: string;
  totalScore: number;
  categoryScores: Record<string, { correct: number; total: number }>;
}

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : 'https://quiz-app-backend-vpp3.onrender.com/api';

export const saveUser = async (userData: Omit<UserData, 'timestamp'>): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save user data');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

export const getUsers = async (): Promise<UserData[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const saveScore = async (scoreData: ScoreData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save score data');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving score:', error);
    return false;
  }
}; 