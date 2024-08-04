
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from 'firebase/database'; 
import { getStorage } from 'firebase/storage';

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
 const analytics = getAnalytics(app); 
 const auth = getAuth( app);
 const dataBase = getDatabase(app);
 const storage = getStorage(app);

export{analytics, auth, dataBase, storage};