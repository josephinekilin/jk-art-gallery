import Product from './components/JKGalleryComponent'
import Cart from './components/CartComponent'

export const routes = [
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/*',
    name: 'Product',
    component: Product,
  },
]