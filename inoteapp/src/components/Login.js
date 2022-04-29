import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
const [credentials, setCredentials] = useState({email:"", password:""})
let history = useHistory()


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password}) 
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
              localStorage.setItem('token', json.jwtData);
              props.showAlert('loggedIn successfully','success')
              history.push('/')

          }else{
            props.showAlert('Invalid details','danger')
          }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
 
   }
  return (
    <div>
    <h2 className='mt-5'>Login to continue to notesApp</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
