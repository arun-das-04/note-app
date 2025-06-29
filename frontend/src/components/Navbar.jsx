import '../stylesheets/Navbar.css';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';
import UserImage from '../assets/user.png';
import toast from 'react-hot-toast';


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navprofile = useRef(null);

  const islogged = useSelector(state => state.user.islogged);
  const [isProfileBtn, setIsProfileBtn] = useState(false);


  // On Outside click dropdown will be hidden
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(navprofile.current && !navprofile.current.contains(event.target)) {
        setIsProfileBtn(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }

  },[]);


  // On logout Button Click
  const handleLogoutBtn = () => {
      setIsProfileBtn(false);

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
        </div>
        <div className='nav-profile-section' ref={navprofile}>
          <img src={UserImage} id='nav-profile-image' onClick={() => {setIsProfileBtn(!isProfileBtn)}}></img>
          {isProfileBtn && (
            <div className='profile-buttons'>
              <button id='profile-logout-btn' onClick={handleLogoutBtn}>Logout</button>
              <button id='profile-setting-btn' onClick ={() => {navigate('/setting'); setIsProfileBtn(false)}}>Setting</button>
            </div>
          )}
          
          {/* <button id='nav-login-btn' onClick={handelNavBtn}>{islogged? 'logout' : 'login'}</button> */}
        </div>
        
      </div>


      <div className=''>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar