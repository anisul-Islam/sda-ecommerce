import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchOrder = createAsyncThunk('users/fetchOrder', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      const filterOrders = state.orders.filter((order) => order.id !== action.payload)
      state.orders = filterOrders
    }
    // addOrder: (state, action) => {
    //   state.categories.push(action.payload)
    // },
    // updateOrder: (state, action) => {
    //   const { id, name } = action.payload
    //   const foundCategory = state.categories.find((category) => category.id === id)
    //   if (foundCategory) {
    //     foundCategory.name = name
    //   }
    // }
  },
  extraReducers(builder) {
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.orders = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
  }
})

export const { deleteOrder } = orderSlice.actions

export default orderSlice.reducer
