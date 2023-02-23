// Importing Firebase module here
import firebase from "firebase" 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyAxYvr_rsZU81x4PqCtvC5Iz7WbVi2Ty7A",
authDomain: "nazir-herbal-store-4c479.firebaseapp.com",
projectId: "nazir-herbal-store-4c479",
storageBucket: "nazir-herbal-store-4c479.appspot.com",
messagingSenderId: "485617053806",
appId: "1:485617053806:web:9d4482c0b672b74aa0367f",
measurementId: "G-V8E2EMLN5M"
};

// Initialize Firebase
var fireDatabase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Exporting the database
export default fireDatabase;