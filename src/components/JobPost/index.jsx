import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import cross from '../../assets/cross.png'
import axios from 'axios'
import './index.css'

function JobPost() {
  const navigate = useNavigate()
    const url = 'https://job-posting-backend-vm08.onrender.com/api'
    const default_skills = ['skills','Python','JavaScript','Java','C++','C','PHP','SQL','HTML','CSS','ReactJS','AngularJS','NodeJS','GIT','KOTLIN','ORACLE','MongoDB']
    const [formData, setFormData] = useState({
      name: '', 
      logo: '',
      position: '', 
      salary: '', 
      jobType: '', 
      remote: '', 
      location: '', 
      description: '', 
      about: '', 
      skills: [], 
      info: ''
    })
    const [skills, setSkills] = useState([])

    const handleSkill = (e) => {
      const newArr = skills.filter((skill) => skill === e.target.value)
      if (!newArr.length) {
        setSkills([...skills, e.target.value])
        setFormData({
          ...formData,
          skills: [...skills, e.target.value],
        })
      } 
    }

    const handleSkillRemove = (skill) => {
      setSkills(skills.filter((s) => s !== skill));
      setFormData({
        ...formData,
        skills: skills.filter((s) => s !== skill),
      })
    };

    const handleChange = (e) => {
      setFormData({...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleJobPost = async () => {
      try{
        const userId = localStorage.getItem('userId')
        const token = JSON.parse(localStorage.getItem('authToken'))

        if(!userId || !token){
          console.error('User Not Authenticated');
        }
        const response = await axios.post(`${url}/jobs/create`, formData, {
          headers: {
            'token': `${token['token']}`
          }
        })
        if(response.data){
          alert('Job got Created Successfully')
          setSkills([])
          setFormData({
            name: '', 
            logo: '',
            position: '', 
            salary: '', 
            jobType: '', 
            remote: '', 
            location: '', 
            description: '', 
            about: '', 
            skills: [], 
            info: ''
          })
          navigate('/')
        }
      }
      catch(err){
        console.error('Job is Not Created', err);
      }
    }

  return (
    <div className='home-container-post'>
      <p className='para1-post'>Add job description</p>
      <p className='name-post'>Company Name<input className='name-input-post' type='text' name='name' onChange={handleChange} placeholder='Enter your company name here'></input></p>
      <p className='logo-post'>Add logo URL<input className='logo-input-post' type='text' onChange={handleChange} name='logo' placeholder='Enter the link'></input></p>
      <p className='position-post'>Job position<input className='position-input-post' type='text' name='position' onChange={handleChange} placeholder='Enter job position'></input></p>
      <p className='salary-post'>Monthly salary <input className='salary-input-post' type='text' name='salary' onChange={handleChange} placeholder='Enter Amount in rupees'></input></p>
      <div className='jobtype-div-post'>
        <label className='jobtype-para-post' htmlFor="jobtype-post">Job Type</label>
        <select name="jobType" id="jobtype-post" onChange={handleChange}>
          <option value="">Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div className='remote-div-post'>
        <label className='remote-para-post' htmlFor="remote-post">Remote/office</label>
        <select name="remote" id="remote-post" onChange={handleChange}>
          <option value="">Select</option>
          <option value="remote">Remote</option>
          <option value="office">Office</option>
        </select>
      </div>
      <p className='location-post'>Location<input className='location-input-post' type='text' name='location' onChange={handleChange} placeholder='Enter Location'></input></p>
      <p className='description-post'>Job Description<textarea className='description-input-post' type='text' name='description' onChange={handleChange} placeholder='Type the job description'></textarea></p>
      <p className='about-post'>About Company<textarea className='about-input-post' type='text' name='about' onChange={handleChange} placeholder='Type about your company'></textarea></p>
      <label className='skills-post' htmlFor="skills-select-post">Skills Required</label>
      <select onChange={handleSkill} id='skills-select-post' name='skills' placeholder='skills'>
        {default_skills.map((skill, index) => {
          return(<option key={index} value={skill}>{skill}</option>)
        })}
      </select>
      <div className='skills-div-post'>
        {skills.map((skill, index) => {
          return(
            <div key={index} className='skills-set-post'>
              <h3 className='each-skill-post' key={skill}>{skill}</h3>
              <div className='cross-div-post'>
                <img className='cross-btn-post' src={cross} alt='cross' width='15vw' height='15vh' onClick={() => handleSkillRemove(skill)}></img>
              </div>
            </div>
          )
        })}
      </div>
      <p className='info-post'>Information<input className='info-input-post' type='text' name='info' onChange={handleChange} placeholder='Enter the additional information'></input></p>
      <div className='foot-div-post'>
        <button className='cancel-btn-post' onClick={() => navigate('/')}>Cancel</button>
        <button className='add-btn-post' onClick={handleJobPost}>+ Add Job</button>
      </div>
    </div>
  )
}

export default JobPost
