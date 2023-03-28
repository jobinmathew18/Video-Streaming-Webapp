import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB2B37N8FgHsGwTuJE9G65H6n3FnUmP_CA",
  authDomain: "video-streaming-webapp.firebaseapp.com",
  projectId: "video-streaming-webapp",
  storageBucket: "video-streaming-webapp.appspot.com",
  messagingSenderId: "285864621024",
  appId: "1:285864621024:web:bbc763d5d0c9c5fced3185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const auth = getAuth()

export default app;