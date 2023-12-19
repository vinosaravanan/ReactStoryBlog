import React from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from 'react';
import { ThemeProvider } from '@mui/system'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';
import DrawerComp from './DrawerComp';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import Themes from './utile';

function Header() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"))
    const dispath = useDispatch()
    const isloggedIn = useSelector(state => state.isloggedIn);
    const [value, setvalue] = useState();

    return (
        <div>
            <AppBar sx={{ background: "black" }}>
                <Toolbar>
                    <Typography variant="h5">ST<CameraswitchIcon color='info' />RIE</Typography>
                    {isMatch ? (
                        <>
                            <ThemeProvider theme={Themes}>
                                <DrawerComp />
                            </ThemeProvider>
                        </>
                    ) : (
                        <>
                            {isloggedIn && <Box display='flex' marginLeft='auto' marginRight='30px'>
                                <Tabs textColor='inherit'
                                    value={value}
                                    onChange={(e, value) => setvalue(value)} >
                                    <Tab LinkComponent={Link} to='/' label='HOME' />
                                    <Tab LinkComponent={Link} to='/blogs' label='All STORIES' />
                                    <Tab LinkComponent={Link} to='/myBlogs' label='My STORIES' />
                                    <Tab LinkComponent={Link} to='/blogs/add' label='Add STORIES' />
                                </Tabs>
                            </Box>}

                            <Box display="flex" marginLeft="auto">
                                {!isloggedIn && <><Button
                                    LinkComponent={Link} to='/auth'
                                    variant="contained"
                                    sx={{
                                        color: "white",
                                        margin: 1,
                                        borderRadius: 10
                                    }} >

                                    LOGiN
                                </Button>
                                    <Button
                                        LinkComponent={Link} to='/auth'
                                        variant="contained"
                                        sx={{
                                            color: "white",
                                            margin: 1,
                                            borderRadius: 10
                                        }} >
                                        SIGNUP
                                    </Button> </>}

                                {isloggedIn && (<Button
                                    onClick={() => dispath(authActions.logout())}
                                    LinkComponent={Link} to='/auth'
                                    variant="contained"
                                    sx={{
                                        color: "white",
                                        margin: 1,
                                        borderRadius: 10
                                    }} >
                                    LOGOUT
                                </Button>)}
                            </Box>
                        </>
                    )
                    }
                </Toolbar>

            </AppBar>

        </div>
    )
}

export default Header
