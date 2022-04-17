// Import the functions you need from the SDKs you need

import firebase from "firebase/compat";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD4HAtDq5yN9ak9r3G4cGKHKFp_pznRSR8",
  authDomain: "instagram-newone.firebaseapp.com",
  projectId: "instagram-newone",
  storageBucket: "instagram-newone.appspot.com",
  messagingSenderId: "697168513135",
  appId: "1:697168513135:web:2cc453dfc7d16c73c8659a",
  measurementId: "G-YW02RQ1YMQ"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db=firebase.firestore()
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export  {firebase,db};




