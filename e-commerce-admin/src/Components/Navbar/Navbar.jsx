import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'
import {useNavigate} from "react-router-dom";
import { auth } from '../../firebase-config';

const Navbar = () => {
  const navigate  = useNavigate();
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Redirect to login page or any other page after logout
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };
  return (
    <div className='navbar'>
      <img src="https://i.pinimg.com/originals/5c/59/bd/5c59bda0055329048c171c959ffdcba9.jpg" style={{height:"70px"}} className='nav-logo' alt="" onClick={() => navigate("/")}/>
      <img src={navprofileIcon} className='nav-profile' alt="" onClick={handleLogout}/>
    </div>
  )
}

export default Navbar
