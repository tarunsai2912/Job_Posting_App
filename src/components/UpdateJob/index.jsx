import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cross from '../../assets/cross.png'
import axios from 'axios'
import './index.css'

function UpdateJob() {

  let {id} = useParams()
  const navigate = useNavigate()

  const url = 'https://job-posting-backend-vm08.onrender.com/api'
  const userId = localStorage.getItem('userId')
  const token = JSON.parse(localStorage.getItem('authToken'))

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
  const [loading, setLoading] = useState(false)

  const handleJobDetails = async () => {
    setLoading(true)
    try{
      const req_URL = `${url}/jobs/get/${id}`
      const response = await axios.get(req_URL, {
          headers: {
              'token': `${token['token']}`
          }
      })
      if(response.data){
        setFormData({
          name: response.data.job.name, 
          logo: response.data.job.logo,
          position: response.data.job.position, 
          salary: response.data.job.salary, 
          jobType: response.data.job.jobType, 
          remote: response.data.job.remote, 
          location: response.data.job.location, 
          description: response.data.job.description, 
          about: response.data.job.about, 
          skills: response.data.job.skills, 
          info: response.data.job.info
        })
        setSkills(response.data.job.skills)
        setLoading(false)
      }
    }
    catch(err){
      console.log(err);
      setLoading(false)
    }
  }

  useEffect(() => {
    handleJobDetails()
  },[])

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
      if(!userId || !token){
        console.error('User Not Authenticated');
      }
      const response = await axios.put(`${url}/jobs/update/${id}`, formData, {
        headers: {
          'token': `${token['token']}`
        }
      })
      if(response.data){
        alert('Product got Updated Successfully')
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
      console.error('Job is Not Updated', err);
    }
  }
    
  return (
    <>
    {!loading && formData && <div className='home-container-update'>
      <p className='para1-update'>Add job description</p>
      <p className='name-update'>Company Name<input className='name-input-update' type='text' value={formData.name} name='name' onChange={handleChange} placeholder='Enter your company name here'></input></p>
      <p className='logo-update'>Add logo URL<input className='logo-input-update' type='text' value={formData.logo} onChange={handleChange} name='logo' placeholder='Enter the link'></input></p>
      <p className='position-update'>Job position<input className='position-input-update' value={formData.position} type='text' name='position' onChange={handleChange} placeholder='Enter job position'></input></p>
      <p className='salary-update'>Monthly salary <input className='salary-input-update' value={formData.salary} type='text' name='salary' onChange={handleChange} placeholder='Enter Amount in rupees'></input></p>
      <div className='jobtype-div-update'>
        <label className='jobtype-para-update' htmlFor="jobtype-update">Job Type</label>
        <select name="jobType" id="jobtype-update" defaultValue={formData.jobType} onChange={handleChange}>
          <option value="">Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div className='remote-div-update'>
        <label className='remote-para-update' htmlFor="remote-update">Remote/office</label>
        <select name="remote" id="remote-update" defaultValue={formData.remote} onChange={handleChange}>
          <option value="">Select</option>
          <option value="remote">Remote</option>
          <option value="office">Office</option>
        </select>
      </div>
      <p className='location-update'>Location<input className='location-input-update' value={formData.location} type='text' name='location' onChange={handleChange} placeholder='Enter Location'></input></p>
      <p className='description-update'>Job Description<textarea className='description-input-update' value={formData.description} type='text' name='description' onChange={handleChange} placeholder='Type the job description'></textarea></p>
      <p className='about-update'>About Company<textarea className='about-input-update' value={formData.about} type='text' name='about' onChange={handleChange} placeholder='Type about your company'></textarea></p>
      <label className='skills-update' htmlFor="skills-select-update">Skills Required</label>
      <select onChange={handleSkill} id='skills-select-update' name='skills' placeholder='skills'>
        {default_skills.map((skill, index) => {
          return(<option key={index} value={skill}>{skill}</option>)
        })}
      </select>
      <div className='skills-div-update'>
        {formData.skills.map((skill, index) => {
          return(
            <div key={index} className='skills-set-update'>
              <h3 className='each-skill-update' key={skill}>{skill}</h3>
              <div className='cross-div-update'>
                <img className='cross-btn-update' src={cross} alt='cross' width='15vw' height='15vh' onClick={() => handleSkillRemove(skill)}></img>
              </div>
            </div>
          )
        })}
      </div>
      <p className='info-update'>Information<input className='info-input-update' value={formData.info} type='text' name='info' onChange={handleChange} placeholder='Enter the additional information'></input></p>
      <div className='foot-div-update'>
        <button className='cancel-btn-update' onClick={() =>  navigate(`/job-details/${id}`)}>Cancel</button>
        <button className='add-btn-update' onClick={handleJobPost}>+ Add Job</button>
      </div>
    </div>}
    </>
  )
}

export default UpdateJob
