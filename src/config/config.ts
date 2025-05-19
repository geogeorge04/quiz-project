const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://your-app-name.onrender.com' // Replace with your actual Render.com URL
    : 'http://localhost:3000'
};

export default config; 