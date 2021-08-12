import { LOGIN, LOGOUT } from '../constants/actionTypes'
import { PROFILE } from '../constants/storageKeys'

const authReducer = (authData = null, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(PROFILE, JSON.stringify({ ...action.payload }))
      return action.payload
    case LOGOUT:
      localStorage.removeItem(PROFILE)
      return null
    default:
      return authData
  }
}

export default authReducer
