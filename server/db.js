// In-memory storage for development and testing
const users = new Map();
const scores = new Map();
let nextUserId = 1;
let nextScoreId = 1;

// User functions
const createUser = async (userData) => {
  const id = nextUserId++;
  users.set(id, { ...userData, _id: id });
  return { ...userData, _id: id };
};

const findUser = async (query) => {
  for (const [_, user] of users) {
    if (user.name === query.name) {
      return user;
    }
  }
  return null;
};

// Score functions
const saveScore = async (scoreData) => {
  const id = nextScoreId++;
  const score = { ...scoreData, _id: id, timestamp: new Date() };
  scores.set(id, score);
  return score;
};

const getScores = async () => {
  return Array.from(scores.values())
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);
};

module.exports = {
  createUser,
  findUser,
  saveScore,
  getScores
}; 