// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDYfr9d3UGsAZ34wN5Pg1uVLp1irkOUsG8",
    authDomain: "social-media-a91d2.firebaseapp.com",
    projectId: "social-media-a91d2",
    storageBucket: "social-media-a91d2.appspot.com",
    messagingSenderId: "777399861284",
    appId: "1:777399861284:web:20d365f5c1f894a00458b1",
    measurementId: "G-6H8JFPFZZY"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export {db, auth , storage};
