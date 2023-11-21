import "./Admin.scss"
import React, { useEffect, useState } from 'react';
import instanse from "../../services/api/index"
import { useValue } from "../../context/AppProvider";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineEmail, MdOutlineDriveFileRenameOutline, MdNumbers } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Admin = () => {

  const [state] = useValue()
  const user_id = localStorage.getItem("user_id")


  const [userAllPosts, setUserAllPosts] = useState([])
  const [userData, setUserData] = useState([])

  const [openLogoutModal, setOpenLogoutModal] = useState(false)

  // const [logoutFromProfile, setLogoutFromProfile] = useState()

  const logoutFromProfile = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("token")
    setTimeout(() =>{
      window.location.reload(true)
    }, 1500)
  }

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


  // useEffect(() => {
  //   instanse.put(`/api/posts/update/${id}`)
    
  // }, [])


  return (
    <>
      <div className='main__user-wrapper'>
        <div className="about__user-container">
          <div className="main__user-info">
            <div>
              <span> Email:</span>
              <p> {userData.email} <MdOutlineEmail /></p>
            </div>
            <div>
              <span> Firstname:</span>
              <p> {userData.firstname} <MdOutlineDriveFileRenameOutline /></p>
            </div>
            <div>
              <span>  Lastname:</span>
              <p>{userData.lastname} <MdOutlineDriveFileRenameOutline /></p>
            </div>
            <div>
              <span> Role:</span>
              <p> {userData.role} <RiShieldUserLine /></p>
            </div>

          </div>
          <div className="user-profile">
            <p>{userData.fullname}</p>
            <div className="main__user-logo">
              <h3>{userData.firstname?.slice(0, 1)}</h3>
            </div>
            
            <button onClick={() => setOpenLogoutModal(true)} className="main__user-logout"><TbLogout2 /> Log Out</button>
          </div>
        </div>
        <div className="main__posts-container">
          {
            userAllPosts.filter(myData => myData.author === user_id).map(userPost =>
              <div key={userPost._id} className="main__user-card">
                <h2>{userPost.title.slice(0, 28)}...</h2>
                <img src={userPost.image} />
                <p>{userPost.description.slice(0, 300)}</p>
                <p>description</p>
              </div>
            )
          }
        </div>


      </div>

      {/* LOG OUT POP-UP */}

      <div style={openLogoutModal ? { display: "block" } : { display: "none" }} className="logout__modal-wrapper">
        <div style={openLogoutModal ? { display: "flex" } : { display: "none" }} className="logout-card">
          <p>Do you want to logout ?</p>
          <button onClick={logoutFromProfile} className="logout-btn">LOG OUT</button>
          <button onClick={() => setOpenLogoutModal(false)} className="close__logout-modal"><IoMdClose /></button>
        </div>
      </div>
    </>
  )
}

export default Admin