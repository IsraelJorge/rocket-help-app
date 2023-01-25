import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApalhyO9_BSZ4P1xIT4kMRqI95JwBttfI",
  authDomain: "rocket-help-37c02.firebaseapp.com",
  projectId: "rocket-help-37c02",
  storageBucket: "rocket-help-37c02.appspot.com",
  messagingSenderId: "896818668713",
  appId: "1:896818668713:web:29cf2b09574751761bb5b8",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
