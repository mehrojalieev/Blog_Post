import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {useValue } from "../../context/AppProvider"
import instance from '../../services/api';
import { Button, Container, SingleCardSkeleton } from '../../utils/index';
import "./Article.scss";

const Article = () => {
  const [state] = useValue()
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

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
        setUserData(res.data)
      })
    .catch((err) => {
      console.log(err);
    })
  }, [])

console.log(userData);

  return (
    <Container>
      {!loading ?
        <div className='single-article'>
          <h2>{data.title}</h2>
          <img src={data.image} alt="picture" />
          <p>{data.title}</p>

          <p>{data.description}</p>
        </div> :
        <SingleCardSkeleton amount={10} />
      }
      <form className='article__comment-form'>
        <div className="article__comment-user">

        </div>
        <div className='article__comment-wrapper'>
          <textarea className='article__comment'>

          </textarea>
          <Button text="Comment" type='submit' />
        </div>
      </form>

    </Container>
  )
}

export default Article