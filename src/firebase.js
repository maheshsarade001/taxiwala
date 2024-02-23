// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ68JHEx_6F4trScbj-oTu-7eeMdJNm14",
  authDomain: "taxiwala-1a58c.firebaseapp.com",
  projectId: "taxiwala-1a58c",
  storageBucket: "taxiwala-1a58c.appspot.com",
  messagingSenderId: "813141121860",
  appId: "1:813141121860:web:3da0e175bb65b31c47d511",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
