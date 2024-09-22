import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPlkhsI5v0qUL--0pi5WsCFaVSHykizfI",
  authDomain: "react-todo-app-firestore.firebaseapp.com",
  projectId: "react-todo-app-firestore",
  storageBucket: "react-todo-app-firestore.appspot.com",
  messagingSenderId: "1046058799149",
  appId: "1:1046058799149:web:4d32e85cb5856bb15de8a4",
  measurementId: "G-V1540BTB18"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);