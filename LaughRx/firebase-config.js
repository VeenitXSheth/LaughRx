// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEzhXorHz_aBKAzd0DHWGji_ilBZDX4G4",
  authDomain: "laughrx-10591.firebaseapp.com",
  projectId: "laughrx-10591",
  storageBucket: "laughrx-10591.appspot.com",
  messagingSenderId: "23944663510",
  appId: "1:23944663510:web:30be62b4a85a17f16f5477",
  measurementId: "G-9WQEZED0M1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);