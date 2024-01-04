import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBPClRfVafHBPSnAXOxa3TR5bMg9D9OU9E",
    authDomain: "learnxyz-test.firebaseapp.com",
    projectId: "learnxyz-test",
    storageBucket: "learnxyz-test.appspot.com",
    messagingSenderId: "333898715869",
    appId: "1:333898715869:web:e3b2c69daa0d1b968d8134",
    databaseURL: "https://learnxyz-test-default-rtdb.firebaseio.com/"
  };


const firebase =  initializeApp(firebaseConfig);
export default firebase
