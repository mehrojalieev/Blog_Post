import { useEffect, useState } from "react"
import "./Articles.scss"
import instance from "../../../services/api"
import { useFetch } from "../../../helpers/hooks/useFetch";
import { IoIosCloseCircle } from "react-icons/io";


const Articles = () => {
  const [closeModal, setCloseModal] = useState(false)
  const [articlesPost, setArticlesPost] = useState([])

  // Update Inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState("")
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [getPostId, setGetPostId] = useState('')
  const { data } = useFetch("/api/categories")

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


  const handleDelete = (id) => {
    console.log(id);
    instance.delete(`/api/posts/${id}`)
    setTimeout(() => {
      window.location.reload(true)
    }, 2000)
  }
  const user_id = localStorage.getItem("user_id")


  // UPDATE POST
  const handleUpdatePost = (e) => {
    e.preventDefault()
    console.log(getPostId);
    instance.put(`/api/posts/${getPostId}`, {
      title,
      description,
      category,
      image

    })
      .then(response => {
        console.log(response);
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
                  <img src={articles.image} />
                </div>
                <p>{articles.description.slice(0, 100)}</p>
                <div className="controls-btn">
                  <button onClick={() => { setOpenUpdateModal(true); setGetPostId(articles._id) }} className="update-btn">Update</button>
                  <button onClick={() => setGetPostId(articles._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )
          }
        </div>-
      </div>

      {/* UPDATE MODAL */}
      <div style={openUpdateModal ? { display: "block" } : { display: "none" }} className="update__modal-card">
        <form onSubmit={() => handleUpdatePost(getPostId)} className="update-form">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <select>
            <option disabled value={"select"}>Select post category</option>
            {
              data?.data.map(categoryItem =>
                <option value={categoryItem._id}>
                  {categoryItem.title}
                </option>
              )
            }
          </select>
          <button type="submit">UPDATE POST</button>
        </form>
      </div>

      {/*Delete Modal */}
      <div style={closeModal ? { display: "block" } : { display: "none" }} className="modal__bg-wrapper">
        <div style={closeModal ? { display: "block", display: "grid" } : { display: "none" }} className="delete-modal">
          <p>Are you sure to Delete Post ?</p>
          <button onClick={() => handleDelete(getPostId)} className="article-delete-btn">Delete</button>
          <button onClick={() => setCloseModal(false)} className="close-modal"><IoIosCloseCircle /></button>
        </div>
      </div>
    </>
  )
}

export default Articles