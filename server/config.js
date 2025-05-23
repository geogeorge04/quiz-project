const config = {
  port: process.env.PORT || 3000,
  allowedOrigins: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://geogeorge04.github.io',
    'https://quiz-master-7kp8.onrender.com'
  ],
  env: process.env.NODE_ENV || 'development',
  dataDir: process.env.NODE_ENV === 'production' ? '/tmp' : __dirname
};

// Log config on startup
console.log('Server Configuration:', {
  environment: config.env,
  port: config.port,
  origins: config.allowedOrigins,
  dataDir: config.dataDir
});

module.exports = config; 