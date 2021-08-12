export default function applyLike(post, user) {
  if (user?.profile?.googleId) {
    if (!post.likes.some((id) => id === user?.profile?.googleId)) {
      post.likes.push(user?.profile?.googleId)
    } else {
      post.likes = post.likes.filter((id) => id !== user?.profile?.googleId)
    }
  } else if (user?.profile?._id) {
    if (!post.likes.some((id) => id === user?.profile?._id)) {
      post.likes.push(user?.profile?._id)
    } else {
      post.likes = post.likes.filter((id) => id !== user?.profile?._id)
    }
  }
  return post
}
