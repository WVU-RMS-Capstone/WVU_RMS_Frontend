// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebaseAuth from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFL9OjycxPVZC432u6zkvLaAzkv8sZjCs",
    authDomain: "wvurms-82dc4.firebaseapp.com",
    projectId: "wvurms-82dc4",
    storageBucket: "wvurms-82dc4.appspot.com",
    messagingSenderId: "811743424293",
    appId: "1:811743424293:web:c06e8a97cb39576d01f4cc"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = firebaseAuth.initializeAuth(FIREBASE_APP, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage)
});;
export function getCurrentUID() {
    const user = FIREBASE_AUTH.currentUser;
    return user ? user.uid : null;
}