import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/index'
import LoginPage from './pages/LoginPage/index'
import JobDetailsPage from './pages/JobDetailsPage/index'
import HomePage from './pages/HomePage/index'
import UpdateJobPage from './pages/UpdateJob/index'
import JobPostPage from './pages/JobPostPage/index'
import './App.css'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/job-details/:id' element={<JobDetailsPage/>}></Route>
          <Route path='/job-post' element={<JobPostPage />}></Route>
          <Route path='/job-update/:id' element={<UpdateJobPage />}></Route>
          <Route path='/' element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
