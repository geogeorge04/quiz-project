export interface Question {
  id: number;
  question: string;
  password: string;
  category: string;
}

export const questions: Question[] = [
  // Science & Technology
  {
    id: 1,
    question: "What is the chemical symbol for gold?",
    password: "Au",
    category: "Science"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    password: "Mars",
    category: "Science"
  },
  {
    id: 3,
    question: "What is the powerhouse of the cell?",
    password: "Mitochondria",
    category: "Science"
  },
  {
    id: 4,
    question: "Who invented the telephone?",
    password: "Bell",
    category: "Science"
  },
  {
    id: 5,
    question: "What is the speed of light in km/s?",
    password: "299792",
    category: "Science"
  },
  {
    id: 6,
    question: "Which programming language is known as the 'mother of all languages'?",
    password: "Assembly",
    category: "Technology"
  },
  {
    id: 7,
    question: "What does CPU stand for?",
    password: "Central Processing Unit",
    category: "Technology"
  },
  {
    id: 8,
    question: "In which year was the first iPhone released?",
    password: "2007",
    category: "Technology"
  },
  {
    id: 9,
    question: "Who is the co-founder of Microsoft?",
    password: "Gates",
    category: "Technology"
  },
  {
    id: 10,
    question: "What does HTML stand for?",
    password: "HyperText Markup Language",
    category: "Technology"
  },
  
  // History & Geography
  {
    id: 11,
    question: "What is the capital of France?",
    password: "Paris",
    category: "Geography"
  },
  {
    id: 12,
    question: "Which is the largest country by area?",
    password: "Russia",
    category: "Geography"
  },
  {
    id: 13,
    question: "Which river is the longest in the world?",
    password: "Nile",
    category: "Geography"
  },
  {
    id: 14,
    question: "What is the capital of Japan?",
    password: "Tokyo",
    category: "Geography"
  },
  {
    id: 15,
    question: "Which desert is the largest in the world?",
    password: "Antarctic",
    category: "Geography"
  },
  {
    id: 16,
    question: "In which year did World War II end?",
    password: "1945",
    category: "History"
  },
  {
    id: 17,
    question: "Who was the first President of the United States?",
    password: "Washington",
    category: "History"
  },
  {
    id: 18,
    question: "Which empire was ruled by Caesar?",
    password: "Roman",
    category: "History"
  },
  {
    id: 19,
    question: "When did the Industrial Revolution begin?",
    password: "1760",
    category: "History"
  },
  {
    id: 20,
    question: "Who painted the Mona Lisa?",
    password: "Da Vinci",
    category: "History"
  },

  // Arts & Literature
  {
    id: 21,
    question: "Who wrote 'Romeo and Juliet'?",
    password: "Shakespeare",
    category: "Literature"
  },
  {
    id: 22,
    question: "Which artist cut off his own ear?",
    password: "Van Gogh",
    category: "Arts"
  },
  {
    id: 23,
    question: "Who wrote '1984'?",
    password: "Orwell",
    category: "Literature"
  },
  {
    id: 24,
    question: "What art movement did Andy Warhol belong to?",
    password: "Pop Art",
    category: "Arts"
  },
  {
    id: 25,
    question: "Who painted 'The Starry Night'?",
    password: "Van Gogh",
    category: "Arts"
  },

  // Sports & Entertainment
  {
    id: 26,
    question: "Which country won the first FIFA World Cup?",
    password: "Uruguay",
    category: "Sports"
  },
  {
    id: 27,
    question: "In which sport would you perform a slam dunk?",
    password: "Basketball",
    category: "Sports"
  },
  {
    id: 28,
    question: "Who has won the most Olympic medals?",
    password: "Phelps",
    category: "Sports"
  },
  {
    id: 29,
    question: "Which movie won the first Academy Award for Best Picture?",
    password: "Wings",
    category: "Entertainment"
  },
  {
    id: 30,
    question: "Who is known as the 'King of Pop'?",
    password: "Jackson",
    category: "Entertainment"
  },

  // General Knowledge
  {
    id: 31,
    question: "What is the largest organ in the human body?",
    password: "Skin",
    category: "General"
  },
  {
    id: 32,
    question: "How many continents are there?",
    password: "7",
    category: "General"
  },
  {
    id: 33,
    question: "What is the currency of Japan?",
    password: "Yen",
    category: "General"
  },
  {
    id: 34,
    question: "Which animal is known as the 'King of the Jungle'?",
    password: "Lion",
    category: "General"
  },
  {
    id: 35,
    question: "What is the hardest natural substance?",
    password: "Diamond",
    category: "General"
  },
  {
    id: 36,
    question: "What percentage of Earth's surface is water?",
    password: "71",
    category: "General"
  },
  {
    id: 37,
    question: "How many bones are in the human body?",
    password: "206",
    category: "General"
  },
  {
    id: 38,
    question: "What is the most spoken language in the world?",
    password: "Mandarin",
    category: "General"
  },
  {
    id: 39,
    question: "Which planet is closest to the Sun?",
    password: "Mercury",
    category: "Science"
  },
  {
    id: 40,
    question: "What is the chemical formula for water?",
    password: "H2O",
    category: "Science"
  },
  {
    id: 41,
    question: "Who painted the ceiling of the Sistine Chapel?",
    password: "Michelangelo",
    category: "Arts"
  },
  {
    id: 42,
    question: "What is the capital of Australia?",
    password: "Canberra",
    category: "Geography"
  },
  {
    id: 43,
    question: "Who wrote 'The Great Gatsby'?",
    password: "Fitzgerald",
    category: "Literature"
  },
  {
    id: 44,
    question: "In what year did the Berlin Wall fall?",
    password: "1989",
    category: "History"
  },
  {
    id: 45,
    question: "Which element has the atomic number 1?",
    password: "Hydrogen",
    category: "Science"
  },
  {
    id: 46,
    question: "Who invented the World Wide Web?",
    password: "Berners-Lee",
    category: "Technology"
  },
  {
    id: 47,
    question: "What is the largest planet in our solar system?",
    password: "Jupiter",
    category: "Science"
  },
  {
    id: 48,
    question: "Which country is home to the Great Barrier Reef?",
    password: "Australia",
    category: "Geography"
  },
  {
    id: 49,
    question: "Who wrote 'To Kill a Mockingbird'?",
    password: "Lee",
    category: "Literature"
  },
  {
    id: 50,
    question: "What is the smallest prime number?",
    password: "2",
    category: "General"
  }
]; 