
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAI-KiNaMioDfhAm-pwI5B342lGJl1YhCo",
  authDomain: "cgpa-c09c4.firebaseapp.com",
  projectId: "cgpa-c09c4",
  storageBucket: "cgpa-c09c4.appspot.com",
  messagingSenderId: "343563858468",
  appId: "1:343563858468:web:92b34b9e7863d6fe14deb1",
  measurementId: "G-K2T8PVLVKE"
};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);