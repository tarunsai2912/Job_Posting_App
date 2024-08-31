import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './index.css'
import home1 from '../../assets/home-top1.png'
import home2 from '../../assets/Rectangle2.png'
import home3 from '../../assets/Rectangle3.png'
import home4 from '../../assets/Rectangle4.png'
import money from '../../assets/money.png'
import Person_img from '../../assets/person-icon.jpg'
import './index.css'
import axios from 'axios'

function JobDetails() {
  let {id} = useParams()
  const navigate = useNavigate()

  const url = 'https://job-posting-backend-vm08.onrender.com/api'
  const userId = localStorage.getItem('userId')
  const token = JSON.parse(localStorage.getItem('authToken'))

  const [jobDetails, setJobDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [jobCreated, setJobCreated] = useState('')

  const handleJobDetails = async () => {
    try{
      const req_URL = `${url}/jobs/get/${id}`
      const response = await axios.get(req_URL)
      if(response.data){
        setJobDetails(response.data.job)
        setJobCreated(response.data.jobCreatedAt)
        setLoading(true)
      }
    }
    catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    handleJobDetails()
  },[])

  const handleEditDetails = async (id1, id2) => {
    const user_id =  await id1[0]
    if(user_id === userId){
      navigate(`/job-update/${id2}`)
    }
    else{
      alert('Sorry!, You cannot Edit it')
    }
  }

  const handleDeleteDetails = async (id1, id2) => {
    const user_id =  await id1[0]
    if(user_id === userId){
      const reqURL = `${url}/jobs/delete/${id2}`
      const response = await axios.delete(reqURL, {
        headers: {
          'token': `${token['token']}`
        }
      })
      if(response.data){
        alert('Job got Deleted')
        navigate(`/`)
      }
    }
    else{
      alert('Sorry!, You cannot Delete it')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <>
     {jobDetails && (
      <div className='head-container-details'>
        <div className='nav-container-details'>
          <img src={home1} alt='img' className='img1-details' width='100%' height='100%'></img>
          <img src={home2} alt='img' className='img2-details'></img>
          <img src={home3} alt='img' className='img3-details'></img>
          <img src={home4} alt='img' className='img4-details' height='100%'></img>
          <p className='nav-text-details' onClick={() => navigate('/')}>Jobfinder</p>
          {token ? (<div>
            <p onClick={handleLogout} className='logout-btn-details'>Logout</p> 
            <p className='hello-details'>Hello! Recruiter</p>
            <img src={Person_img} alt='person.img' width='30px' height='30px' className='img-details'></img>
          </div>) : (<div className='user-bar-details'>
          <button className='login-btn-details' onClick={() => navigate('/login')}>Login</button>
          <button className='reg-btn-details' onClick={() => navigate('/register')}>Register</button>
        </div>)}
        </div>
        <div className='job-head-details'>
          <h3 className='job-head-details-para'><span>{jobDetails.position}</span> work from <span>{jobDetails.remote}</span> at <span>{jobDetails.name}</span></h3>
        </div>
        <div className='job-desc-details'>
          <div className='mid1-container-details'>
            <h3 className='text1-details'>{jobCreated}</h3>
            <h3 className='text2-details'>{jobDetails.jobType}</h3>
            <img className='img5-details' src={jobDetails.logo} alt='logo' width='30vw' height='30vh'></img>
            <h3 className='text3-details'>{jobDetails.name}</h3>
          </div>
          <div className='mid2-container-details'>
            <div className='head-details'>
              <div className='head-txt-details'>
                <h2 className='text4-details'>{jobDetails.position}</h2>
                <h4 className='text5-details'>{jobDetails.location}</h4>
              </div>
              <div className='edit-div-details'>
                {token && <button className='editjob-btn-details' onClick={() => handleEditDetails(jobDetails.userId, jobDetails._id)}>Edit Job</button>}
                {token && <button className='deljob-btn-details' onClick={() => handleDeleteDetails(jobDetails.userId, jobDetails._id)}>Delete Job</button>}
              </div>
            </div>
            <div className='salary-container-details'>
              <h4 className='stipend-details'><img className='img6-details' src={money} alt='money' width='15vw' height='15vh'></img>Stipend</h4>
              <h4 className='salary-details'>Rs {jobDetails.salary}/month</h4>
            </div>
          </div>
          <div className='bottom-container-details'>
            <div className='company-details'>
              <p className='company-para-details'>About company</p>
              <p className='company-txt-details'>{jobDetails.about}</p>
            </div>
            <div className='job-details'>
              <p className='job-para-details'>About the  job/internship</p>
              <p className='job-txt-details'>{jobDetails.description}</p>
            </div>
            <div className='skills-details'>
              <p className='skills-para-details'>Skill(s) required</p>
              <div className='skill-div-details'>
              {loading && jobDetails.skills.map((each, index) => {
                return(
                  <div key={index} className='skill-each-div-details'>
                    <p className='each-skill-details'>{each}</p>
                  </div>
                )
              })}
              </div>
            </div>
            <div className='add-info-details'>
              <p className='add-para-details'>Additional Information</p>
              <p className='add-txt-details'>{jobDetails.info}</p>
            </div>
          </div>
        </div>
      </div>
     )} 
    </>
  )
}

export default JobDetails
