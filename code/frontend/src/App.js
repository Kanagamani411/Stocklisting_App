import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Registration from './LoginRegister/Registration'; // Adjust the path based on your project structure
import Login from './LoginRegister/Login';
import Home from './Homenavbar/Home';
import Navbarapp from './Homenavbar/Navbarapp';
import StockApi from './Stock/StockApi';
import Wishlist from './Wishlist/Wishlist';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbarapp />
      <Routes>
      
      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/registration' element={<Registration />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/stockApi' element={<StockApi />}></Route>
      <Route path='/wishlist' element={<Wishlist />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

