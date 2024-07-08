import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { getStorage } from "firebase/storage";

const firebaseConfig = Constants.expoConfig.web.config.firebase;

if (!firebaseConfig) {
  throw new Error("Firebase configuration is missing from Expo constants.");
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage, app };
