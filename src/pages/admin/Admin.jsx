import "./Admin.scss"
import React, { useEffect, useState } from 'react';
import instanse from "../../services/api/index"
import { TbLogout2 } from "react-icons/tb";
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
  useEffect(() => {
    instanse(`/api/users/${state.auth.user_id}`)
      .then(response => {
        setUserData(response.data.data)
        console.log(response.data.data)
      })
  }, [])

  return (
    <div className='main__user-wrapper'>
      <div className="about__user-container">
        <div className="user-profile">
          <p>{userData.fullname}</p>
          <div className="main__user-logo">
            <h3>{userData.firstname?.slice(0, 1)}</h3>
          </div>
          <button className="main__user-logout"><TbLogout2 /> Log Out</button>
        </div>
      </div>
      <div className="main__posts-container">
        {
          userAllPosts.filter(myData => myData.author === user_id).map(userPost =>
            <div key={userPost._id} className="main__user-card">
              <h2>{userPost.title.slice(0, 28)}...</h2>
              <img src={userPost.image} />
              <p>{userPost.description.slice(0, 300)}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Admin