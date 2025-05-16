const { MongoClient } = require('mongodb');

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
});

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas successfully');
        db = client.db();
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}

process.on('SIGINT', async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
    process.exit(0);
});

module.exports = {
    connectToDatabase,
    getDb
}; 