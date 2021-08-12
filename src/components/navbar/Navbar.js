import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'
import { PROFILE } from '../../constants/storageKeys'
import decode from 'jwt-decode'

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(PROFILE)))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const logout = () => {
    dispatch({ type: LOGOUT })

    history.push('/')

    setUser(null)
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem(PROFILE)))
  }, [location])

  const hexcode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  let background = '#'
  for (let i = 0; i < 6; i++) {
    background += hexcode[parseInt(Math.random() * hexcode.length)]
  }

  return (
    <div>
      {user ? (
        <div>
          {user?.profile?.imageUrl ? (
            <div>
              <img src={user?.profile?.imageUrl} style={{ height: '4rem', width: '4rem', borderRadius: '50%' }} />
            </div>
          ) : (
            <div>
              <div
                style={{
                  height: '4rem',
                  width: '4rem',
                  background,
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'sans-serif',
                  fontSize: '2rem',
                }}
              >
                {user?.profile?.name[0]}
              </div>
            </div>
          )}
          <p>{user?.profile?.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          {location.pathname === '/' ? (
            <Link to="/auth">
              <button>Sign In</button>
            </Link>
          ) : (
            <Link to="/">
              <button>Go Back</button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
