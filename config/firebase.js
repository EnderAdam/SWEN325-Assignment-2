import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Firebase configurations
const firebaseConfig = {
    apiKey: "AIzaSyC9372ilKlS0Rqz3QQkD7NtbSnGehe6THk",
    authDomain: "swen325-assignment2-8f38c.firebaseapp.com",
    projectId: "swen325-assignment2-8f38c",
    storageBucket: "swen325-assignment2-8f38c.appspot.com",
    messagingSenderId: "1071550186475",
    appId: "1:1071550186475:web:6c8b75aeb7a52d0c56cfae",
    measurementId: "G-FS707DZVZC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

//export app and auth, db to be used in other files
export default app;
export {
    auth,
    db
}