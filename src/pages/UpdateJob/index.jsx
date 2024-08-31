import React from 'react'
import UpdateJob from '../../components/UpdateJob'
import post_pic from '../../assets/post-img.png'
import './index.css'

function UpdateJobPage() {
  return (
    <div className='jobupdate-container'>
      <div className='g1-update'>
        <UpdateJob />
      </div>
      <div className='g2-update'>
        <img src={post_pic} alt='pic' width='100%' height='730vh' className='img-update'></img>
        <h2 className='img-text-update'>Recruiter add job details here</h2>
      </div>
    </div>
  )
}

export default UpdateJobPage
