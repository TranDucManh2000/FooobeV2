import React, { useCallback, useState } from "react";
import { Modal } from "antd";
import { UserOutlined, GoogleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { Form, Input, Button, message } from "antd";
import app from "../firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { PostInUser } from "../redux/Reduce";
import { Link } from "react-router-dom";
import { inUser } from "../redux/ReduxSlice";
import LoginGoogle from "../commonfunction/LoginGoogle";
import LoginOut from "../commonfunction/LoginOut";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const { TabPane } = Tabs;

const Login = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setemail] = useState();
  const [password, setpass] = useState();
  const [checkpass, setcheckpass] = useState();
  const [form] = Form.useForm();
  const [tabkey, settabkey] = useState("1");
  const inuser = useSelector(inUser);
  const loginGoogle = LoginGoogle();
  const loginOut = LoginOut();
  const db = getFirestore();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // firebase login
  const singinGoogle = () => {
    loginGoogle();
    setIsModalVisible(false); // dong tap
  };
  // email fire
  const creatEmail = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("regis", user);
        message.success("Yes Create account");
        form.resetFields();
        settabkey("1");
        // ...
      })
      .catch((error) => {
        message.error("Error Create acccount", error);
      });
  };

  const loginEmail = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("login", user);
        setIsModalVisible(false);
        message.success("Yes Login");
        form.resetFields();
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            pass: user.uid,
            img: user.photoURL,
            uid: user.uid,
          })
        );
        dispatch(PostInUser(user));
        // tao profile
        const docRef = doc(db, "profile",user.uid);
        const docSnapprofile = getDoc(docRef);
        if (docSnapprofile._document == null) {
          setDoc(docRef, {
            name : user.email,
            address : 'null',
            phone  : 'null',
          });
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error("Error Login");
        console.log(errorCode, errorMessage);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function callback(key) {
    console.log(key);
    settabkey(key);
  }

  const stylelogin = {
    border: "none",
    color: "black",
    fontSize: "18px",
  };

  return (
    <div>
      {inuser.email == null ? (
        <span onClick={showModal} style={stylelogin}>
          Login
        </span>
      ) : (
        [
          <span onClick={loginOut}>
            <Link style={stylelogin} to={"/"}>
              out Account
            </Link>
          </span>,
          <br />,
          <span onClick={loginOut}>
            <Link style={stylelogin} to={"/"}>
              Log Out
            </Link>
          </span>,
        ]
      )}
      <br />

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        animation={false}
      >
        <Tabs activeKey={tabkey} defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Login" key="1">
            <Form
              form={form}
              name="basic"
              style={{ textAlign: "left" }}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Please input min 6 text",
                  },
                ]}
              >
                <Input
                  value={password}
                  onChange={(e) => setpass(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={loginEmail}
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
                  Sing in User <UserOutlined />
                </Button>
                <Button htmlType="submit" onClick={singinGoogle}>
                  Sing in Google <GoogleOutlined />
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="2">
            <Form
              form={form}
              name="basic"
              style={{ textAlign: "left" }}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Please input min 6 text",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setpass(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Pass"
                name="confirm"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  value={checkpass}
                  onChange={(e) => setcheckpass(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={creatEmail}
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
                  Register User <UserOutlined />
                </Button>
                <Button htmlType="submit" onClick={singinGoogle}>
                  Sing in Google <GoogleOutlined />
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Login;
