import {getFirestore} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_bgAgAXAAl3yAqcFvOq3yYCdpNzt3e9Y",
  authDomain: "sitreg-c878d.firebaseapp.com",
  projectId: "sitreg-c878d",
  storageBucket: "sitreg-c878d.appspot.com",
  messagingSenderId: "699341713239",
  appId: "1:699341713239:web:d1c73e88ca0558b8ac9812",
  measurementId: "G-YMNEZBD0ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
