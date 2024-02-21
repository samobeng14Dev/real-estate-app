// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: `${import.meta.env.VITE_API_KEY}`,
	authDomain: "real-estate-react-6662a.firebaseapp.com",
	projectId: "real-estate-react-6662a",
	storageBucket: "real-estate-react-6662a.appspot.com",
	messagingSenderId: "41641568374",
	appId: "1:41641568374:web:368065e8f7c3eaf385d757",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
