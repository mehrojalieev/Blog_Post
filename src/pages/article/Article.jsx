import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useValue } from "../../context/AppProvider"
import instance from '../../services/api';
import { Button, Container, SingleCardSkeleton } from '../../utils/index';
import "./Article.scss";
import parse from 'html-react-parser'

const Article = () => {
  const [state] = useValue()
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [commentValue, setCommentValue] = useState("")
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState(null)
  const [allComments, setAllComments] = useState([])

  useEffect(() => {
    instance(`/api/posts/${id}`)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })


    instance(`/api/users/${state.auth.user_id}`)
      .then(res => {
        setUserData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  const handlePostComment = (e) => {
    e.preventDefault()
    instance.post(`/api/comments`, {
      description: commentValue,
      post: id
    })
      .then(res => setCommentValue(res.data))
      .catch(err => console.log(err))
  }

  console.log(allComments);
  useEffect(() => {
    instance(`/api/comments`)
      .then(response => setAllComments(response.data.data))
      .catch(err => console.log(err))
  }, [newComment])



  return (
    <Container>
      {!loading ?
        <div className='single-article'>
          <h2>{data.title}</h2>
          <img src={data.image} alt="picture" />
          <p>{parse(data.description)}</p>

        </div> :
        <SingleCardSkeleton amount={10} />
      }
      <form onSubmit={handlePostComment} className='article__comment-form'>
        <div className="article__comment-user" >
          {
            userData && <h2>{userData.firstname.slice(0, 1)}  </h2>
          }
        </div>
        <div className='article__comment-wrapper'>
          <textarea className='article__comment' value={commentValue} onChange={(e) => setCommentValue(e.target.value)} >

          </textarea>
          <Button text="Comment" type={'submit'} />
        </div>
      </form>
      {
        allComments.length > 0 &&
        <div className="article__comments">
          {
            allComments.filter((comment) => comment.post === id).reverse().map((comment) => (
              <div key={comment._id} className="article__comment-item">
                <div className="article__comment-user comment-user">
                  {userData && <h2>{userData.firstname?.slice(0, 1)}</h2>}
                </div>
                <p>{comment.description}</p>
              </div>
            ))
          }

        </div>
      }
    </Container>
  )
}

export default Article