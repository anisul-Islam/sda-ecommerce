import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUser, login } from '../../redux/slices/users/userSlice'

export const Login = ({ pathName = '' }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.usersR)

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // 4 users + 1 user = 5 users

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const foundUser = users.find((userData) => userData.email === user.email)

      if (!foundUser) {
        console.log('user not found with this email')
        return
      }

      if (foundUser.password !== user.password) {
        console.log('user password did not match')
        return
      }
      if (foundUser.ban) {
        console.log('sorry !! you are banned. please send an email to anisul@gmail.com')
        return
      }

      dispatch(login(foundUser))
      navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <div className="login">
      <h1>User Login</h1>
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password must be 6 characters"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// services/UserService.js
// export const loginUser = async (user) => {
//   const response = await axios.post(`${baseURL}/users/login`, user)
//   return response.data
// }
