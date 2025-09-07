// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi_AyWAL90hbi068b6AI7wo25a6Rlpllw",
  authDomain: "learning-modules-ae3cc.firebaseapp.com",
  projectId: "learning-modules-ae3cc",
  storageBucket: "learning-modules-ae3cc.firebasestorage.app",
  messagingSenderId: "1037451079733",
  appId: "1:1037451079733:web:a7b85ea1c8562a5204017c",
  measurementId: "G-R98HTQ1N7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on the client side
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Export the initialized services
export { app, analytics };
export default app;
