import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handelNavBtn = () => {
    navigate('/auth');
  }

  return (
    <>
      <div className='navbar-main'>
        <p id='nav-heading'>Notes</p>
        <div className='nav-items'>
         <Link to='/' className='nav-link'> <span className='nav-item'>Home</span> </Link>
          <Link to='/profile' className='nav-link'><span className='nav-item'>Profile</span> </Link>
          <Link to='/setting' className='nav-link'><span className='nav-item'>Settings</span> </Link>
        </div>
        <button id='nav-login-btn' onClick={handelNavBtn}>Login</button>
      </div>


      <div className=''>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar