import axios from 'axios'
const url = 'https://job-posting-backend-vm08.onrender.com/api'

export const Userlogin = async ({email, password}) => {
    try{
        const reqUrl = `${url}/auth/login`
        const response = await axios.post(reqUrl, {email, password})
        return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const Userregister = async ({name, email, mobile, password}) => {
    try{
        const reqUrl  = `${url}/auth/register`
        const response = await axios.post(reqUrl, {name, email, mobile, password})
        return response.data
    }
    catch(err){
        console.log(err);
    }
}