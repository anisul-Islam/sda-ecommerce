import { useDispatch, useSelector } from 'react-redux'
import { FaTrashAlt } from 'react-icons/fa'

import { AppDispatch, RootState } from '../redux/store'
import { removeAllItemsFromCart, removeItemFromCart } from '../redux/slices/cart/cartSlice'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartR)
  const dispatch: AppDispatch = useDispatch()

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItemFromCart(id))
    // toast
  }
  const handleRemoveAllCartItems = () => {
    dispatch(removeAllItemsFromCart())
  }

  const cartTotal = () => {
    let totalAmount = 0
    cartItems.length > 0 &&
      cartItems.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
    return totalAmount
  }

  return (
    <div>
      <div className="cart-title">
        <h2>You have {cartItems.length > 0 ? cartItems.length : 0} items in the cart</h2>
        {cartItems.length > 0 && (
          <button onClick={handleRemoveAllCartItems}>Remove all the items</button>
        )}
      </div>
      <div className="cart-main">
        {cartItems.length > 0 && (
          <>
            <div className="cart-items">
              {cartItems.map((cartItem) => {
                return (
                  <article key={cartItem.id} className="cart-card">
                    <div className="cart-left">
                      <img src={cartItem.image} alt={cartItem.name} className="cart-img" />
                    </div>
                    <div className="cart-right">
                      <h3>{cartItem.name}</h3>
                      <h4>Price: {cartItem.price}</h4>
                      <p>Description: {cartItem.description.substring(0, 50)} ...</p>
                      <button
                        className="cart__btn"
                        onClick={() => {
                          handleRemoveFromCart(cartItem.id)
                        }}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            <div className="checkout-info">
              <h2>Cart Summary</h2>
              <h3>Total amount you have to pay: {cartTotal()}</h3>
              <h3>Delivery Address: user address here</h3>
              <button>update delivery address</button>
              <p>paymnet options here</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
