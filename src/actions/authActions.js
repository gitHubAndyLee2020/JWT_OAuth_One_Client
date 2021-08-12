import { LOGIN } from '../constants/actionTypes'

import * as API from '../api/CRUD_Auth'

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signin(formData)

    dispatch({ type: LOGIN, payload: data })

    history.push('/')
  } catch (error) {
    alert('Password Incorrect. Please try again')
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signup(formData)

    dispatch({ type: LOGIN, payload: data })

    history.push('/')
  } catch (error) {
    alert('Passwords do not match. Please try again')
  }
}
