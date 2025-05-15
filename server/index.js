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

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Data file path
const dataFile = path.join(__dirname, 'users.json');
console.log('Data file path:', dataFile);

// Ensure data file exists with proper permissions
try {
  if (!fs.existsSync(dataFile)) {
    console.log('Creating users.json file...');
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2), { mode: 0o644 });
    console.log('Initialized empty users.json file');
  } else {
    // Verify file is readable and writable
    fs.accessSync(dataFile, fs.constants.R_OK | fs.constants.W_OK);
    console.log('Users.json file exists and is accessible');
    // Log current contents
    const currentData = fs.readFileSync(dataFile, 'utf8');
    console.log('Current data in file:', currentData);
  }
} catch (error) {
  console.error('Error with data file:', error);
  // Try creating the file in the /tmp directory as fallback
  const tmpFile = path.join('/tmp', 'users.json');
  try {
    fs.writeFileSync(tmpFile, JSON.stringify([], null, 2), { mode: 0o644 });
    console.log('Created users.json in /tmp directory');
    // Update dataFile path to use tmp
    dataFile = tmpFile;
  } catch (retryError) {
    console.error('Critical error: Could not create or access data file:', retryError);
    process.exit(1);
  }
}

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

// Get all users
app.get('/api/users', (req, res) => {
  try {
    console.log('Reading from:', dataFile);
    const data = fs.readFileSync(dataFile, 'utf8');
    console.log('Raw data:', data);
    const users = JSON.parse(data);
    console.log(`Retrieved ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    res.status(500).json({ error: 'Error reading users data', details: error.message });
  }
});

// Add new user
app.post('/api/users', (req, res) => {
  try {
    console.log('Received user data:', req.body);
    const data = fs.readFileSync(dataFile, 'utf8');
    console.log('Current data:', data);
    const users = JSON.parse(data);
    const newUser = {
      ...req.body,
      timestamp: new Date().toISOString()
    };
    users.push(newUser);
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
    console.log('User saved successfully');
    console.log('Updated data:', fs.readFileSync(dataFile, 'utf8'));
    res.json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user data', details: error.message });
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

const server = app.listen(config.port, () => {
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