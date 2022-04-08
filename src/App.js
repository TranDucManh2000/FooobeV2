import Home from './compoment/page/Home';
import Tesdatafire from './compoment/testdata/Tesdatafire';
import { Route, Routes, useLocation } from 'react-router-dom';
import UserPage from './compoment/page/UserPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetProducUser, PostInUser } from './compoment/redux/Reduce';
import NavHome from './compoment/common/NavHome';
import ProductDetails from './compoment/page/ProductDetails';
import UserProfile from './compoment/page/UserProfile';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartDetail = JSON.parse(localStorage.getItem('cartDetail'));
  const cartProduc = JSON.parse(localStorage.getItem('cartProduc'));
  const dispatch = useDispatch();
  if(user == null){
    localStorage.setItem('user',JSON.stringify(0));
  }
  if(cartDetail == null){
    localStorage.setItem('cartDetail',JSON.stringify({}));
  }
  if(cartProduc == null){
    localStorage.setItem('cartProduc',JSON.stringify([]));
  }
  useEffect(() => {
    dispatch(PostInUser(user ?? 0));
    dispatch(GetProducUser(user.uid));
  }, []);
  return (
   <>
   <NavHome/>
   <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/test" element={<Tesdatafire/>}/>
      <Route path="/userhistory" element={<UserPage/>}/>
      <Route path="/productDetails" element={<ProductDetails/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
   </Routes>
   </>
  );
}

export default App;
