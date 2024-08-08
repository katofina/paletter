import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfhkCCmdjv0pOSqZaFZqcUWUn9CWF9_ew",
  authDomain: "palette-ec5c5.firebaseapp.com",
  projectId: "palette-ec5c5",
  storageBucket: "palette-ec5c5.appspot.com",
  messagingSenderId: "744916091443",
  appId: "1:744916091443:web:794aa63b0a2c9e474b5946",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const createUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
};

export const signInUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};

export const storage = firebase.storage();
