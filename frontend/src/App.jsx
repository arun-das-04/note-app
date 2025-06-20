import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Setting from './pages/Setting';
import './App.css'

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

  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
