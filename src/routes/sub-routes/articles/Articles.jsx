import { useEffect, useRef, useState } from "react"
import "./Articles.scss"
import instance from "../../../services/api"
import { useFetch } from "../../../helpers/hooks/useFetch";
import { IoIosCloseCircle } from "react-icons/io";


const Articles = () => {
  const [closeModal, setCloseModal] = useState(false)
  const [articlesPost, setArticlesPost] = useState([])
  const [getPostId, setGetPostId] = useState('')
  // Button Loading
  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    if (getPostId) {
      setCloseModal(true)
    }
  }, [getPostId])

  useEffect(() => {
    instance("/api/posts")
      .then(response => {
        console.log(response.data.data);
        setArticlesPost(response.data.data)
      })
      .catch(error => console.log(error))
  }, [])


  const delBtn = useRef()
  const delBtnStyle = delBtn.current
  const handleDelete = (id) => {
    setBtnLoading(true)
    delBtnStyle.style = "opacity: 0.8; cursor: not-allowed;"
    console.log(id);
    instance.delete(`/api/posts/${id}`)
    setTimeout(() => {
      window.location.reload(true)
    }, 2000)
  }
  const user_id = localStorage.getItem("user_id")




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
                  <img src={articles.image} />
                </div>
                <p>{articles.description.slice(0, 100)}</p>
                <div className="controls-btn">
                  <button  className="update-btn">Update</button>
                  <button onClick={() => setGetPostId(articles._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )
          }
        </div>-
      </div>


      {/*Delete Modal */}
      <div style={closeModal ? { display: "block" } : { display: "none" }} className="modal__bg-wrapper">
        <div style={closeModal ? { display: "block", display: "grid" } : { display: "none" }} className="delete-modal">
          <p>Are you sure to Delete Post ?</p>
          <button ref={delBtn} onClick={() => handleDelete(getPostId)} className="article-delete-btn">Delete</button>
          <button onClick={() => setCloseModal(false)} className="close-modal"><IoIosCloseCircle /></button>
        </div>
        {/* Loading */}
        <div style={btnLoading ? {display: "block", cursor: "not-allowed"} : {display: "none"}} class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </>
  )
}

export default Articles