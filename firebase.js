import { initializeApp, getApp, getApps,  } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDmSUjiSa_IDiblpbs4Siv25YiUFnYJTr4",
  authDomain: "instagram-2-87aa8.firebaseapp.com",
  projectId: "instagram-2-87aa8",
  storageBucket: "instagram-2-87aa8.appspot.com",
  messagingSenderId: "234244093926",
  appId: "1:234244093926:web:3e1e1b2a082d1c78bb4827"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    db,
    storage
}