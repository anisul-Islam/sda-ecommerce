import { useDispatch } from 'react-redux'

import { ChangeEvent } from 'react'
import { AppDispatch } from '../redux/store'
import { sortProducts } from '../redux/slices/products/productSlice'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }

  return (
    <div>
      <label>Sort by:</label>
      <select onChange={handleSortChange}>
        <option value="price" defaultValue="price">
          price
        </option>
        <option value="name">name</option>
      </select>
    </div>
  )
}

export default SortProducts
