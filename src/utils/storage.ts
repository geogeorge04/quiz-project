interface UserData {
  name: string;
  email: string;
  contact: string;
  timestamp: string;
}

const STORAGE_KEY = 'quiz_users';

export const saveUser = (userData: Omit<UserData, 'timestamp'>) => {
  try {
    // Get existing users
    const existingUsers = getUsers();
    
    // Add new user with timestamp
    const newUser = {
      ...userData,
      timestamp: new Date().toISOString()
    };
    
    // Save updated list
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingUsers, newUser]));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

export const getUsers = (): UserData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}; 