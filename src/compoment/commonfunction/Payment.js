import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inCategory, inTotal, inUser } from "../redux/ReduxSlice";
import { Clearcart } from "../redux/Reduce";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const Payment = () => {
  const datacart = useSelector(inCategory);
  const dispatch = useDispatch();
  const db = getFirestore();
  const inuser = useSelector(inUser);
  const payment = async () => {
    const docRef = doc(db, "users", inuser.uid);
    const docSnapHistory = await getDoc(docRef);
    console.log("snap", docSnapHistory._document);
    const today = new Date();
    const date =
      today.getHours() +
      ":" +
      today.getMinutes() +
      "/" +
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    const newdatacart = datacart.map((data) => ({
      ...data,
      datetime: date,
    }));
    if (docSnapHistory._document == null) {
      await setDoc(docRef, {
        dataHistory: newdatacart,
      });
      console.log("add data");
      dispatch(Clearcart([]));
    } else {
      console.log("set data");
      await setDoc(docRef, {
        dataHistory: [...docSnapHistory.data().dataHistory].concat(newdatacart),
      });
      dispatch(Clearcart([]));
    }
  };
  return payment;
};

export default Payment;
