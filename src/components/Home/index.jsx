import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import home1 from '../../assets/bar.jpg'
import cross from '../../assets/cross.png'
import location from '../../assets/location.png'
import people from '../../assets/person.png'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'

import lens from '../../assets/lens.png'
import Person_img from '../../assets/person-icon.jpg'
import './index.css'

function Home() {
  const default_skills = ['Skills','Python','JavaScript','Java','C++','C','PHP','SQL','HTML','CSS','ReactJS','AngularJS','NodeJS','GIT','KOTLIN','ORACLE','MongoDB']
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])
  const [skills, setSkills] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [title, setTitle] = useState('')
  const userId = localStorage.getItem('userId')
  const token = JSON.parse(localStorage.getItem('authToken'))
  const url = 'https://job-posting-backend-vm08.onrender.com/api'

  const fetchAllJobs = async () => {
    setLoading(true)
    const reqURL = `${url}/jobs/all`
    const response = await axios.get(reqURL)
    if(response){
      setJobs(response.data.jobs)
      setFilteredJobs(response.data.jobs)
      setLoading(false)
    }
  }

  const filterJobs = (skills, title) => {
    setLoading(true)
    let filtered = jobs;

    if (skills.length > 0) {
      filtered = filtered.filter((job) =>
        skills.every((skill) => job.skills.includes(skill))
      );
    }

    if (title) {
      filtered = filtered.filter((job) =>
        job.position.toLowerCase().includes(title.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
    setLoading(false)
  };

  const handleFilter = () => {
    filterJobs(skills, title);
  };

  useEffect(() => {
    if(skills || title){
      handleFilter()
    }
    fetchAllJobs()
  },[skills])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleSkill = (e) => {
    const newArr = skills.filter((skill) => skill === e.target.value)
    if(!newArr.length) {
      setSkills([...skills, e.target.value])
    }
  }

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill)
    setSkills([...newArr])
  }

  const handleEdit = async (id1, id2) => {
    const user_id =  await id1[0]
    if(user_id === userId){
      navigate(`/job-update/${id2}`)
    }
    else{
      alert('Sorry!, You cannot Edit it')
    }
  }

  console.log(filteredJobs);
  

  return (
    <>
    {!loading ? <div className='home-container'>
      <div className='top-container-home'>
        <img src={home1} alt='img' className='img1-home' width='100%' height='100%'></img>
        <h3 className='home-head'>Jobfinder</h3>
        {token ? (<div className='cred-div'>
              <p onClick={handleLogout} className='home-logout-btn'>Logout</p> 
              <p className='hello-para-home'>Hello! Recruiter</p>
              <img src={Person_img} alt='person.img' width='40vw' height='40vh' className='user-pic-home'></img>
            </div>) : <div className='side-btn-home'>
          <button className='login-btn-home' onClick={() => navigate('/login')}>Login</button>
          <button className='reg-btn-home' onClick={() => navigate('/register')}>Register</button>
        </div>}
      </div>
      <div className='mid-container-home'>
        <div className='mid-div1-home'>
          <img src={lens} alt='lens' width='20vw' height='20vh' className='lens-home'></img>
          <input className='search-input-home' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Type any job title'></input>
        </div>
        {token && <button className='Add-btn-home' onClick={() => navigate('/job-post')}>+ Add Job</button>}
        <div className='mid-div2-home'>
          <select onChange={handleSkill} className='skills-select-home' name='skills' placeholder='skills'>
            {default_skills.map((skill, index) => {
              return(<option key={index} value={skill}>{skill}</option>)
            })}
          </select>
          <div className='skills-div-home'>
           {skills.map((skill, index) => {
              return(
                <div key={index} className='skills-set-home'>
                  <p className='each-skill-home' key={skill}>{skill}</p>
                  <div className='cross-div-home'>
                    <img className='cross-btn-home' src={cross} alt='cross' width='20vw' height='20vh' onClick={() => removeSkill(skill)}></img>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='filter-div-home'>
          <button onClick={handleFilter} className='filter-btn-home'>Apply Filter</button>
          <button className='clear-btn-home' onClick={() => {
            setSkills([])
            setTitle('')
          }}>Clear</button>
        </div>
      </div>
      <div className='list-container-home'>
      {filteredJobs.map((data) => {
        return(
          <div key={data._id} className='list-each-home'>
            <div className='list-left'>
              <div>
                <img className='logo-img-home' src={data.logo} alt='logo' width='40vw' height='30vh'></img>
              </div>
              <div className='info-left-home'>
                <p className='position-home'>{data.position}</p>
                <div className='extra-info-home'>
                  <span className='vacancy-home'><img src={people} alt='people'></img>11-50</span>
                  <span className='salary-home'>₹{data.salary}</span>
                  <span className='location-home'><img src={location} alt='location' width='15vw' height='15vh'></img>{data.location}</span>
                </div>
                <div className='info-left-bot-home'>
                  <p className='remote-home'>{data.remote}</p>
                  <p className='job-role-home'>{data.jobType}</p>
                </div>
              </div>
              <div className='info-top-right'>
                {data.skills.map((skill, index) => {
                  return(
                    <span className='each-info-skill' key={index}>{skill}</span>
                  )
                })}
              </div>
              <div className='details-div-home'>
                {token && <button className='edit-btn-home' onClick={() => handleEdit(data.userId, data._id)}>Edit job</button>}
                <button className='details-btn-home' onClick={() => navigate(`/job-details/${data._id}`)}>View Details</button>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div> : <div style={{position: 'relative', left:'40vw', top:'30vh'}}><ClipLoader color={"#36D7B7"} loading={loading} size={200} /></div>}
    </>
  )
}

export default Home
