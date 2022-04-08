import React, { useEffect, useState } from "react";
import "../scss/bodyhome.scss";
import FilterBy from "./FilterBy";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  dataCate,
  dataPage,
  dataVluae,
  inCategory,
  inUser,
} from "../redux/ReduxSlice";
import {
  Addcart,
  FinCategory,
  GetDataDetail,
  GetDataProduct,
  NumberCatePlus,
  NumberinCate,
  PostInUser,
} from "../redux/Reduce";
import { message} from "antd";
import useRandomId from "../useCusTomHook/useRandomId";
import { Link } from "react-router-dom";

const BodyHome = () => {
  const dataproduc = useSelector(dataVluae);
  const datacate = useSelector(dataCate);
  const dispatch = useDispatch();
  const datacart = useSelector(inCategory);
  const randumm = useRandomId();

  useEffect(() => {
    dispatch(GetDataProduct());
  }, []);

  useEffect(() => {
    // dispatch(FinCategory(dataproduc.slice(0, 7)));
    dispatch(FinCategory(dataproduc));
  }, [dataproduc]);

  const getcart = (vl) => {
    const trungcate = datacart.filter((item) => item.id == vl.id);
    if (trungcate.length == 1) {
      // message.error(" Sp đã tồn tại");
      dispatch(NumberinCate(1));
      dispatch(NumberCatePlus(vl));
      message.success(vl.name + " value +1");
    } else {
      dispatch(Addcart({ ...vl, quantity: 1, itemmoney: vl.price , hisid : randumm}));
      message.success("Add to card");
    }
  };
  const ondatadetail = (vl)=>{
    localStorage.setItem('cartDetail',JSON.stringify(vl));
  }
  return (
    <div className="bodyhome">
      <div className="divfiter">
        <FilterBy />
      </div>
      {datacate.map((vl, index) => (
        <div className="divfiter" key={index}>
          <Link onClick={()=>ondatadetail(vl)}
          style={{ color: "black", fontSize: "20px" }} to="/productDetails">
           <div className="imgroom" style={{backgroundImage:`url("${vl.img}")`}}></div>
          </Link>
          <div className="boxtext">
            <p className="nametext">{vl.name}</p>
            <p className="nameopa">{vl.category}</p>
            <span>
              <Rate disabled defaultValue={4} className='colosta'/> <span className="vot">(5)</span>
            </span>
          </div>
          <p className="textprice">${vl.price}</p>
          <br />

        <div 
          onClick={() => getcart(vl)}
          className="iconcart" 
          style={{backgroundImage : "url('https://cdn-icons-png.flaticon.com/512/4379/4379542.png')"}}>
        </div>

        </div>
      ))}
    </div>
  );
};

export default BodyHome;
