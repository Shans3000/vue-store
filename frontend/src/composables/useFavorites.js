import { useProductsStore } from '@/store'

export default function useFavorites() {
  const store = useProductsStore()

  const isFavorite = (productId) => {
    return store.favorites.some(f => f.id === productId)
  }

  const toggleFavorite = (product) => {
    store.toggleFavorite(product)
  }

  return {
    isFavorite,
    toggleFavorite
  }
}