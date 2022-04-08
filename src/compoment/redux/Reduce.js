import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "../firebase/FirebaseConfig";

const db = getFirestore(app);

export const GetDataProduct = createAsyncThunk("getdata", async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
});

export const GetProducUser = createAsyncThunk("GetProducUser", async (uid) => {
  const docRef = doc(db, "users",uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().dataHistory);
      return docSnap.data().dataHistory;
    } else {
      console.log("No such document!");
    }
});

export const GetDataDetail = createAsyncThunk("GetDataDetail", async () => {
  const cart = await JSON.parse(localStorage.getItem('cartDetail'));
  return cart;
});

export const GetDataProfile = createAsyncThunk("GetDataProfile", async (vl) => {
    const docRef = doc(db, "profile",vl.uid);
    const docSnapprofile = await getDoc(docRef);
    const data = docSnapprofile.data();
    return data
});

export const DeleteHistory = createAsyncThunk("DeleteHistory", async (vl) => {
  console.log(vl);
  return vl;
});

export const Addcart = createAsyncThunk("Addcart", async (vl) => {
  console.log("cart", vl);
  return vl;
});
export const Clearcart = createAsyncThunk("Clearcart", async (vl) => {
  return vl;
});
export const DeleteCart = createAsyncThunk("DeleteCart", async (vl) => {
  return vl;
});
export const NumberCatePlus = createAsyncThunk("NumberCatePlus", async (vl) => {
  return vl;
});
export const NumberinCate = createAsyncThunk("NumberinCate", async (vl) => {
  return vl;
});
export const GetCate = createAsyncThunk("GetCate", async () => {
  const cart = JSON.parse(localStorage.getItem('cartProduc'));
  return cart;
});
export const PostInUser = createAsyncThunk("PostInUser", async (user) => {
  const data = {
    email: user.email,
    pass: user.uid,
    img: user.photoURL,
    uid: user.uid,
  }
  return data;
});

export const GetPage = createAsyncThunk("getpage", async (vl) => {
  // console.log("page", vl);
  return vl;
});

export const FinCategory = createAsyncThunk("Fincate", async (vl) => {
  return vl;
});
