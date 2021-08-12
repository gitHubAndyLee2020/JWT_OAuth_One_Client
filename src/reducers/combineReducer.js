import { combineReducers } from 'redux'
import posts from './postReducer'
import auth from './authReducer'

const reducers = combineReducers({ posts, auth })

export default reducers
