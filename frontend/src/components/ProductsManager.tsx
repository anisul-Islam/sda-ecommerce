import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  productsRequest,
  productsSuccess,
  removeProduct
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { NewProductWrapper } from './NewProductWrapper'
import api from '../api'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

  useEffect(() => {
    handleGetProducts()
  }, [])

   /**
   * If you want to keep things simple you can follow this approach on updating
   * redux state when using async requests instead of using createAsyncThunk
   */
  const handleGetProducts = async () => {
    // let's first turn the loader to true so we can have a better UX
    dispatch(productsRequest())

    // Fetching from the local files
    const res = await api.get('/mock/e-commerce/products.json')
    // At this point we have the data so let's update the store
    dispatch(productsSuccess(res.data))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
      <NewProductWrapper />
      {products.isLoading && <h3> Loading products...</h3>}
      <div className="card grid gap-4">
        <ul>
          {products.items.map((product) => (
            <li key={product.id} className="flex items-center gap-4 text-2xl mb-2">
              <img src={product.image} alt={product.name} width="50" />
              <span>{product.name}</span>
              <button
                className=" text-red-400 text-xs"
                onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
