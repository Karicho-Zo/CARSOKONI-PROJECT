import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateCartQuantity, clearCart } from '../features/cart/cartSlice'
import { Trash2, Plus, Minus } from 'lucide-react'
import useScrollPersistence from '../components/useScrollPersistence'
import './Cart.css'

const Cart = () => {
  const { items, total, tax } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  // Use scroll persistence hook with unique key for cart page
  const scrollKey = 'cart-page'
  useScrollPersistence(scrollKey)

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-content">
          <h1 className="cart-empty-title">Your Cart is Empty</h1>
          <p className="cart-empty-message">
            Add some cars to your cart to get started.
          </p>
          <a href="/cars" className="btn-primary">
            Browse Cars
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-grid">
        <div className="cart-items-section">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-content">
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.model}`}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.brand} {item.model}</h3>
                  <p className="cart-item-price">Ksh{item.price.toLocaleString()}</p>
                  <div className="cart-item-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="cart-quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="cart-quantity-display">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="cart-quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="cart-remove-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  <p>Ksh{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleClearCart}
            className="cart-clear-btn"
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-details">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Subtotal</span>
              <span className="cart-summary-value">Ksh{total.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-label">Tax</span>
              <span className="cart-summary-value">Ksh{tax.toFixed(0)}</span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-label">Total</span>
              <span className="cart-summary-value">Ksh{(total + tax).toFixed(0)}</span>
            </div>
          </div>
          <button className="cart-checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart