// src/components/CartPreview/CartPreview.jsx
"use client";

import useCartStore from "@/store/cartStore";
import Image from "next/image";
import styles from "./CartPreview.module.css";
import { useRouter } from "next/navigation";

import { DM_Sans } from "next/font/google";
import clsx from "clsx";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function CartPreview({ isOpen, onClose }) {
  const { cart, removeFromCart } = useCartStore();
  const router = useRouter();
  const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);

  function handleCheckout() {
    router.push("/checkout");
  }

  return (
    <div
      className={clsx(`${styles.overlay} ${isOpen ? styles.open : styles.closed}`, dmSans.className)}
      onClick={onClose}
    >
      <div
        className={`${styles.cartPanel} ${isOpen ? styles.open : styles.closed}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.cartHeader}>
          <h2>SHOPPING BAG</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>

        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id + item.talla + item.color} className={styles.item}>
                <div className={styles.imgBox}>
                <Image src={item.direccion} alt={item.nombre} width={90} height={90} />
                </div>
                <div className={styles.itemDetails}>
                <p>{item.nombre}</p>
                <p className={styles.subDetail}>Color: {item.color ?? "Único"}</p>
                <p className={styles.subDetail}>Talla: {item.talla ?? "Única"}</p>
                <p className={styles.subDetail}>Cantidad: {item.cantidad}</p>
                <div className={styles.itemFooter}>
                    <span>${item.subtotal.toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
                </div>
            </div>
            ))
          )}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</div>
          <button onClick={handleCheckout} className={styles.checkout}>Compra segura</button>
        </div>
      </div>
    </div>
  );
}