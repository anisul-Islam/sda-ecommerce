import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../products/productSlice'

const data =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

type cartState = {
  cartItems: Product[]
}

const initialState: cartState = {
  cartItems: data
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeAllItemsFromCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    }
  }
})

export const { addItemToCart, removeItemFromCart, removeAllItemsFromCart } = cartSlice.actions
export default cartSlice.reducer
