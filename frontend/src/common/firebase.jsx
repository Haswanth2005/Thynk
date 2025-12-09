import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBZ7xYl9N9or1hwHYrjyMyYCVDS9euGsaM",
  authDomain: "thynk-875.firebaseapp.com",
  projectId: "thynk-875",
  storageBucket: "thynk-875.firebasestorage.app",
  messagingSenderId: "605085027412",
  appId: "1:605085027412:web:7a85dd60889b3d7353b1c1"
};


const app = initializeApp(firebaseConfig);

//Google Auth
const provider = new GoogleAuthProvider()
const auth = getAuth()

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
    user = result.user
    })
    .catch((err) => {
      console.log(err)
    })

  return user
}