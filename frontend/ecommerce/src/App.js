import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './components/screens/HomeScreen'
import SignUpScreen from './components/screens/SignUpScreen'
import LoginScreen from './components/screens/LoginScreen'
import ProductScreen from './components/screens/ProductScreen'
import CartScreen from './components/screens/CartScreen'
import TempScreen from './components/screens/TempScreen'
import Product from './components/Product'
import ShippingScreen from './components/screens/shippingScreen'
import ThankyouScreen from './components/screens/thankyouScreen'
import SellerScreen from './components/screens/sellerScreen'
import UpdateScreen from './components/screens/updateScreen'
import CreateScreen from './components/screens/createScreen'
import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {login} from './actions/userActions';






function App() {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    if (userInfoFromStorage && !userInfo) {
      dispatch(login(userInfoFromStorage));
    }
  }, [dispatch, userInfo]);


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/login' element={<LoginScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/signup' element={<SignUpScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/cart/:id?' element={<CartScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/products/:id' element={<ProductScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/products/' element={<SellerScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/shipping/' element={<ShippingScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/thankyou/' element={<ThankyouScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/update/:id' element={<UpdateScreen />} />
        </Routes>
        <Routes>
          <Route exact path='/create/' element={<CreateScreen />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
