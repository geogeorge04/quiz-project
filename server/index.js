const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const app = express();

// Middleware
app.use(cors({
  origin: config.allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Data file path
const dataFile = path.join(__dirname, 'users.json');

// Initialize empty users array if file doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Quiz App Backend API',
    endpoints: {
      health: '/health',
      users: '/api/users'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(dataFile));
    res.json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    res.status(500).json({ error: 'Error reading users data' });
  }
});

// Add new user
app.post('/api/users', (req, res) => {
  try {
    console.log('Received user data:', req.body);
    const users = JSON.parse(fs.readFileSync(dataFile));
    const newUser = {
      ...req.body,
      timestamp: new Date().toISOString()
    };
    users.push(newUser);
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
    console.log('User saved successfully');
    res.json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user data' });
  }
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    endpoint: req.originalUrl
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
}); 