import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import React from 'react'
import axios from "axios";
import { Box } from "@mui/system";
import { InputLabel, Typography, } from "@mui/material";

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }
const labelStyles2 = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold',textAlign:'center' }

function ViewBlog() {
    const navigate = useNavigate();
    const [blog, setblog] = useState();
    const id = useParams().id;
    console.log(id);
    const [Inputs, setInputs] = useState()

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

    return (
        <div>
            {Inputs && 
                <Box 
                    borderRadius={10}
                    padding={3}
                    margin={'auto'}
                    marginTop={7}
                    display='flex'
                    flexDirection={'column'}
                    width={"50%"}
                    height="100%"
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                >

                    <InputLabel sx={labelStyles2} >Title</InputLabel>
                    <Typography  textAlign='center'>{Inputs.title} </Typography>
                    <InputLabel sx={labelStyles} >Description</InputLabel>
                    <Typography  >{Inputs.description}</Typography>
                </Box>
            }
        </div>
    )
}

export default ViewBlog
