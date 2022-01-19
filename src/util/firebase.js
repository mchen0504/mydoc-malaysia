import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBTT0AO8W6-hpDMlqExyCGN2tD5vYg0WW4",
  authDomain: "mydoc-malaysia-984b2.firebaseapp.com",
  projectId: "mydoc-malaysia-984b2",
  storageBucket: "mydoc-malaysia-984b2.appspot.com",
  messagingSenderId: "21932132401",
  appId: "1:21932132401:web:12e339ef169b66c9c76d10",
};

initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// export default firebase;
