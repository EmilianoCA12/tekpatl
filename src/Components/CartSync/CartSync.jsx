"use client";

import { useEffect } from "react";
import useCartStore from "@/store/cartStore";

export default function CartSync() {
  const setCart = useCartStore(state => state.setCart);

  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === 'cart-storage') {
        const newState = JSON.parse(event.newValue);
        if (newState?.state?.cart) {
          setCart(newState.state.cart);
        }
      }
    };

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [setCart]);

  return null; // solo se usa para sincronizar, no muestra nada
}