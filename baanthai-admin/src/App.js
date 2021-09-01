import './App.css'
import React,{useState,useEffect} from 'react'
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from 'axios'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/footer'

import Home from './Components/Home/Home';
import OrderRequest from './Components/Order/orderRequest';
import CanceledOrder from './Components/Order/canceledOrder';
import CompletedOrder from './Components/Order/completedOrder';
import Users from './Components/Users/user';
import NotFound from './Components/NotFound/NotFound'
import DecorationRequest from './Components/Decoration/decorationRequest';
import PhotographyRequest from './Components/Photography/photographyRequest';
import Qoutation from './Components/Quotation/quotation';


function App() {



  return (
      <div className="App">
        <Header />   
        <div className="__space">    
          <Switch>
            <Route exact path="/order-request"> <OrderRequest/> </Route>
            <Route exact path="/order-complete"> <CompletedOrder/> </Route>
            <Route exact path="/order-cancel"> <CanceledOrder/> </Route>

            <Route exact path="/decoration-request"> <DecorationRequest/> </Route>
            <Route exact path="/photography-request"> <PhotographyRequest/> </Route>
            <Route exact path="/quotation"> <Qoutation/> </Route>

            <Route exact path="/users"> <Users/> </Route>
            <Route exact path="/"> <Home/> </Route>
            <Route path="/not-found"> <NotFound/> </Route>
            <Redirect to='/not-found' />
          </Switch>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <Footer /> */}
      </div>
  );
}

export default App;








// <AddCartState.Provider value={{cart:cartState, updateCart, removeItem, totalPrice, addCartState, cartDisplay, clearCart}} >
// </AddCartState.Provider> 
 {/* <Route path="/service">  <Service/> </Route> */}
 {/* <Route path="/not-found"> <NotFound/> </Route> */}

 // Render()
    // console.log(render)