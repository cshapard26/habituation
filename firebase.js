import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAo23HGqSeVFuDuE6Kql7iQlFxFJM3lqhQ",
    authDomain: "habituation-97155.firebaseapp.com",
    projectId: "habituation-97155",
    storageBucket: "habituation-97155.appspot.com",
    messagingSenderId: "540973350994",
    appId: "1:540973350994:web:89a6c4eafc4d79b0b99f8b"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();