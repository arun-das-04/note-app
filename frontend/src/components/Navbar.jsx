import '../stylesheets/Navbar.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice.js';

import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const islogged = useSelector(state => state.user.islogged);

  // Handle Login/Logout button
  const handelNavBtn = () => {

    if(islogged){
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            dispatch(logoutUser());
            resolve();
          }, 1000);
        }),
          {
            loading: "Logging out...",
            success: "User is logged out",
            error: "Logged Out is failed",
          }
      )
    }
    navigate('/auth')
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