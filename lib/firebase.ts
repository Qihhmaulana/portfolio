import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore, memoryLocalCache, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyDnDgReDHjY9DqHpCME9jaaWtcS0p6imOg",
  authDomain:        "portfolio-a09af.firebaseapp.com",
  projectId:         "portfolio-a09af",
  storageBucket:     "portfolio-a09af.firebasestorage.app",
  messagingSenderId: "17279205539",
  appId:             "1:17279205539:web:346c44e81f4242613eff16",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, { localCache: memoryLocalCache() });
} catch {
  db = getFirestore(app);
}

export { db };
export const auth = getAuth(app);
