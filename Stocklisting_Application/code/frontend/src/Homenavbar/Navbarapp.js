import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './Navbarapp.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const isLoggedIn = () => {
  let token = localStorage.getItem("token");
  if(token !=null) return true;
  else return false;
};

const Navbarapp = () => {
  const navigate = useNavigate();

  const [login,setLogin]=useState(false)
  const [userName, setUserName] = useState('');
  useEffect(()=>{
    setLogin(isLoggedIn());
    setUserName(localStorage.getItem('userName') || '');
  },[navigate]);

  function logOut()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate('/');
   
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <>
    {
    !login && ( 
    <Navbar className='custom' data-bs-theme="dark">
        <Container className='nav'>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/registration">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </Nav>
        </Container>
      </Navbar>
    )
    }
    { login && (
      <Navbar className='custom' data-bs-theme="dark">
      <Container className='nav'>
        <Nav className="me-auto">

          <Link className="nav-link" to="/stockApi">Search</Link>
          <Link className="nav-link" to="/wishlist">Wishlist</Link>
          <button className="customlogout" onClick={logOut}>Logout</button>
        </Nav>
      </Container>
    </Navbar>
    )
    }
    </>
  );
}

export default Navbarapp;

	
