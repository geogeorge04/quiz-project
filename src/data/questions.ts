export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

export const questions: Question[] = [
  // Science & Technology
  {
    id: 1,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: "Au",
    category: "Science"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science"
  },
  {
    id: 3,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Body"],
    correctAnswer: "Mitochondria",
    category: "Science"
  },
  {
    id: 4,
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
    correctAnswer: "Alexander Graham Bell",
    category: "Science"
  },
  {
    id: 5,
    question: "What is the speed of light?",
    options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
    correctAnswer: "299,792 km/s",
    category: "Science"
  },
  {
    id: 6,
    question: "Which programming language is known as the 'mother of all languages'?",
    options: ["C", "FORTRAN", "COBOL", "Assembly"],
    correctAnswer: "Assembly",
    category: "Technology"
  },
  {
    id: 7,
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
    correctAnswer: "Central Processing Unit",
    category: "Technology"
  },
  {
    id: 8,
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: "2007",
    category: "Technology"
  },
  {
    id: 9,
    question: "Who is the co-founder of Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
    correctAnswer: "Bill Gates",
    category: "Technology"
  },
  {
    id: 10,
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Machine Language", "HighText Markup Language"],
    correctAnswer: "HyperText Markup Language",
    category: "Technology"
  },
  
  // History & Geography
  {
    id: 11,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography"
  },
  {
    id: 12,
    question: "Which is the largest country by area?",
    options: ["China", "USA", "Canada", "Russia"],
    correctAnswer: "Russia",
    category: "Geography"
  },
  {
    id: 13,
    question: "Which river is the longest in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: "Nile",
    category: "Geography"
  },
  {
    id: 14,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
    category: "Geography"
  },
  {
    id: 15,
    question: "Which desert is the largest in the world?",
    options: ["Gobi", "Sahara", "Arabian", "Antarctic"],
    correctAnswer: "Antarctic",
    category: "Geography"
  },
  {
    id: 16,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
    category: "History"
  },
  {
    id: 17,
    question: "Who was the first President of the United States?",
    options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
    correctAnswer: "George Washington",
    category: "History"
  },
  {
    id: 18,
    question: "Which empire was ruled by Caesar?",
    options: ["Greek", "Persian", "Roman", "Ottoman"],
    correctAnswer: "Roman",
    category: "History"
  },
  {
    id: 19,
    question: "When did the Industrial Revolution begin?",
    options: ["Late 1700s", "Early 1800s", "Mid 1800s", "Late 1800s"],
    correctAnswer: "Late 1700s",
    category: "History"
  },
  {
    id: 20,
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correctAnswer: "Leonardo da Vinci",
    category: "History"
  },

  // Arts & Literature
  {
    id: 21,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    category: "Literature"
  },
  {
    id: 22,
    question: "Which artist cut off his own ear?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dali"],
    correctAnswer: "Vincent van Gogh",
    category: "Arts"
  },
  {
    id: 23,
    question: "Who wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: "George Orwell",
    category: "Literature"
  },
  {
    id: 24,
    question: "What art movement did Andy Warhol belong to?",
    options: ["Impressionism", "Surrealism", "Pop Art", "Cubism"],
    correctAnswer: "Pop Art",
    category: "Arts"
  },
  {
    id: 25,
    question: "Who painted 'The Starry Night'?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dali"],
    correctAnswer: "Vincent van Gogh",
    category: "Arts"
  },

  // Sports & Entertainment
  {
    id: 26,
    question: "Which country won the first FIFA World Cup?",
    options: ["Brazil", "Uruguay", "Argentina", "Germany"],
    correctAnswer: "Uruguay",
    category: "Sports"
  },
  {
    id: 27,
    question: "In which sport would you perform a slam dunk?",
    options: ["Football", "Basketball", "Tennis", "Hockey"],
    correctAnswer: "Basketball",
    category: "Sports"
  },
  {
    id: 28,
    question: "Who has won the most Olympic medals?",
    options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Larisa Latynina"],
    correctAnswer: "Michael Phelps",
    category: "Sports"
  },
  {
    id: 29,
    question: "Which movie won the first Academy Award for Best Picture?",
    options: ["Wings", "Sunrise", "The Jazz Singer", "The Broadway Melody"],
    correctAnswer: "Wings",
    category: "Entertainment"
  },
  {
    id: 30,
    question: "Who is known as the 'King of Pop'?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "David Bowie"],
    correctAnswer: "Michael Jackson",
    category: "Entertainment"
  },

  // General Knowledge
  {
    id: 31,
    question: "What is the largest organ in the human body?",
    options: ["Brain", "Liver", "Skin", "Heart"],
    correctAnswer: "Skin",
    category: "General"
  },
  {
    id: 32,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    category: "General"
  },
  {
    id: 33,
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: "Yen",
    category: "General"
  },
  {
    id: 34,
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctAnswer: "Lion",
    category: "General"
  },
  {
    id: 35,
    question: "What is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond",
    category: "General"
  },
  {
    id: 36,
    question: "What percentage of the Earth's surface is water?",
    options: ["51%", "61%", "71%", "81%"],
    correctAnswer: "71%",
    category: "General"
  },
  {
    id: 37,
    question: "How many bones are in the human body?",
    options: ["186", "206", "226", "246"],
    correctAnswer: "206",
    category: "General"
  },
  {
    id: 38,
    question: "What is the most spoken language in the world?",
    options: ["English", "Spanish", "Hindi", "Mandarin"],
    correctAnswer: "Mandarin",
    category: "General"
  },
  {
    id: 39,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctAnswer: "Mercury",
    category: "Science"
  },
  {
    id: 40,
    question: "What is the chemical formula for water?",
    options: ["CO2", "H2O", "O2", "N2"],
    correctAnswer: "H2O",
    category: "Science"
  },
  {
    id: 41,
    question: "Who painted the ceiling of the Sistine Chapel?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correctAnswer: "Michelangelo",
    category: "Arts"
  },
  {
    id: 42,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    category: "Geography"
  },
  {
    id: 43,
    question: "Who wrote 'The Great Gatsby'?",
    options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "Virginia Woolf"],
    correctAnswer: "F. Scott Fitzgerald",
    category: "Literature"
  },
  {
    id: 44,
    question: "What year did the Berlin Wall fall?",
    options: ["1987", "1988", "1989", "1990"],
    correctAnswer: "1989",
    category: "History"
  },
  {
    id: 45,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Carbon", "Oxygen"],
    correctAnswer: "Hydrogen",
    category: "Science"
  },
  {
    id: 46,
    question: "Who invented the World Wide Web?",
    options: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
    correctAnswer: "Tim Berners-Lee",
    category: "Technology"
  },
  {
    id: 47,
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctAnswer: "Jupiter",
    category: "Science"
  },
  {
    id: 48,
    question: "Which country is home to the Great Barrier Reef?",
    options: ["Brazil", "Indonesia", "Australia", "Thailand"],
    correctAnswer: "Australia",
    category: "Geography"
  },
  {
    id: 49,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.D. Salinger", "John Steinbeck", "Ernest Hemingway"],
    correctAnswer: "Harper Lee",
    category: "Literature"
  },
  {
    id: 50,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
    category: "General"
  }
]; 