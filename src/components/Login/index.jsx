import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { Userlogin } from '../../apis/auth'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
  }

  const setTokenWithExpiry = (token, expiryInMinutes) => {
    const now = new Date()
    const expiryTime = now.getTime() + expiryInMinutes * 60 * 1000
    const tokenData = {
      token,
      expiry: expiryTime,
    }
    localStorage.setItem('authToken', JSON.stringify(tokenData));
  }

  const handleSubmit = async () => {
    if(!formData.email || !formData.password){
      alert("Fields can't be empty")
    }
    const response = await Userlogin({...formData})
    console.log(response);
    if(response){
      setTokenWithExpiry(response.token, 60)
      localStorage.setItem('userId', response.user_Id)
      navigate('/')
    }
    else{
      alert("User can't be LoggedIn")
    }
  }

  return (
    <div className='log-container'>
      <h1 className='log-head'>Already have an account?</h1>
      <p className='log-para'>Your personal job finder is here</p>
      <div className='log-div'>
        <input type='email' name='email' className='email-input-log' placeholder='Email' onChange={handleChange}></input>
        <input type='password' name='password' className='password-input-log' placeholder='Password' onChange={handleChange}></input>
        <button className='submit-btn-log' onClick={handleSubmit}>Sign in</button>
      </div>
      <p className='sign-foot-log'>Don't have an account?<span className='reg-underline' onClick={() => navigate('/register')}>Sign Up</span></p>
    </div>
  )
}

export default Login
