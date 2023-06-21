import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const adminConfig = {
    apiKey: "AIzaSyAScBeLDiqbRUeb_W0CVCpZPO29uX_l7rU",
    authDomain: "project-gesture-5cce9.firebaseapp.com",
    projectId: "project-gesture-5cce9",
    storageBucket: "project-gesture-5cce9.appspot.com",
    messagingSenderId: "1024107674177",
    appId: "1:1024107674177:web:643618b016f263054024c0"
};

// Initialize Firebase
export const app = initializeApp(adminConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const initializeSecondApp = (config, name) => {
  let secondApp = initializeApp(config, name)
  return secondApp
}

export const storage =getStorage(app);

export const db = getFirestore(app);