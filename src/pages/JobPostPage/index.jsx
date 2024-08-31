import React from 'react'
import JobPost from '../../components/JobPost/index'
import post_pic from '../../assets/post-img.png'
import './index.css'

function JobPostPage() {
  return (
    <div className='jobpost-container'>
      <div className='g1-post'>
        <JobPost />
      </div>
      <div className='g2-post'>
        <img src={post_pic} alt='pic' width='100%' height='730vh' className='img-post'></img>
        <h2 className='img-text-post'>Recruiter add job details here</h2>
      </div>
    </div>
  )
}

export default JobPostPage
