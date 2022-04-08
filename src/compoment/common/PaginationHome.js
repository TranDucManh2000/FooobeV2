import React from 'react'
import { Pagination } from 'antd';
import { dataVluae } from '../redux/ReduxSlice';
import { FinCategory, GetPage } from '../redux/Reduce';
import { useDispatch, useSelector } from 'react-redux';

const PaginationHome = () => {
  const dataproduc = useSelector(dataVluae);
  const dispatch = useDispatch();

  const limitpage = 7;
  const nexpage = (page)=>{
    const kt = page*limitpage;
    const bd = kt-limitpage; //kt - sopt
    dispatch(GetPage(bd+","+kt))
    dispatch(FinCategory(dataproduc.slice(bd,kt)));
  }
  return (
    <div style={{width: '100%',marginTop:'30px',float:'left'}}>
        <Pagination defaultCurrent={1} total={20} onChange={(page)=>nexpage(page)}/>
    </div>
  )
}

export default PaginationHome