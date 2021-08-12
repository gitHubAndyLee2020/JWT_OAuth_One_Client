import axios from 'axios'
import { PROFILE } from '../constants/storageKeys'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem(PROFILE)) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem(PROFILE)).token}`
  }
  return req
})

export const getPosts = () => API.get('/posts')
export const createPost = (post) => API.post('/posts', post)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)
