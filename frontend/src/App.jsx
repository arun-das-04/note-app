import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/userSlice.js';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Setting from './pages/Setting';

import CreateNote from './components/CreateNote.jsx';
import NoteView from './components/NoteView.jsx';

import store from './store/store.js'


function App() {

  const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
              path: '/',
              element: <Home />
            },
            {
              path: '/profile',
              element: <Profile />
            },
            {
              path: '/setting',
              element: <Setting />
            },
            {
              path: '/auth',
              element: <Auth />,
              children: [
                  {
                    path: '/auth',
                    element: <Login />
                  },
                  {
                    path: '/auth/signup',
                    element: <Signup />
                  },
              ]
            },
        ]
    },
    {
      path: '/create',
      element: <CreateNote />
    },
    {
      path: '/viewnote',
      element: <NoteView/>
    },

  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser?.userid) {
      dispatch(setUser(localUser));
    }
  }, []);



  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="bottom-center"/>
    </>
  );
}

export default App


