import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/slices/users/userSlice'
import { createUser } from '../../services/UserService'

const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    phone: '',
    address: ''
  })

  const [nameError, setNameError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.type === 'file') {
      console.log('file selected')
      const fileInput = (event.target as HTMLInputElement) || ''
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: fileInput.files?.[0].name }
      })
    } else {
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value }
      })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('image', user.image)
    formData.append('password', user.password)
    formData.append('phone', user.phone)
    formData.append('address', user.address)

    if (user.name.length < 2) {
      setNameError('first name must be atleast 2 characters')
      return
    }

    try {
      const response = await createUser(formData)
      console.log(response)
    } catch (error) {
      console.log(error.response.data.message)
    }

    // dispatch an action to add the newUser
    // dispatch(fetchUser()).then(() => dispatch(addUser(newUser)))

    navigate('/login')
  }

  return (
    <div className="register">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">name: </label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
          <p>{nameError}</p>
        </div>

        <div className="form-field">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="password">password: </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">phone: </label>
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="address">address: </label>
          <textarea name="address" value={user.address} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="image">Image: </label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </div>

        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
