import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const islogged = useSelector(state => state.user.islogged);

  const handelNavBtn = () => {
    if(islogged){
      dispatch(logoutUser());
      console.log(`User is logged out`);

    }
    else{
      navigate('/auth');
    }
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
        <button id='nav-login-btn' onClick={handelNavBtn}>{islogged? 'logout' : 'login'}</button>
      </div>


      <div className=''>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar