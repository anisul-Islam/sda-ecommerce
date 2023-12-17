import axios from 'axios'

export const baseURL = 'http://localhost:3001'

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${baseURL}/users/${id}`)
  return response.data
}

export const banUser = async (id: string) => {
  const response = await axios.put(`${baseURL}/users/ban/${id}`)
  return response.data
}

export const unbanUser = async (id: string) => {
  const response = await axios.put(`${baseURL}/users/unban/${id}`)
  return response.data
}

export const createUser = async (newUser: FormData) => {
  const response = await axios.post(`${baseURL}/users/process-register`, newUser)
  return response.data
}

export const activateUserAccount = async (token: string) => {
  const response = await axios.post(`${baseURL}/users/activate`, { token })
  return response.data
}
