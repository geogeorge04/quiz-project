# Quiz App Backend

A simple Node.js/Express server for storing quiz user data.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/users` - Get all users
- `POST /api/users` - Add a new user

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (development/production) 