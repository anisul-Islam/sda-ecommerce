import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useOrderState = () => {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orderR)

  return {
    orders,
    isLoading,
    error
  }
}

export default useOrderState
