import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/authActions'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Auth() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const switchMode = () => {
    setIsSignup(!isSignup)
    setShowPassword(false)
    setFormData(initialState)
  }

  const googleSuccess = (res) => {
    const profile = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: LOGIN, payload: { profile, token } })

      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <label htmlFor="firstName">First Name:</label>
            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={(e) => handleChange(e)} />
            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={(e) => handleChange(e)} />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={(e) => handleChange(e)} />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" value={formData.password} onChange={(e) => handleChange(e)} />
        {isSignup && (
          <>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </>
        )}
        <button>{isSignup ? 'Sign Up' : 'Sign In'}</button>
        <GoogleLogin
          clientId="555678566581-mteo4n6po7eu93b7hd2hikti9o04srvk.apps.googleusercontent.com"
          render={(renderProps) => (
            <button style={{ width: '12rem', height: '1.5rem' }} onClick={renderProps.onClick}>
              Google Sign In
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
      </form>
      <button onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</button>
    </div>
  )
}
