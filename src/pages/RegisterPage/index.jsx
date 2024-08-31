import React from 'react'
import Register from '../../components/Register/index'
import RegisterImage from '../../assets/register1.png'
import './index.css'

function RegisterPage() {
  return (
    <div className='reg'>
      <div className='g1'>
        <Register />
      </div>
      <div className='g2'>
        <img src={RegisterImage} alt='reg-img' width='100%' height='100%'></img>
        <h2 className='head-2'>Your personal job finder</h2>
      </div>
    </div>
  )
}

export default RegisterPage
