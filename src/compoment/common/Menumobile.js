import React, { useState } from "react";
import "../scss/menumobile.scss";
import {
  UnorderedListOutlined,
} from '@ant-design/icons';

const Menumobile = () => {
    const [inmenu,setmenu] = useState('none')
    function setmobi() {
        if(inmenu == 'none' ){
            setmenu('block');
        }else{
            setmenu('none');
        }
    }
  return (
    <div className="menumobi">
      <button onClick={setmobi} className='iconmenu'><UnorderedListOutlined/></button>
      <div className="menu" style={{display:inmenu}}>
        <button onClick={setmobi}>X</button>
        <a href="#">Text</a>
        <a href="#">Text</a>
        <a href="#">Text</a>
      </div>
    </div>
  );
};

export default Menumobile;
