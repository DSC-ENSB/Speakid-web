import React from 'react'
import LeftSide from '../components/LeftSide'
import Signin from '../components/Signin'

const Login = () => {
  return (
    <>
      <div className="row">
        <LeftSide />
        <Signin />
      </div>
    </>
  )
}
export default Login;