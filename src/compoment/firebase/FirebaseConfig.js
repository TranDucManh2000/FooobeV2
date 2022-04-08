import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4__o8dxNjMUs7bPlQAHfr3S40edi_mmE",
  authDomain: "test-firebasemini.firebaseapp.com",
  databaseURL: "https://test-firebasemini-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-firebasemini",
  storageBucket: "test-firebasemini.appspot.com",
  messagingSenderId: "985640467021",
  appId: "1:985640467021:web:443a13ffdcb1adf956fa04",
  measurementId: "G-GZ5THGDN6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;