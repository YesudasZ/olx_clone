import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,  
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: 'AIzaSyD4DWMaCU97r6nCtdc-NJqDrHMQBiwqm44',
  authDomain: 'olx-clone-cad87.firebaseapp.com',
  projectId: 'olx-clone-cad87',
  storageBucket: 'olx-clone-cad87.appspot.com',
  messagingSenderId: '117708158420',
  appId: '1:117708158420:web:84566a1973e4efdc6b9241',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signup = async (name, email, password, phone) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phone
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export {app, auth, db,storage, login, signup, logout };
