import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace these with your Firebase config values
  apiKey: "AIzaSyDxVaSlfAm4OZOSrmexQkwLSsqR5Oyzqw0",
  authDomain: "quiz-project-14806.firebaseapp.com",
  projectId: "quiz-project-14806",
  storageBucket: "quiz-project-14806.appspot.com",
  messagingSenderId: "1015649392574",
  appId: "1:1015649392574:web:8b9b9b9b9b9b9b9b9b9b9b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 