const express = require('express');
const cors = require('cors');
const config = require('./config');
const { createUser, findUser, saveScore, getScores } = require('./db');

const app = express();

// Middleware
app.use(cors({
  origin: config.allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Quiz App Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Add new user
app.post('/api/users', async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    // Check if user exists
    const existingUser = await findUser({ name: req.body.name });
    if (existingUser) {
      return res.json(existingUser);
    }
    // Create new user if doesn't exist
    const newUser = await createUser(req.body);
    console.log('User saved successfully:', newUser._id);
    res.json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user data', details: error.message });
  }
});

// Get all scores
app.get('/api/scores', async (req, res) => {
  try {
    const scores = await getScores();
    res.json(scores);
  } catch (error) {
    console.error('Error reading scores:', error);
    res.status(500).json({ error: 'Error reading scores data', details: error.message });
  }
});

// Add a new score
app.post('/api/scores', async (req, res) => {
  try {
    console.log('Received score data:', req.body);
    const newScore = await saveScore(req.body);
    console.log('Score saved successfully:', newScore._id);
    res.json(newScore);
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Error saving score data', details: error.message });
  }
});

// Handle 404s
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.originalUrl}`);
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

// Start the server
const server = app.listen(config.port, () => {
  console.log('Server Configuration:', config);
  console.log(`Server running at http://localhost:${config.port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Allowed origins:', config.allowedOrigins);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}); 