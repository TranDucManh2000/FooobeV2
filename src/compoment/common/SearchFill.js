import React from "react";
import "../scss/seafill.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import imgsara from "../img/Logosara.png"
import { dataCate, dataPage, dataVluae } from "../redux/ReduxSlice";
import { useDispatch, useSelector } from "react-redux";
import { FinCategory } from "../redux/Reduce";

const SearchFill = () => {
  const datacate = useSelector(dataCate);
  const dataproduc = useSelector(dataVluae);
  const datapage = useSelector(dataPage);
  const dispatch = useDispatch();

  const fininput = (e)=>{
    const init = e.target.value;
    if(init.length > 0){
      const data = dataproduc.filter(function (vl) {
        return vl.name.toLowerCase().includes(init);
      });
        dispatch(FinCategory(data))
    }else{
      // dispatch(FinCategory(dataproduc.slice(Number.parseFloat(datapage))));
      dispatch(FinCategory(dataproduc))
    }
      
  }
  const allitem=()=>{
    dispatch(FinCategory(dataproduc))
  }
  
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a
          onClick={allitem}
          target="_blank"
          rel="noopener noreferrer"
        >
          All Item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="seafill">
      <div className="boxsearch">
        <div className="searchs">
          <SearchOutlined className="searchicon" />
          <div className="inbuttom">
           <input placeholder="LIVING ROOM" onChange={(e)=>fininput(e)}></input>
           <span>Powered by Sajari.com <img src={imgsara}/></span>
          </div>
        </div>
        <div className="filters">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
             Best match <DownOutlined className="DownOutlined"/>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default SearchFill;
