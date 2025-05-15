const config = {
  port: process.env.PORT || 3000,
  allowedOrigins: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://geogeorge04.github.io'
  ],
  env: process.env.NODE_ENV || 'development'
};

// Log config on startup
console.log('Server Configuration:', {
  environment: config.env,
  port: config.port,
  origins: config.allowedOrigins
});

module.exports = config; 