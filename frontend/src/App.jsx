import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Setting from './pages/Setting';
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import CreateNote from './components/CreateNote.jsx';
import { Toaster } from 'react-hot-toast';

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

  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
    </Provider>
  )
}

export default App


