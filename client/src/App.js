import React, { useEffect, } from 'react'
import { Route, Routes, } from 'react-router-dom'
import Auth from './componets/Auth'
import Header from './componets/Header'
import Blogs from './componets/Blogs'
import UserBlogs from './componets/UserBlogs'
import BlogDedail from './componets/BlogDedail'
import AddBlog from './componets/AddBlog'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store'
import ViewBlog from './componets/ViewBlog'
import Home from './componets/Home'
import { ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material'
function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto',
      ]
    }
  })

  const dispath = useDispatch();
  const isloggedIn = useSelector(state => state.isloggedIn);
  console.log(isloggedIn);
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispath(authActions.login());

    }
  }, [dispath])
  return (
    <div >
      <React.Fragment >
        <ThemeProvider theme={theme}>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/add' element={<AddBlog />} />
              <Route path='/myBlogs' element={<UserBlogs />} />
              <Route path='/myBlogs/:id' element={<BlogDedail />} />
              <Route path='/viewBlogs/:id' element={<ViewBlog />} />
            </Routes>
          </main>
        </ThemeProvider>
      </React.Fragment>
    </div>
  )
}

export default App

