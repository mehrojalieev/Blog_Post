import { useEffect, useState } from "react"
import "./Articles.scss"
import instance from "../../../services/api"
import { IoIosCloseCircle } from "react-icons/io";


const Articles = () => {
  const [closeModal, setCloseModal] = useState(false)
  const [articlesPost, setArticlesPost] = useState([])

  // Update Inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    instance("/api/posts")
      .then(response => {
        console.log(response.data.data);
        setArticlesPost(response.data.data)
      })
      .catch(error => console.log(error))
  }, [])


   const handleDelete =(id) => {
    console.log(id);
    instance.delete(`/api/posts/${id}`)
    setTimeout(() => {
      window.location.reload(true)
    }, 2000)
   }
  const user_id = localStorage.getItem("user_id")


  // UPDATE POST
   const handleUpdatePost = (id) => {
    console.log(id);
    instance.put(`/api/posts/update/${id}`, {
      title, 
      description
    })
    .then(response => {
      console.log(response.data);
    })
   }

  return (
    <>
      <div className='all__articles-wrapper'>
        <h2 className="articles-subtitle">All Articles</h2>
        <div className="all__posts-container">
          {
            articlesPost.filter(myData => myData.author === user_id).map(articles =>
              <div key={articles._id} className="articles-card">
                <h2>{articles.title.slice(0, 28)}...</h2>
                <div className="articles-image">
                  <img src={articles.image}/>
                </div>
                <p>{articles.description.slice(0, 100)}</p>
                <div className="controls-btn">
                  <button onClick={() => handleUpdatePost(articles._id)} className="update-btn">Update</button>
                  <button onClick={() => handleDelete(articles._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )
          }
        </div>-
      </div>

      {/* UPDATE MODAL */}
      <div className="update__modal-card">
        <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Description"/>
        <button>UPDATE POST</button>
      </div>

      {/* Modals */}
      {/* <div style={closeModal ?{display: "block"} : {display: "none"}} className="modal__bg-wrapper">
    <div style={closeModal ? {display: "block", display: "grid"} : {display: "none"}} className="delete-modal">
          <p>Are you sure to Delete Post ?</p>
          <button className="article-delete-btn">Delete</button>
          <button onClick={() => setCloseModal(false)} className="close-modal"><IoIosCloseCircle /></button>
    </div>
    </div> */}
    </>
  )
}

export default Articles