import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import girl from '../img/12345.jpg'

function Home() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box>
      {isMatch ? (<Box
        sx={{
          backgroundImage: `url(${girl})`,
          backgroundRepeat: 'no-repeat',
          height: 1000,//990
          width: '100%',
          backgroundPosition: 'center',
          backgroundSize: "cover",
          opacity: '0.8',
          display: 'flex'
        }}
        display='flex'
      >

      </Box> //////// ismac true


      ) : (
        <>
          <Box
            sx={{
              backgroundImage: `url(${girl})`,
              backgroundRepeat: 'no-repeat',
              height: 900,
              width: 'flex',
              backgroundPosition: 'center',
              backgroundSize: "cover",
              opacity: '0.8',
              display: 'flex',
              marginBottom: "auto"
            }}
            display='flex'
          >

            <Box sx={{ height: 380, width: '40%', marginLeft: 4, padding: 25, paddingBottom: "70px", }}>

              <Typography align='center' variant='h1' color='black'
                sx={{
                  paddingBottom: '50px',
                  paddingRight: "190px",
                  paddingTop: "60px"
                }} >
                PEOPLE
              </Typography>
              <Typography align='center' variant='h1' color='black'
                sx={{
                  paddingBottom: '30px',
                  paddingRight: "100px",
                }} >
                ARE
              </Typography>
              <Typography align='center' variant='h1' color='white' paddingLeft='170px' >
                SHARING
              </Typography>

            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Home
