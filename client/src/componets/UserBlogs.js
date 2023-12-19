import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Blog from './Blog';
function UserBlogs() {

  const [user, setUser] = useState()

  const id = localStorage.getItem("userId");
  const sendRequst = async() =>{
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err)=> console.log(err))
    const data = await res.data
    return data;
  }
  useEffect(() => {
    sendRequst().then(data=> setUser(data.user))
  }, []);
  console.log(user);
  return (
    <div>
      {" "}
       {user && user.blogs &&
         user.blogs.map((blog, index) =>( 
      <Blog 
         id={blog._id}
         key={index}
         isUser={true}
         title={blog.title} 
         description={blog.description} 
         imageURL={blog.image} 
         userName={user.name}
          />))}
    </div>
  )
}

export default UserBlogs
