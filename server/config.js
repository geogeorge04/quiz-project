const config = {
  port: process.env.PORT || 3001,
  allowedOrigins: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://geogeorge04.github.io',
    'https://quiz-app-backend-vpp3.onrender.com',
    // Allow all during development
    process.env.NODE_ENV !== 'production' ? '*' : null
  ].filter(Boolean) // Remove null values
};

module.exports = config; 