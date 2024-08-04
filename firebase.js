// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlbAtYM_rM8RUJcNtuK7OTKmHeQjOx1x0",
  authDomain: "pantry-app-de6dc.firebaseapp.com",
  projectId: "pantry-app-de6dc",
  storageBucket: "pantry-app-de6dc.appspot.com",
  messagingSenderId: "103555998304",
  appId: "1:103555998304:web:6f25cafe99f96febdc9905",
  measurementId: "G-GDFNVJEEZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, firestore };
