import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

export default {
  async getProducts() {
    const response = await api.get('/api/products')
    return {
      ...response,
      data: response.data.map(product => ({
        ...product,
        imageUrl: `${import.meta.env.VITE_API_BASE_URL}/${product.images[0]}`
      }))
    }
  },

  async getProduct(id) {
    const response = await api.get(`/api/products/${id}`)
    return {
      ...response,
      data: {
        ...response.data,
        imageUrl: `${import.meta.env.VITE_API_BASE_URL}/${response.data.images[0]}`
      }
    }
  },

  async getCategory(id) {
    return api.get(`/api/category/${id}`)
  },

  async getSubcategories(categoryId) {
    return api.get(`/api/subcategory?category=${categoryId}`)
  },

  async getProductsBySubcategory(id) {
    return api.get(`/api/subcategory/${id}`)
  }
}