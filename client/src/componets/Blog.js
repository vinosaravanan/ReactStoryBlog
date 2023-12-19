import React from 'react'
import { Avatar, Card, CardContent, CardMedia, CardHeader, Typography, Box, IconButton, useMediaQuery, useTheme, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Blog({ title, description, imageURL, userName, isUser, id }) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"))
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    }
    const handleStories = () => {
        navigate(`/viewBlogs/${id}`)
    }
    const deleteRequst = async () => {
        const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((err) => console.log(err))
        const data = await res.data;
        return data;
    }
    const handleDelete = () => {
        deleteRequst().then(() => navigate("/")).then(() => navigate("/blogs"))
    }
    return (
        <Box
        >
            {isMatch ? (
                <Card sx={{
                    borderColor: "blue",
                    marginRight: "50px",
                    maxWidth: "300",
                    maxHeight: '100%',
                    margin: "auto",
                    mt: 2,
                    marginTop: 5,
                    padding: 2,
                    boxShadow: "5px  5px  10px  #ccc",
                    ":hover": {
                        boxShadow: "10px  10px  20px  #ccc",
                    },
                }}
                >
                    {isUser && (
                        <Box display='flex'>
                            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto', marginBottom: '2px' }} >
                                <EditIcon color='warning' />
                            </IconButton>
                            <IconButton onClick={handleDelete} >
                                < DeleteForeverIcon color='error' />
                            </IconButton>
                        </Box>
                    )}
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "red" }} >
                                {userName}
                            </Avatar>
                        }
                        title={title}
                    />
                    <CardMedia
                        component="img"
                        height="180"   //194
                        image={imageURL}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <hr />
                        <br />
                        <Typography variant="body2" color="text.secondary" height='50'>
                            <b>{userName}</b>{": "} {description}
                        </Typography>
                    </CardContent>
                    <Button sx={{
                        color: "black",
                        margin: 1,
                        backgroundColor: "white"
                    }} onClick={handleStories} variant="contained">SEE STORIES</Button>
                </Card>
            ) : (
                <>
                    <Box sx={{ marginTop: 10 }} >
                        <Card sx={{
                            borderColor: "blue",
                            marginRight: "50px",
                            marginTop: 20,
                            maxWidth: "50%",
                            maxHeight: '100%',
                            margin: "auto",
                            mt: 2,
                            padding: 2,
                            boxShadow: "5px  5px  10px  #ccc",
                            ":hover": {
                                boxShadow: "10px  10px  20px  #ccc",
                            },
                        }}
                        >
                            {isUser && (
                                <Box display='flex'>
                                    <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto', marginBottom: '2px' }} >
                                        <EditIcon color='warning' />
                                    </IconButton>
                                    <IconButton onClick={handleDelete} >
                                        < DeleteForeverIcon color='error' />
                                    </IconButton>
                                </Box>
                            )}
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: "red" }} >
                                        {userName}
                                    </Avatar>
                                }
                                title={title}
                            />
                            <CardMedia
                                component="img"
                                height="380"   //194
                                image={imageURL}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <hr />
                                <br />
                                <Typography variant="body2" color="text.secondary" height='50'>
                                    <b>{userName}</b>{": "} {description}
                                </Typography>
                            </CardContent>
                            <Button sx={{
                                color: "black",
                                margin: 1,
                                backgroundColor: "white"
                            }}
                                onClick={handleStories} variant="contained">SEE STORIES</Button>
                        </Card>
                    </Box>
                </>
            )}

        </Box>
    )
}

export default Blog
