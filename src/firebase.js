import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// AAHAR API
const firebaseConfig = {
  apiKey: "",
  authDomain: "aahar-109e8.firebaseapp.com",
  projectId: "aahar-109e8",
  storageBucket: "aahar-109e8.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export default app;
export { db, auth, storage };
