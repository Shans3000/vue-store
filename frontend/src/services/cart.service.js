export default {
  getCart() {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  },

  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  },

  addItem(cart, product) {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1
      })
    }
    this.saveCart(cart)
    return [...cart]
  },

  removeItem(cart, productId) {
    const updatedCart = cart.filter(item => item.id !== productId)
    this.saveCart(updatedCart)
    return updatedCart
  },

  updateQuantity(cart, productId, quantity) {
    const item = cart.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      this.saveCart(cart)
    }
    return [...cart]
  },

  clearCart() {
    localStorage.removeItem('cart')
    return []
  },

  calculateTotal(cart) {
    return cart.reduce((total, item) => {
      return total + (item.discount_price || item.price) * item.quantity
    }, 0)
  }
}