import "./Admin.scss"
import React, { useEffect, useState } from 'react';
import instanse from "../../services/api/index"
import { useValue } from "../../context/AppProvider";

const Admin = () => {

  const [state] = useValue()
  const user_id = localStorage.getItem("user_id")


  const [userAllPosts, setUserAllPosts] = useState([])
const [userData, setUserData] = useState([])

  // USER ALL POSTS
  useEffect(() => {
    instanse(`/api/posts/`)
      .then(response => {
        console.log(response.data.data)
        setUserAllPosts(response.data.data)
      })
  }, [])

  // SET USER-DATA
    instanse(`/api/users/${state.auth.user_id}`)
    .then(response => {
      setUserData(response.data.data)
      console.log(response.data.data)
    })

  return (
    <div className='main__user-wrapper'>
      <div className="about__user-container">
        <h2>{userData.fullname}</h2>
        <h4>{userData.firstname}</h4>
        

      </div>
      <div className="main__posts-container">
        {
          userAllPosts.filter(myData => myData.author === user_id).map(userPost =>
            <div key={userPost._id} className="main__user-card">
              <h2>{userPost.title.slice(0, 28)}...</h2>
              <img src={userPost.image} alt="" />
              <p>{userPost.description.slice(0, 300)}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Admin