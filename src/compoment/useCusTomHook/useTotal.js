import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inCategory } from "../redux/ReduxSlice";

function useTotal(){
  const datacart = useSelector(inCategory);
  const [total,settotal] = useState()

  let itemMoney = datacart.reduce((toltol,lis) => {
    return (toltol += lis.itemmoney);
  }, 0);

  useEffect(()=>{
    settotal(itemMoney);
  },[datacart])

  return total
}

export default useTotal;