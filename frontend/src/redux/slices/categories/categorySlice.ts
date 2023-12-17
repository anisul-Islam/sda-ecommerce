import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      const filterCategories = state.categories.filter((category) => category.id !== action.payload)
      state.categories = filterCategories
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const foundCategory = state.categories.find((category) => category.id === id)
      if (foundCategory) {
        foundCategory.name = name
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
  }
})

export const { deleteCategory, addCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer
