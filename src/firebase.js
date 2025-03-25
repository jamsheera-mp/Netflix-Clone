

import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBqgSA_U0rJjcpdbCcoE121Lw3J10UX8pA",
  authDomain: "netflixclone-9bc67.firebaseapp.com",
  projectId: "netflixclone-9bc67",
  storageBucket: "netflixclone-9bc67.firebasestorage.app",
  messagingSenderId: "217007300317",
  appId: "1:217007300317:web:ff38ed50dc4a496a8e4534",
  measurementId: "G-VZWNTBS33H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

const signUp = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

const login = async (email,password)=>{
    try {
         await signInWithEmailAndPassword(auth,email,password)

    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

const logout = ()=>{
 signOut(auth)
}

export {auth,db,login,signUp,logout}