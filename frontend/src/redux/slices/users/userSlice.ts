import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseURL } from '../../../services/UserService'

export type User = {
  _id: string
  name: string
  email: string
  image: string
  phone: string
  password: string
  isAdmin: boolean
  isBanned: boolean
}

export const fetchUsers = createAsyncThunk('users/fetchUser', async () => {
  const response = await axios.get(`${baseURL}/users`)
  return response.data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await axios.delete<User[]>(`${baseURL}/users/${id}`)
  return id
})
export const banUser = createAsyncThunk('users/banUser', async (id: string) => {
  await axios.put(`${baseURL}/users/ban/${id}`)
  return id
})
export const unbanUser = createAsyncThunk('users/unbanUser', async (id: string) => {
  await axios.put(`${baseURL}/users/unban/${id}`)
  return id
})

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  searchTerm: string
  ban: boolean
}

// set the data in the localstorage
const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  searchTerm: '',
  ban: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.payload.users
      state.isLoading = false
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload)
      state.isLoading = false
      console.log(state.users)
    })
    builder.addCase(banUser.fulfilled, (state, action) => {
      const foundUser = state.users.find((user) => user._id === action.payload)
      if (foundUser) {
        foundUser.isBanned = true
      }
    })
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      const foundUser = state.users.find((user) => user._id === action.payload)
      if (foundUser) {
        foundUser.isBanned = false
      }
    })

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'an error occured'
        console.log(state.error)
      }
    )
  }
})

export const { login, logout, searchUser, updateUser } = userSlice.actions
export default userSlice.reducer

// own server -> storing file in the server
// deploy vercel server -> storing file in the server -> s3 / cloudinary (1GB)
