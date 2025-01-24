
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from 'firebase/database'; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyACG4Lbv2LV34Ui3sTErBapEZtxtRsj7GU",
  authDomain: "portifolio-bc2d3.firebaseapp.com",
  databaseURL: "https://portifolio-bc2d3-default-rtdb.firebaseio.com",
  projectId: "portifolio-bc2d3",
  storageBucket: "portifolio-bc2d3.appspot.com",
  messagingSenderId: "50618352741",
  appId: "1:50618352741:web:be70b11adec653a873f28c",
  measurementId: "G-05ZED8B9LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app); 
 const auth = getAuth( app);
 const dataBase = getDatabase(app);
 const storage = getStorage(app);

export{analytics, auth, dataBase, storage};