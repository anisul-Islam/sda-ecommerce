import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data
})

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product,
  filteredProducts: [] as Product[]
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price') {
        state.products.sort((a, b) => a.price - b.price)
      }
    },
    deleteProduct: (state, action) => {
      const filterProducts = state.products.filter((product) => product.id !== action.payload)
      state.products = filterProducts
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload
      state.products = state.products.map((product) => {
        if (product.id === updatedProduct.id) {
          return { ...product, ...updatedProduct }
        }
        return product
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
  }
})

export const {
  findProductById,
  searchProduct,
  sortProducts,
  deleteProduct,
  addProduct,
  updateProduct
} = productSlice.actions
export default productSlice.reducer
