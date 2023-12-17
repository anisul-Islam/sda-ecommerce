import React, { ChangeEvent, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { AppDispatch } from '../redux/store'

import {
  banUser,
  deleteUser,
  fetchUsers,
  searchUser,
  unbanUser
} from '../redux/slices/users/userSlice'
import SearchInput from './SearchInput'
import useUserState from '../hooks/useUserState'
import { baseURL } from '../services/UserService'

const UsersList = () => {
  const { users, isLoading, error, searchTerm } = useUserState()

  console.log(users)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  /*
  useEffect(() => {
    if (error) {
      toast.error(error) // Show error toast when state.error changes
    }
  }, [error])
 */

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
  }

  const searchedUsers = searchTerm
    ? users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : users

  const handleDelete = async (id: string) => {
    await dispatch(deleteUser(id))
    console.log(users)
  }

  const handleBanUnban = async (id: string, isBanned: boolean) => {
    isBanned ? dispatch(unbanUser(id)) : dispatch(banUser(id))
  }

  return (
    <div className="container">
      <AdminSidebar />

      <div className="main-content">
        <ToastContainer />
        <h2>List of Users</h2>
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        <section className="products">
          {searchedUsers.length > 0 &&
            searchedUsers.map((user) => {
              if (!user.isAdmin) {
                return (
                  <article key={user._id} className="product">
                    <img src={user.image} alt={user.name} />
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    {/* <p>{user.role}</p> */}
                    <button
                      onClick={() => {
                        handleDelete(user._id)
                      }}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleBanUnban(user._id, user.isBanned)
                      }}>
                      {user.isBanned ? 'unban' : 'ban'}
                    </button>
                  </article>
                )
              }
            })}
        </section>
      </div>
    </div>
  )
}

export default UsersList
