// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH0x_9Y218Jgg-Fr009sOj5gFFO8hDOII",
    authDomain: "tmdb-891c7.firebaseapp.com",
    projectId: "tmdb-891c7",
    storageBucket: "tmdb-891c7.appspot.com",
    messagingSenderId: "810662414612",
    appId: "1:810662414612:web:9b9b0cbbd4fc48069e9a01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();