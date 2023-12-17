import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useUserState = () => {
  const { users, isLoading, isLoggedIn, userData, error, searchTerm, ban } = useSelector(
    (state: RootState) => state.usersR
  )

  return {
    users,
    isLoading,
    error,
    searchTerm,
    isLoggedIn,
    userData,
    ban
  }
}

export default useUserState
