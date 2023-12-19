import { InputLabel, TextField, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

function AddBlog() {
  const navigate = useNavigate()
  const [Inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  })
  const handleChage = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }
    ));
  }
  const sendRequst = async () => {
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: Inputs.title,
      description: Inputs.description,
      image: Inputs.imageURL,
      user: localStorage.getItem("userId")
    }).catch((err) => console.log(err))
    const data = await res.data;
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   // console.log(Inputs);
    sendRequst().then((data) => console.log(data)).then(() => navigate("/blogs"))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3}
          borderColor='#3bb1e3'
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={10}
          display='flex'
          flexDirection={'column'}
          width={"80%"}>
          <Typography
            fontWeight={'bold'}
            padding={3} color="grey"
            variant='h2'
            textAlign={'center'}>
            Post Your Blogs
          </Typography>
          <InputLabel
            sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            name='title'
            onChange={handleChage}
            value={Inputs.title}
            margin='normal'
            variant='outlined' />
          <InputLabel
            sx={labelStyles} >
            Description
          </InputLabel>
          <TextField
            name='description'
            onChange={handleChage}
            value={Inputs.description}
            margin='normal'
            variant='outlined' />
          <InputLabel
            sx={labelStyles} >
            ImageURL
          </InputLabel>
          <TextField
            name='imageURL'
            onChange={handleChage}
            value={Inputs.imageURL}
            margin='normal'
            variant='outlined' />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant='contained'
            color='warning'
            type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
