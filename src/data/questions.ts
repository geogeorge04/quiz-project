export interface Question {
  id: number;
  question: string;
  password: string;
  category: string;
  options: string[];
}

export const questions: Question[] = [
  // General Knowledge
  {
    id: 1,
    question: "What is the capital of France?",
    password: "Paris",
    category: "Geography",
    options: ["Berlin", "Madrid", "Paris", "Rome"]
  },
  {
    id: 2,
    question: "Which planet is closest to the sun?",
    password: "Mercury",
    category: "Science",
    options: ["Venus", "Earth", "Mars", "Mercury"]
  },
  {
    id: 3,
    question: "What is the largest mammal on Earth?",
    password: "Blue Whale",
    category: "Science",
    options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"]
  },
  {
    id: 4,
    question: "Which country gifted the Statue of Liberty to the United States?",
    password: "France",
    category: "History",
    options: ["Canada", "France", "Italy", "Germany"]
  },
  {
    id: 5,
    question: "Which ocean is the largest by area?",
    password: "Pacific Ocean",
    category: "Geography",
    options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"]
  },
  {
    id: 6,
    question: "How many bones does an adult human have?",
    password: "206",
    category: "Science",
    options: ["206", "180", "220", "250"]
  },
  {
    id: 7,
    question: "What is the chemical symbol for water?",
    password: "H₂O",
    category: "Science",
    options: ["CO₂", "H₂O", "O₂", "NaCl"]
  },
  {
    id: 8,
    question: "Who wrote 'Harry Potter'?",
    password: "J.K. Rowling",
    category: "Literature",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "George Orwell", "William Shakespeare"]
  },
  {
    id: 9,
    question: "Which continent has the most countries?",
    password: "Africa",
    category: "Geography",
    options: ["Asia", "Africa", "Europe", "North America"]
  },
  
  // Kerala Specific
  {
    id: 10,
    question: "Which is the longest river in Kerala?",
    password: "Periyar",
    category: "Kerala",
    options: ["Periyar", "Bharathapuzha", "Pamba", "Chaliyar"]
  },
  {
    id: 11,
    question: "Who was the first Chief Minister of Kerala?",
    password: "E. M. S. Namboodiripad",
    category: "Kerala",
    options: ["K. Karunakaran", "E. M. S. Namboodiripad", "A. K. Antony", "Pattom Thanu Pillai"]
  },
  {
    id: 12,
    question: "The famous Onam festival commemorates the return of which legendary king?",
    password: "Mahabali",
    category: "Kerala",
    options: ["Mahabali", "Ravana", "Harishchandra", "Ashoka"]
  },
  {
    id: 13,
    question: "What is the name of Kerala's classical dance form?",
    password: "Kathakali",
    category: "Kerala",
    options: ["Bharatanatyam", "Kuchipudi", "Kathakali", "Odissi"]
  },
  {
    id: 14,
    question: "In which year was Kerala formed as a state?",
    password: "1956",
    category: "Kerala",
    options: ["1947", "1950", "1956", "1960"]
  },
  {
    id: 15,
    question: "Which is the highest peak in Kerala?",
    password: "Anamudi",
    category: "Kerala",
    options: ["Chembra Peak", "Anamudi", "Agasthyarkoodam", "Meesapulimala"]
  },
  {
    id: 16,
    question: "Who is considered the father of Malayalam language?",
    password: "Thunchaththu Ezhuthachan",
    category: "Kerala",
    options: ["Thunchaththu Ezhuthachan", "Kumaran Asan", "Vallathol Narayana Menon", "Ulloor"]
  },
  {
    id: 17,
    question: "Which Kerala district has the largest forest cover?",
    password: "Idukki",
    category: "Kerala",
    options: ["Idukki", "Palakkad", "Wayanad", "Pathanamthitta"]
  },
  {
    id: 18,
    question: "As per the 2011 Census, which Kerala district had the highest population?",
    password: "Malappuram",
    category: "Kerala",
    options: ["Ernakulam", "Malappuram", "Thiruvananthapuram", "Kollam"]
  },
  {
    id: 19,
    question: "Which district had the highest literacy rate in Kerala according to the 2011 Census?",
    password: "Kottayam",
    category: "Kerala",
    options: ["Pathanamthitta", "Kottayam", "Thrissur", "Alappuzha"]
  },
  {
    id: 20,
    question: "Which economic sector employs the most people in Kerala?",
    password: "Services",
    category: "Kerala",
    options: ["Agriculture", "Industry", "Services", "Fisheries"]
  },
  
  // Statistics & Data
  {
    id: 21,
    question: "Who is known as the 'Father of Indian Statistics'?",
    password: "P.C. Mahalanobis",
    category: "Statistics",
    options: ["Karl Pearson", "Ronald Fisher", "P.C. Mahalanobis", "Francis Galton"]
  },
  {
    id: 22,
    question: "What is the full form of NSSO in India?",
    password: "National Sample Survey Office",
    category: "Statistics",
    options: [
      "National Statistical Service Organization",
      "National Survey and Statistics Office",
      "National Sample Survey Office",
      "National Statistics and Standards Office"
    ]
  },
  {
    id: 23,
    question: "Which age group in India is considered as the working-age population?",
    password: "15-59 years",
    category: "Statistics",
    options: ["0-14 years", "15-59 years", "60+ years", "18-45 years"]
  },
  {
    id: 24,
    question: "In which year was the first Census conducted in India?",
    password: "1872",
    category: "Statistics",
    options: ["1872", "1881", "1901", "1851"]
  },
  {
    id: 25,
    question: "What is the scheduled frequency of the Census in India?",
    password: "10 years",
    category: "Statistics",
    options: ["Every 5 years", "Every 10 years", "Every 15 years", "Every 20 years"]
  },
  
  // Science & Technology
  {
    id: 26,
    question: "What is the hardest natural substance on Earth?",
    password: "Diamond",
    category: "Science",
    options: ["Steel", "Diamond", "Quartz", "Obsidian"]
  },
  {
    id: 27,
    question: "Who was the first woman to win a Nobel Prize?",
    password: "Marie Curie",
    category: "Science",
    options: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace", "Florence Nightingale"]
  },
  {
    id: 28,
    question: "Which famous scientist developed the theory of relativity?",
    password: "Albert Einstein",
    category: "Science",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"]
  },
  {
    id: 29,
    question: "In which year did Facebook launch?",
    password: "2004",
    category: "Technology",
    options: ["2002", "2003", "2004", "2005"]
  },
  {
    id: 30,
    question: "Which Indian city is known as the 'Silicon Valley of India'?",
    password: "Bengaluru",
    category: "Technology",
    options: ["Hyderabad", "Chennai", "Bengaluru", "Pune"]
  },
  
  // History & Culture
  {
    id: 31,
    question: "Which country is known as the Land of the Rising Sun?",
    password: "Japan",
    category: "Geography",
    options: ["China", "Japan", "South Korea", "Thailand"]
  },
  {
    id: 32,
    question: "Who painted the Mona Lisa?",
    password: "Leonardo da Vinci",
    category: "Arts",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Rembrandt"]
  },
  {
    id: 33,
    question: "Who is known as the 'Missile Man of India'?",
    password: "A. P. J. Abdul Kalam",
    category: "History",
    options: ["Homi Bhabha", "Vikram Sarabhai", "A. P. J. Abdul Kalam", "K. Radhakrishnan"]
  },
  {
    id: 34,
    question: "Which is the longest lake in Kerala?",
    password: "Vembanad Lake",
    category: "Kerala",
    options: ["Ashtamudi Lake", "Vembanad Lake", "Sasthamcotta Lake", "Periyar Lake"]
  },
  {
    id: 35,
    question: "Which is the smallest district in Kerala by area?",
    password: "Alappuzha",
    category: "Kerala",
    options: ["Wayanad", "Alappuzha", "Pathanamthitta", "Thrissur"]
  },
  
  // Statistics & Probability
  {
    id: 36,
    question: "Who is considered the father of modern statistics?",
    password: "Ronald Fisher",
    category: "Statistics",
    options: ["Karl Pearson", "Ronald Fisher", "John Tukey", "Francis Galton"]
  },
  {
    id: 37,
    question: "Which country first introduced probability theory as a formal discipline?",
    password: "France",
    category: "Statistics",
    options: ["Germany", "France", "England", "Italy"]
  },
  {
    id: 38,
    question: "Which statistical graph is commonly used to display the distribution of a dataset?",
    password: "Histogram",
    category: "Statistics",
    options: ["Pie Chart", "Histogram", "Scatter Plot", "Line Graph"]
  },
  {
    id: 39,
    question: "Who developed the concept of probability in mathematics?",
    password: "Blaise Pascal",
    category: "Statistics",
    options: ["Blaise Pascal", "Carl Friedrich Gauss", "Pierre-Simon Laplace", "Thomas Bayes"]
  },
  {
    id: 40,
    question: "How many continents are there in the world?",
    password: "Seven",
    category: "Geography",
    options: ["Five", "Six", "Seven", "Eight"]
  },
  
  // Additional Kerala Questions
  {
    id: 41,
    question: "What is the most urbanized district in Kerala (by % urban population)?",
    password: "Ernakulam",
    category: "Kerala",
    options: ["Kozhikode", "Ernakulam", "Kannur", "Thiruvananthapuram"]
  },
  {
    id: 42,
    question: "What is Kerala's rank in India in terms of Human Development Index (HDI)?",
    password: "First",
    category: "Kerala",
    options: ["First", "Second", "Third", "Fourth"]
  },
  {
    id: 43,
    question: "Which crop is most widely cultivated in Kerala?",
    password: "Coconut",
    category: "Kerala",
    options: ["Tea", "Coconut", "Rice", "Banana"]
  },
  {
    id: 44,
    question: "As per the Economic Review, which district receives the highest remittance inflow?",
    password: "Malappuram",
    category: "Kerala",
    options: ["Kottayam", "Malappuram", "Thrissur", "Pathanamthitta"]
  },
  {
    id: 45,
    question: "What is the approximate infant mortality rate (IMR) in Kerala (as per recent DES data)?",
    password: "7",
    category: "Kerala",
    options: ["20 per 1000 live births", "12 per 1000 live births", "7 per 1000 live births", "4 per 1000 live births"]
  },
  
  // Indian Statistics
  {
    id: 46,
    question: "Which Indian state has the lowest population (Census 2011)?",
    password: "Sikkim",
    category: "Statistics",
    options: ["Sikkim", "Mizoram", "Arunachal Pradesh", "Goa"]
  },
  {
    id: 47,
    question: "Which is the least densely populated state in India?",
    password: "Arunachal Pradesh",
    category: "Statistics",
    options: ["Mizoram", "Arunachal Pradesh", "Sikkim", "Nagaland"]
  },
  {
    id: 48,
    question: "Which city has the highest population density among Indian metros?",
    password: "Mumbai",
    category: "Statistics",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"]
  },
  {
    id: 49,
    question: "Which department is primarily responsible for statistical data collection in Kerala?",
    password: "DES",
    category: "Statistics",
    options: ["Planning Board", "DES (Department of Economics & Statistics)", "Revenue Department", "Local Self Government"]
  },
  {
    id: 50,
    question: "Which is the largest animal in the world?",
    password: "Blue Whale",
    category: "Science",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"]
  }
]; 