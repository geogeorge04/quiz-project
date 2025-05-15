const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'YOUR_RENDER_API_URL' // Replace this with your Render.com API URL once deployed
    : 'http://localhost:3000'
};

export default config; 