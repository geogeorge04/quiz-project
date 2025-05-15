interface UserData {
  name: string;
  email: string;
  contact: string;
  timestamp: string;
}

// For GitHub Pages deployment, we'll fall back to localStorage
const isProduction = window.location.hostname !== 'localhost';

const saveUserToLocalStorage = (userData: Omit<UserData, 'timestamp'>): boolean => {
  try {
    const users = getUsersFromLocalStorage();
    const newUser = {
      ...userData,
      timestamp: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('quiz_users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

const getUsersFromLocalStorage = (): UserData[] => {
  try {
    const data = localStorage.getItem('quiz_users');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveUser = async (userData: Omit<UserData, 'timestamp'>): Promise<boolean> => {
  if (isProduction) {
    return saveUserToLocalStorage(userData);
  }

  try {
    const response = await fetch('http://localhost:3001/api/users', {
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
  if (isProduction) {
    return getUsersFromLocalStorage();
  }

  try {
    const response = await fetch('http://localhost:3001/api/users');
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