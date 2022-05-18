import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'
// import { getFirestore } from 'firebase/firestore';
// import { getStore } from 'firebase/storage'
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBnwfZH-u55cFAAvpAXwfljJdOG0B8cVYc",
    authDomain: "discord-app-5acff.firebaseapp.com",
    projectId: "discord-app-5acff",
    storageBucket: "discord-app-5acff.appspot.com",
    messagingSenderId: "692479617392",
    appId: "1:692479617392:web:8da501eae1fb8ad5b687b5",
    measurementId: "G-NF5P7KJHHG"
  };
const firebaseApp = initializeApp(firebaseConfig)
// const db = getFirestore(firebaseApp)
// const auth = getAuth(firebaseApp)
// const provider = new GoogleAuthProvider()
// export {auth, provider}
// export default db
export const storage = getStorage(firebaseApp)