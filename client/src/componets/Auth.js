import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useDispatch,} from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

function Auth() {
  const naviagate = useNavigate();
  const dispath = useDispatch();
  const [Inputs, setInputs]= useState({
    name:"",
    email:"",
    password: ""
  })
  const [isSignup, setisSignup] = useState(false)

  const handleChage = (e)=> {
    setInputs((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
    }
    ));
 }

const sendRequst =  async( type="login" )=> {
  const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
    name: Inputs.name,
    email: Inputs.email,
    password: Inputs.password
  }).catch(err => console.log(err))
  
  const data = await res.data;
 // console.log(data);
  return data
} 

const handleSubmit = (e)=>{
  e.preventDefault();
 // console.log(Inputs);
  if(isSignup){
    sendRequst("signup").then((data)=> localStorage.setItem("userId", data.user._id))
    .then(()=> dispath(authActions.login())).then(()=> naviagate("/"))
    //.then((data)=> console.log(data))
  }else{
    sendRequst().then((data)=> localStorage.setItem("userId", data.user._id))
    .then(()=> dispath(authActions.login())).then(()=> naviagate("/blogs"))
    //.then((data)=> console.log(data))
  }
}

  return (
      <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display='flex'
          flexDirection={'column'}
          alignItems='center'
          justifyContent={'center'}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={12}
          borderRadius={5}
        >
          <Typography variant='h3' padding={3} textAlign='center'>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
           <TextField name='name' 
             onChange={handleChage} 
             value={Inputs.name} 
             placeholder='Name' 
             margin='normal' />)}
          <TextField 
             name='email'
             onChange={handleChage}
             value={Inputs.email} 
             type={'email'} 
             placeholder='Email' 
             margin='normal' />
             
          <TextField 
             name='password'
             onChange={handleChage} 
             value={Inputs.password} 
             type={'password'} 
             placeholder='Password' 
             margin='normal' />

          <Button 
           type='submit'
           variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color="warning" >
            Submit
          </Button>

          <Button
            onClick={() => setisSignup(!isSignup)}
            sx={{
              borderRadius: 3,
              marginTop: 3
            }}>
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
      </div> 

  )
}

export default Auth;
