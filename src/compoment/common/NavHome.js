import React from "react";
import "../scss/navhome.scss";
import { AlignLeftOutlined } from "@ant-design/icons";
import Menumobile from "./Menumobile";
import Login from "../page/Login";
import Cartproduc from "../page/Cartproduc";
import { Popover, Button } from "antd";
import { Link } from "react-router-dom";
import { inUser } from "../redux/ReduxSlice";
import { useSelector } from "react-redux";

const NavHome = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const inuser = useSelector(inUser);
  const stylesingin = { border: "none", fontSize: "22px" };
  const text = <span>Options</span>;
  const content = (
    <div>
      <span
        style={
          inuser.email == null ? { display: "none" } : { display: "inline" }
        }
      >
        <Link style={{ color: "black", fontSize: "20px" }} to="/userhistory">
          Purchase history
        </Link>
      </span>
      <Login />
    </div>
  );
  return (
    <div className="navhome">
      <div>
        <h2 className="block">
          <div>
            <AlignLeftOutlined className="align" />
          </div>
        </h2>
        <Link style={{ color: "black" }} to="/">
          <h2>Home</h2>
        </Link>
        <Link style={{ color: "black" }} to="/">
          <h2>Shop</h2>
        </Link>
        <Link style={{ color: "black" }} to="/">
          <h2>Magazine</h2>
        </Link>
      </div>
      <div>
        <Menumobile />
        <Popover
          placement="bottom"
          title={text}
          content={content}
          trigger="click"
        >
          <span style={stylesingin}>
            <img
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "15px",
                backgroundRepeat:'no-repeat',
                backgroundSize : 'cover'
              }}
              src="https://mw88vn.com/wp-content/uploads/2020/03/anh-gai-xinh-han-quoc-khoe-noi-y-11.jpg"
            ></img>
            {inuser.email == null ? "Login" : inuser.email}
          </span>
        </Popover>
        <Cartproduc />
      </div>
    </div>
  );
};

export default NavHome;
