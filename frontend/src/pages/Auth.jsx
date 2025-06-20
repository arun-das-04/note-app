import React from 'react'
import { Outlet, Link } from 'react-router-dom'
const Auth = () => {
  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default Auth