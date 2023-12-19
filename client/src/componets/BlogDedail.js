import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import React from 'react'
import axios from "axios";
import { Box } from "@mui/system";
import { Button, InputLabel, TextField, Typography } from "@mui/material";

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

function BlogDedail() {
  const navigate = useNavigate();
  const [blog, setblog] = useState();
  const id = useParams().id;
  console.log(id);

  const [Inputs, setInputs] = useState()
  const handleChage = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }
    ));
  }
  const feachDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
    .catch((err) => console.log(err))
    const data = await res.data;
    return data
  }
  useEffect(() => {
    feachDetails().then(data => {
      setblog(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      })
    })
  }, [id]);
  console.log(blog);

  const sendRequst = async ()=> {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:Inputs.title,
      description:Inputs.description
    }).catch(err=> console.log(err));
    const data = await res.data;
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
     console.log(Inputs);
    sendRequst().then((data)=> console.log(data)).then(()=> navigate("/myBlogs/"))
  }
  return (
    <div>
      {Inputs && <form onSubmit={handleSubmit}>
        <Box border={3}
          borderColor='#3bb1e3'
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={12}
          display='flex'
          flexDirection={'column'}
          width={"80%"}>
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>Post Your Blogs</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChage} value={Inputs.title} margin='normal' variant='outlined' />
          <InputLabel sx={labelStyles} >Description</InputLabel>
          <TextField name='description' onChange={handleChage} value={Inputs.description} margin='normal' variant='outlined' />
          <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning' type="submit">Submit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDedail
