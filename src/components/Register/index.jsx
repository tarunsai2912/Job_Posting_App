import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { Userregister } from '../../apis/auth'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    if(!formData.name || !formData.email || !formData.mobile || !formData.password){
      alert("Fields can't be empty")
    }
    else{
      const response = Userregister({...formData})
      alert("User Registered")
      navigate('/login')
    }
  }

  return (
    <div className='main-container'>
      <h1 className='head-1'>Create an account</h1>
      <p className='para1'>Your personal job finder is here</p>
      <div className='input-div'>
        <input type='text' name='name' className='name-input' placeholder='Name' onChange={handleChange}></input>
        <input type='email' name='email' className='email-input' placeholder='Email' onChange={handleChange}></input>
        <input type='mobile' name='mobile' className='mobile-input' placeholder='Mobile' onChange={handleChange}></input>
        <input type='password' name='password' className='password-input' placeholder='Password' onChange={handleChange}></input>
        <input type='checkbox' name='checkbox' className='checkbox-input'></input><span className='check-span'>By creating an account, I agree to our terms of use and privacy policy</span>
        <button onClick={handleSubmit} className='submit-btn'>Create Account</button>
      </div>
      <p className='sign-foot'>Already have an account?<span className='log-underline' onClick={() => navigate('/login')}>Sign In</span></p>
    </div>
  )
}

export default Register
