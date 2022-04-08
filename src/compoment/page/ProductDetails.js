import React, { useEffect, useState } from "react";
import "../scss/producDetail.scss";
import { message, Rate } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { inCategory, inDataDetail } from "../redux/ReduxSlice";
import { Addcart, GetDataDetail, NumberCatePlus, NumberinCate } from "../redux/Reduce";
import useRandomId from "../useCusTomHook/useRandomId";

const ProductDetails = () => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [vlstart, setvlstar] = useState(5);
  const datadetail = useSelector(inDataDetail);
  const dispatch = useDispatch();
  const datacart = useSelector(inCategory);
  const randumm = useRandomId();
  const handlestart = (value) => {
    setvlstar(value);
  };
  useEffect(()=>{
    dispatch(GetDataDetail());
  },[])
  const getcart = (vl) => {
    const trungcate = datacart.filter((item) => item.id == vl.id);
    if (trungcate.length == 1) {
      // message.error(" Sp đã tồn tại");
      dispatch(NumberinCate(1));
      dispatch(NumberCatePlus(vl));
      message.success(vl.name + " value +1");
    } else {
      dispatch(
        Addcart({ ...vl, quantity: 1, itemmoney: vl.price, hisid: randumm })
      );
      message.success("Add to card");
    }
  };
  // console.log('car',datadetail);
  return (
    <div className="detail">
      <div className="boximg">
        <div
          style={{ backgroundImage: `url("${datadetail.img}")` }}
          className="imgbig"
        ></div>
        <div className="imgmin">
          <div
            style={{ backgroundImage: `url("${datadetail.img}")` }}
            className="imgmini"
          ></div>
          <div
            style={{ backgroundImage: `url("${datadetail.img}")` }}
            className="imgmini"
          ></div>
          <div
            style={{ backgroundImage: `url("${datadetail.img}")` }}
            className="imgmini"
          ></div>
        </div>
      </div>
      <div className="boxtext">
        <h1>{datadetail.name}</h1>
        <h2>{datadetail.category}</h2>
        <p>
          The Firebase Realtime Database is a cloud-hosted database. Data is
          stored as JSON and synchronized in realtime to every connected client.
          When you build cross-platform apps with our Apple platforms, Android,
          and JavaScript SDKs.
        </p>
        <h1>Start</h1>
        <span>
          <Rate tooltips={desc} onChange={handlestart} value={vlstart} />
          {vlstart ? (
            <span className="ant-rate-text">{desc[vlstart - 1]}</span>
          ) : (
            ""
          )}
        </span>
        <h2>Price : {datadetail.price} $</h2>
        <button>
          {" "}
          <HeartOutlined style={{ color: "red" }} /> Favourite
        </button>
        &nbsp;
        <button
          onClick={() => getcart(datadetail)}
          style={{ backgroundColor: "rgb(237, 121, 121)" }}
        >
          {" "}
          <ShoppingCartOutlined style={{ color: "green" }} /> Add cart
        </button>
        <h1>Important note</h1>
        <p>Purchased goods please do not return in any form</p>
        <p style={{ color: "green" }}>Thank you for visiting.</p>
      </div>
    </div>
  );
};

export default ProductDetails;
