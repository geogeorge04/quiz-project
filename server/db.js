const { MongoClient } = require('mongodb');

// Use environment variable for MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://geogeorge04:<password>@quiz.rs7jx0m.mongodb.net/?retryWrites=true&w=majority";

// Create MongoDB client with TLS options
const client = new MongoClient(uri, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsInsecure: false,
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
        console.log('Connected to MongoDB');
        db = client.db('quiz-app');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
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