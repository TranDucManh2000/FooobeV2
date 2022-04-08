import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/FirebaseConfig";

const Registes = () => {
  const [email,setemail] = useState('manhza@gmail.com');
  const [password,setpass] = useState('manh99@gmailcom')
  const createus = ()=>{
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('regis',user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
      // ..
    });
  }

  const loginUs = ()=>{
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('login',user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
      });
  }
  return (
      <>
      <button onClick={createus}>tao</button>
      <input></input>
      <input></input>
      <button onClick={loginUs}>login</button>
      </>
  );
};

export default Registes;
