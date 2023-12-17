import { FaCartPlus } from 'react-icons/fa'

const CartIconElement = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <FaCartPlus />
      <span className="badge">{value}</span>
    </div>
  )
}

export default CartIconElement
