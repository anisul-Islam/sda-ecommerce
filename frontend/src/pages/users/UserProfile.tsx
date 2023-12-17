import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import UserSidebar from '../../components/UserSidebar'
import useUserState from '../../hooks/useUserState'
import { AppDispatch } from '../../redux/store'
import { updateUser } from '../../redux/slices/users/userSlice'

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userData, users } = useUserState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  console.log(users)

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const updateUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updateUserData))
  }

  return (
    <div className="container">
      <UserSidebar />
      <div className="main-content">
        {userData && (
          <div>
            <div>
              <p>Id: {userData.id}</p>
              <p>Name: {`${userData?.firstName} ${userData?.lastName}`}</p>
              <p>Email: {userData?.email}</p>
              <p>Role: {userData.role}</p>
              <button className="btn" onClick={handleFormOpen}>
                Edit profile
              </button>
            </div>

            {isFormOpen && (
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                <button type="submit">Update the profile</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
