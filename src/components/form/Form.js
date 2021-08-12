import React, { useState } from 'react'
import { createPost } from '../../actions/postActions'
import { PROFILE } from '../../constants/storageKeys'
import { useDispatch } from 'react-redux'

const initialState = { content: '' }

export default function Form() {
  const [post, setPost] = useState(initialState)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem(PROFILE))

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({ ...post, name: user?.profile?.name }))
    setPost(initialState)
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {user ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input name="content" type="text" value={post.content} onChange={(e) => handleChange(e)} />
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Sign in to make a post</p>
        </div>
      )}
    </div>
  )
}
