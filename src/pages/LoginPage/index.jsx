import React from 'react'
import './index.css'
import LoginImage from '../../assets/register1.png'
import Login from '../../components/Login/index'

function LoginPage() {
  return (
    <div className='login-main'>
      <div className='log-g1'>
        <Login />
      </div>
      <div className='log-g2'>
        <img src={LoginImage} alt='login-img' width='100%' height='100%'></img>
        <h2 className='img-head'>Your personal job finder</h2>
      </div>
    </div>
  )
}

export default LoginPage
