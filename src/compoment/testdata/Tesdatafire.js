import React, { useState } from "react";
import {
  child,
  get,
  getDatabase,
  limitToLast,
  onValue,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../firebase/FirebaseConfig";
import {orderBy, endAt } from "firebase/firestore";  

const Tesdatafire = () => {
  const [ta, setta] = useState([]);
  const getdata = async () => {
    // const db = getDatabase();
    // const starCountRef = ref(db, "/post/-MzUbCKefRcuA_ShJaTD");
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log("data", data);
    //   setta([data])
    // });
    const db = getFirestore();
    // const docRef = doc(db, "products","vmtr1cs5TyIxPmH0Ymyx");
    // const payload = {name : 'thieuca',price : 7};
    // await setDoc(docRef,payload)
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    //   const data = docSnap.data();
    //   const item = {...data, id: docSnap.id};
    //   console.log('item', item)
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // const aa = {...doc.data(), id: doc.id}
      // console.log('item', aa);
      setta(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),id : doc.id
        }))
      );
    });
  };
  console.log('ta',ta);
  const adddata = () => {
   const aa =  Math.random().toString(26).replace(/[^a-z]+/g+[1-9], '').substring(2);
   console.log('aa', aa)
  };

  return (
    <>
      <button onClick={getdata}>get</button>
      <button onClick={adddata}>add</button>
    </>
  );
};

export default Tesdatafire;
