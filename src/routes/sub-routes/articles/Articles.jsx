import { useEffect, useState } from "react"
import "./Articles.scss"
import instance from "../../../services/api"
import { IoIosCloseCircle } from "react-icons/io";


const Articles = () => {

  const [articlesPost, setArticlesPost] = useState([])

  useEffect(() => {
    instance("/api/posts")
      .then(response => {
        console.log(response.data.data);
        setArticlesPost(response.data.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <div className='all__articles-wrapper'>
      <h2 className="articles-subtitle">All Articles</h2>
      <div className="all__posts-container">
        {
          articlesPost.map(articles =>
            <div key={articles._id} className="articles-card">
              <h2>{articles.title.slice(0, 28)}...</h2>
              <div className="articles-image">
                <img src={articles.image} alt="" />
              </div>
              <p>{articles.description.slice(0, 100)}</p>
              <div className="controls-btn">
                <button className="update-btn">Update</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          )
        }
      </div>
    </div>

    {/* Modals */}
    <div className="delete-modal">
          <p>Are you sure to Delete Post ?</p>
          <button className="article-delete-btn">Delete</button>
          <button className="close-modal"><IoIosCloseCircle /></button>
    </div>
    </>
  )
}

export default Articles