
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpTlg2XeOpCG_ITD7fJQ1t1pYnhPGJLN8",
  authDomain: "eshop-a7638.firebaseapp.com",
  projectId: "eshop-a7638",
  storageBucket: "eshop-a7638.appspot.com",
  messagingSenderId: "633685519410",
  appId: "1:633685519410:web:37350d73e19105c8a5202b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
