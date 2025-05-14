export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  password: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    password: "eiffel"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    password: "cosmos"
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    password: "ocean"
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Copper", "Gold", "Aluminum"],
    correctAnswer: "Gold",
    password: "metal"
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
    password: "deep"
  }
]; 