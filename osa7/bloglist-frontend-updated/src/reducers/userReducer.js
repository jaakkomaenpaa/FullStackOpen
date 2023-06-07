import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(window.localStorage.getItem('loggedUser')),
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

export const { setUser, removeUser  } = userSlice.actions

export const handleLogin = (event, username, password) => {
  return async dispatch => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, 
        password: password.value
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      username.reset()
      password.reset()
    } catch (exception) {
      console.log('error', exception)
      dispatch(setNotification('wrong username or password'))
    }
  }
}

export const handleLogout = (event) => {
  return async dispatch => {
    event.preventDefault()
    console.log('user', JSON.parse(window.localStorage.getItem('loggedUser')))
    dispatch(removeUser())
  }
}

export default userSlice.reducer