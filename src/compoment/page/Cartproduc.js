import React, { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card,Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { inCategory, inTotal, inUser } from "../redux/ReduxSlice";
import { Clearcart, DeleteCart, GetCate, NumberCatePlus, NumberinCate } from "../redux/Reduce";
import useTotal from "../useCusTomHook/useTotal";
import Payment from "../commonfunction/Payment";

const { Meta } = Card;

const Cartproduc = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const datacart = useSelector(inCategory);
  const dispatch = useDispatch();
  const inuser = useSelector(inUser);
  const payment = Payment();

  useEffect(()=>{
    dispatch(GetCate());
  },[])
  
  const total = useTotal();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deletitem = (vl)=>{
    dispatch(DeleteCart(vl))
  }
  const pluscate = (vl,num)=>{
    dispatch(NumberinCate(num));
    dispatch(NumberCatePlus(vl));
  }
  const stylecart = {
    border: "none",
    fontSize: "22px",
    color: "black",
    marginLeft : "15px",
    marginRight:'20px',
  };
  const styletext = {
    border: "none",
    fontSize: "22px",
    color: "black",
  };
  const styletotol = {
    color: "green",
    fontSize: "22px",
    textAlign: "center",
    border: "none",
  };

  return (
    <div>
      <span style={stylecart} onClick={showModal}>
       <Badge count={datacart.length}>
        <img width='30px' height='30px' src="https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/bag-256.png"></img>
       </Badge>  
      </span>
      <Modal
        title="Cart Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <footer style={styletotol}>
            Total amount : ${total}
            <Button
              style={{
                backgroundColor: "red",
                color: "#fff",
                marginLeft:'20px',
                display : inuser.uid == null ? "none" : "inline",
                width: '150px',
              }}
              onClick={payment}
            >
              Payment
            </Button>
            <span 
            style={{
              display : inuser.email == null ? "inline" : "none",
              color : 'red'
            }}> Sign in to continue ! </span>
          </footer>
        }
        width="80%"
        bodyStyle={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {datacart.map((vl,index) => (
          <Card
            key={index}
            style={{ width: 350, margin: "20px"}}
            cover={
              <img
                alt="example"
                src={vl.img}
                widt = '100%'
                height='200px'
              />
            }
            actions={[
              <Button style={styletext} onClick={()=>pluscate(vl,-1)}>-</Button>,
              <Input  value={vl.quantity} style={styletotol}></Input>,
              <Button style={styletext} onClick={()=>pluscate(vl,1)}>+</Button>,
              <span style={styletotol}>${vl.itemmoney}</span>,
              <Button style={styletext}>
              <DeleteOutlined style={{ color: "red"}} onClick={()=>deletitem(vl)} />
              </Button>,
            ]}
          >
            <h2 style={{ color: "green" }}>${vl.price}</h2>
            <Meta title={vl.name} description={vl.category}/>
          </Card>
        ))}
      </Modal>
    </div>
  );
};

export default Cartproduc;
