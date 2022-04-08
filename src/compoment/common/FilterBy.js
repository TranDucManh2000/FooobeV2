import React, { memo, useEffect, useState } from "react";
import "../scss/filterby.scss";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import { FinCategory, GetDataProduct } from "../redux/Reduce";
import { useDispatch, useSelector } from "react-redux";
import { dataCate, dataVluae } from "../redux/ReduxSlice";

const FilterBy = () => {
  const dataproduc = useSelector(dataVluae);
  const datacate = useSelector(dataCate);
  const dispatch = useDispatch();

  const categors = [
    {
      name: "Table",
      type: "category",
    },
    {
      name: "Shopha",
      type: "category",
    },
    {
      name: "Room",
      type: "category",
    },
  ];
  const namecolor = [
    {
      name: "Red",
      type: "color",
    },
    {
      name: "Blu",
      type: "color",
    },
    {
      name: "Pink",
      type: "color",
    },
  ];
  const coletion = [
    {
      name: "summer",
      type: "collection",
    },
    {
      name: "winter",
      type: "collection",
    },
  ];

  const datafilter = [
    {
      name: "Collection",
      item: {
        common: (
          <Menu>
            {coletion.map((vl, index) => (
              <Menu.Item key={index}>
                <a onClick={() => loccate(vl.name.toLowerCase(), vl.type)}>
                  {vl.name}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        ),
      },
    },
    {
      name: "Color",
      item: {
        common: (
          <Menu>
            {namecolor.map((vl, index) => (
              <Menu.Item key={index}>
                <a onClick={() => loccate(vl.name.toLowerCase(), vl.type)}>
                  {vl.name}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        ),
      },
    },
    {
      name: "Category",
      item: {
        common: (
          <Menu>
            {categors.map((vl, index) => (
              <Menu.Item key={index}>
                <a onClick={() => loccate(vl.name.toLowerCase(), vl.type)}>
                  {vl.name}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        ),
      },
    },
  ];

  const loccate = (init, intype) => {
    const data = datacate.filter(function (vl) {
      if (intype == "category") {
        return vl.category == init;
      }
      if (intype == "color") {
        return vl.color == init;
      }
      if (intype == "collection") {
        return vl.collection == init;
      }
    });
    if (data.length == 0) {
      console.log("ko nap");
      const data2 = dataproduc.filter(function (vl) {
        if (intype == "category") {
          return vl.category == init;
        }
        if (intype == "color") {
          return vl.color == init;
        }
        if (intype == "collection") {
          return vl.collection == init;
        }
      });
      console.log("2", data2);
      dispatch(FinCategory(data2));
    } else {
      dispatch(FinCategory(data));
    }
  };

  const finprice = (init) => {
    const data = datacate.filter(function (vl) {
      return vl.price > init[0] && vl.price < init[1];
    });
    dispatch(FinCategory(data));
  };

  return (
    <div className="filterbys">
      <h3>
        <span>FILTER BY</span>
      </h3>
      {datafilter.map((vl, index) => (
        <div className="fiby" key={index}>
          <Dropdown overlay={vl.item.common} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {vl.name} <DownOutlined className="DownOutlined" />
            </a>
          </Dropdown>
        </div>
      ))}
      <p className="nameprice">Price Range</p>
      <Slider
        max={100}
        onChange={(vlue) => finprice(vlue)}
        range={{ draggableTrack: true }}
        defaultValue={[0, 100]}
      />
      <p className="limitprice">
        <span>$0</span>
        <span>$100 +</span>
      </p>
    </div>
  );
};

export default FilterBy;
