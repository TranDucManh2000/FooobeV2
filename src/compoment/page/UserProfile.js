import React, { useEffect } from "react";
import "../scss/userprofile.scss";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Modal, Button, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { inDataprofile, inUser } from "../redux/ReduxSlice";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { GetDataProfile } from "../redux/Reduce";
import { Form, Input } from "antd";
import { async } from "@firebase/util";

const UserProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const db = getFirestore();
  const indataprofile = useSelector(inDataprofile);
  const inuser = useSelector(inUser);
  const { Option } = Select;
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem('user'));
  const [inputprofile,setinputprofile] = useState()

  useEffect(() => {
    dispatch(GetDataProfile(user ?? {}));
  }, [indataprofile]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getvl =(params)=>{
    const { name, value } = params.target;
    setinputprofile({
      ...inputprofile,
      [name]: value,
    });
  }

  const handleOk = async() => {
    setIsModalVisible(false);
    const docRef = doc(db, "profile", user.uid);
    const docSnapprofile = await getDoc(docRef);
    console.log("snap", docSnapprofile.data());
    await setDoc(docRef,inputprofile);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="profile">
      <div className="boxprofile">
        <div className="boximg"></div>
        <div className="boxavatar"></div>
        <div className="boxtext">
          <div>
            <h2 style={{ fontSize: "28px" }}>
              <b>manh@gmail.com</b>
            </h2>
            <h2> Name : {indataprofile.name}</h2>
            <span>
              {" "}
              <EnvironmentOutlined /> {indataprofile.address}{" "}
            </span>
            &nbsp;
            <span>
              {" "}
              <PhoneOutlined /> {indataprofile.phone}{" "}
            </span>
          </div>
        </div>
        <button onClick={showModal}>
          <SmallDashOutlined />
        </button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="control-hooks"
          >
            <Form.Item name="name" label="Name">
              <Input name="name" onChange={(e)=>getvl(e)} />
            </Form.Item>
            <Form.Item name="address" label="address">
              <Input name="address" onChange={(e)=>getvl(e)} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input name="phone" onChange={(e)=>getvl(e)} addonBefore={prefixSelector} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
