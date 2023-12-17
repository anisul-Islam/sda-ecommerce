import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { activateUserAccount } from '../../services/UserService'

const ActivatePage = () => {
  const { token } = useParams()
  const decoded = jwtDecode(token)
  const navigate = useNavigate()

  const handleActivate = async () => {
    // make request to backend api with token
    try {
      const response = await activateUserAccount(token)
      console.log(response)
      // if it successful then set to the login page
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  return (
    <div className="container">
      <div>
        <h2>Hello {decoded.name} ! Click the button for activating user account</h2>
        <button onClick={handleActivate}>Activate User Account</button>
      </div>
    </div>
  )
}

export default ActivatePage
