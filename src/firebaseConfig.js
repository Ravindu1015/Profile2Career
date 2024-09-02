
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
        apiKey: "AIzaSyA5wovpQGmQf7y4eItnD8h_xtk28jRZUSc",
        authDomain: "profile2career-cf13a.firebaseapp.com",
        projectId: "profile2career-cf13a",
        storageBucket: "profile2career-cf13a.appspot.com",
        messagingSenderId: "123739242200",
        appId: "1:123739242200:web:487a7cbecb8c378f3721ad",
        measurementId: "G-7X3GKTLWS5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { auth, provider, db };
export { addDoc };
export { collection };
export { query };
export { where };
export { getDocs };
