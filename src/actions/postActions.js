import { FETCH_ALL, CREATE, DELETE, UPDATE, LIKE } from '../constants/actionTypes'
import * as API from '../api/CRUD_Auth.js'
import applyLike from './applyLike/applyLike'

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await API.getPosts()

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await API.createPost(post)

    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE, payload: id })

    await API.deletePost(id)
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE, payload: post })

    await API.updatePost(id, post)
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id, post, user) => async (dispatch) => {
  try {
    dispatch({ type: LIKE, payload: applyLike(post, user) })

    await API.likePost(id)
  } catch (error) {
    console.log(error)
  }
}
