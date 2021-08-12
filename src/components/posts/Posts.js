import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PROFILE } from '../../constants/storageKeys'
import { useDispatch } from 'react-redux'
import { deletePost, updatePost } from '../../actions/postActions'
import Likes from './likes/Likes'
import moment from 'moment'

export default function Posts() {
  const [selectedPost, setSelectedPost] = useState(null)
  const posts = useSelector((state) => state.posts)
  const user = JSON.parse(localStorage.getItem(PROFILE))
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatePost(selectedPost._id, selectedPost))
    setSelectedPost(null)
  }

  const handleChange = (e) => {
    setSelectedPost({ ...selectedPost, [e.target.name]: e.target.value })
  }

  if (!user) {
    return (
      <div>
        {posts.map((post) => {
          return (
            <div>
              <p>{moment(post.createdAt).fromNow()}</p>
              <p>{post?.name}</p>
              <p>{post.content}</p>
              <p>Likes: {post.likes.length}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {posts.map((post) => {
        return user?.profile?.googleId === post?.creator || user?.profile?._id === post?.creator ? (
          selectedPost?._id === post._id ? (
            <div>
              <p>{moment(post.createdAt).fromNow()}</p>
              <p>{post?.name}</p>
              <form onSubmit={handleSubmit}>
                <input name="content" type="text" value={selectedPost?.content} onChange={(e) => handleChange(e)} />
                <button>Update</button>
              </form>
              <Likes post={post} user={user} />
            </div>
          ) : (
            <div>
              <p>{moment(post.createdAt).fromNow()}</p>
              <p>{post?.name}</p>
              <p>{post.content}</p>
              <button onClick={() => setSelectedPost(post)}>Edit</button>
              <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
              <Likes post={post} user={user} />
            </div>
          )
        ) : (
          <div>
            <p>{moment(post.createdAt).fromNow()}</p>
            <p>{post?.name}</p>
            <p>{post.content}</p>
            <Likes post={post} user={user} />
          </div>
        )
      })}
    </div>
  )
}
