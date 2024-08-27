// Import the functions you need from the SDKs you need
import "firebase/app";
import  "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-wJAoMB9iPhTOcX03-KlpUNiLoFJFwKY",
  authDomain: "profile2career-3a200.firebaseapp.com",
  projectId: "profile2career-3a200",
  storageBucket: "profile2career-3a200.appspot.com",
  messagingSenderId: "209617106633",
  appId: "1:209617106633:web:d9927908653dec12bf3f18"
};

// Import the firebase module
import firebase from "firebase/app";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();