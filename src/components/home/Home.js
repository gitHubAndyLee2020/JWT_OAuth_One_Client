import React, { useEffect } from 'react'
import Form from '../form/Form'
import Posts from '../posts/Posts'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/postActions'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div>
      <Form />
      <Posts />
    </div>
  )
}
