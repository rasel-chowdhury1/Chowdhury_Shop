// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFif8QKMIrJg9_qjFgPFrrfGtVTwr9Auo",
  authDomain: "chowdhury-shop-react.firebaseapp.com",
  projectId: "chowdhury-shop-react",
  storageBucket: "chowdhury-shop-react.appspot.com",
  messagingSenderId: "743938154706",
  appId: "1:743938154706:web:4167937feabbedaed78d0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;