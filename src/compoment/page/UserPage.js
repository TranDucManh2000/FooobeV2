import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavHome from "../common/NavHome";
import { DeleteHistory, GetDataProfile, GetProducUser } from "../redux/Reduce";
import { inDatahistory, inUser } from "../redux/ReduxSlice";
import { Table,Space } from "antd";
import UserProfile from "./UserProfile";

const UserPage = () => {
  const datahistory = useSelector(inDatahistory);
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem('user'));
  const inuser = useSelector(inUser);

  useEffect(() => {
    dispatch(GetProducUser(inuser.uid));
    // dispatch(GetDataProfile(inuser));
  }, []);

  const deleteHistory = async (vl) => {
    dispatch(DeleteHistory(vl));
  };

  const columns = [
    {
      title: "Img",
      dataIndex: "img",
      key: "img",
      width: "300px",
      render: (text) => (
        <img style={{ width: "250px", height: "150px" }} src={text}></img>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price $",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Totol $",
      dataIndex: "totol",
      key: "totol",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a style={{color:'red'}} onClick={() => deleteHistory(record)}>
            Delete {record.name}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <UserProfile/>
      <h1 style={{marginLeft:'5%',marginTop:'50px',color:'red'}}>Purchase history</h1>
      <Table
        style={{ width: "90%", marginLeft: "5%",marginTop:'30px' }}
        columns={columns}
        dataSource={datahistory.map((vl, index) => ({
          key: index,
          img: vl.img,
          name: vl.name,
          category: vl.category,
          price: vl.price,
          quantity: vl.quantity,
          totol: vl.itemmoney,
          time : vl.datetime,
          hisid: vl.hisid,
        }))}
      />
    </div>
  );
};

export default UserPage;
