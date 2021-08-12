import React from 'react'
import { likePost } from '../../../actions/postActions'
import { useDispatch } from 'react-redux'

export default function Likes({ post, user }) {
  const dispatch = useDispatch()

  return (
    <div>
      <button
        style={
          post.likes.some((id) => id === user?.profile?.googleId || id === user?.profile?._id)
            ? { background: 'red', color: 'white' }
            : { background: 'white', color: 'red' }
        }
        onClick={() => dispatch(likePost(post._id, post, user))}
      >
        Likes: {post.likes.length}
      </button>
    </div>
  )
}
