import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: ''
  },
  reducers: {
    usernameChange(state, action) {
      return action.payload
    },
    passwordChange(state, action) {
      return action.payload
    }
  }
})

export const { usernameChange, passwordChange } = loginSlice.actions

export default loginSlice.reducer