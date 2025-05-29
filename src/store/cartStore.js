import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
      })),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),

      clearCart: () => set({ cart: [] }),

      setCart: (newCart) => set({ cart: newCart }) // <- necesario para sincronizar
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;