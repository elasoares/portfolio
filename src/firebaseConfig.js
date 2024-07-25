// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from 'firebase/database'; 
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsiVQaEteXhBJ5swhYhJWRtXL_yRGxTnQ",
  authDomain: "portifolio-bc2d3.firebaseapp.com",
  databaseURL: "https://portifolio-bc2d3-default-rtdb.firebaseio.com",
  projectId: "portifolio-bc2d3",
  storageBucket: "portifolio-bc2d3.appspot.com",
  messagingSenderId: "50618352741",
  appId: "1:50618352741:web:74a1e4f60063c28373f28c",
  measurementId: "G-7PE1CT460V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); 
export const auth = getAuth( app);
export const dataBase = getDatabase(app);
export const storage = getStorage(app);