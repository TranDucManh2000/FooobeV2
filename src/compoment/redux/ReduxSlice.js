import { createSlice } from "@reduxjs/toolkit";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  Addcart,
  Clearcart,
  DeleteCart,
  DeleteHistory,
  FinCategory,
  GetCate,
  GetDataDetail,
  GetDataProduct,
  GetDataProfile,
  GetPage,
  GetProducUser,
  NumberCatePlus,
  NumberinCate,
  PostInUser,
} from "./Reduce";

const initialState = {
  datas: [],
  datafom: [],
  datacate: [],
  pagevlua: [],
  inUsers: [],
  category: [],
  numbercate: 1,
  datahistory : [],
  dataprofile : {},
  datadetail : {},
};
const db = getFirestore();

export const TodoSlice = createSlice({
  name: "todo",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(GetDataProduct.fulfilled, (state, action) => {
        state.datas = action.payload;
      })
      .addCase(GetProducUser.fulfilled, (state, action) => {
        state.datahistory = action.payload ?? [];
      })
      .addCase(DeleteHistory.fulfilled,(state, action) => {
        state.datahistory = state.datahistory.filter(
          (item) => item.hisid !== action.payload.hisid
        );
        const docRef = doc(db,"users",state.inUsers.uid);
        setDoc(docRef, {
          dataHistory: state.datahistory
        });
      })
      .addCase(FinCategory.fulfilled, (state, action) => {
        state.datacate = action.payload;
      })
      .addCase(GetPage.fulfilled, (state, action) => {
        state.pagevlua = action.payload;
      })
      .addCase(GetDataDetail.fulfilled,(state, action) => {
        state.datadetail = action.payload;
      })
      .addCase(PostInUser.fulfilled, (state, action) => {
        state.inUsers = action.payload;
      })
      .addCase(GetCate.fulfilled, (state, action) => {
        state.category = action.payload
      })
      .addCase(GetDataProfile.fulfilled, (state, action) => {
        state.dataprofile = action.payload;
      })
      .addCase(Addcart.fulfilled, (state, action) => {
        state.category = [...state.category, action.payload];
        localStorage.setItem('cartProduc',JSON.stringify(state.category));
      })
      .addCase(Clearcart.fulfilled, (state, action) => {
        state.category = action.payload;
        localStorage.setItem('cartProduc',JSON.stringify(state.category));
      })
      .addCase(DeleteCart.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (item) => item.id !== action.payload.id
        );
        localStorage.setItem('cartProduc',JSON.stringify(state.category));
      })
      .addCase(NumberinCate.fulfilled, (state, action) => {
        state.numbercate = action.payload;
      })
      .addCase(NumberCatePlus.fulfilled, (state, action) => {
        state.category.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity += state.numbercate;
            item.itemmoney = item.quantity * item.price;
          }
          if (item.quantity == 0) {
            state.category = state.category.filter(
              (item) => item.id !== action.payload.id
            );
          }
        });
        localStorage.setItem('cartProduc',JSON.stringify(state.category));
      });
      
  },
});

export const dataVluae = (state) => state.stone.datas;
export const dataFomVl = (state) => state.stone.datafom;
export const dataCate = (state) => state.stone.datacate;
export const dataPage = (state) => state.stone.pagevlua;
export const inUser = (state) => state.stone.inUsers;
export const inCategory = (state) => state.stone.category;
export const inTotal = (state) => state.stone.totals;
export const inDatahistory = (state) => state.stone.datahistory;
export const inDataprofile = (state) => state.stone.dataprofile;
export const inDataDetail = (state) => state.stone.datadetail;

const TodoReducr = TodoSlice.reducer;

export default TodoReducr;
