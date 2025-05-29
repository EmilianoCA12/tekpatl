"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import styles from "./CheckOut.module.css";
import clsx from "clsx";
import Image from "next/image";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function CheckOutPage() {
  const router = useRouter();
  const { cart } = useCartStore();
  const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  function validarCampos() {
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]{3,}$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\+?\d{10,15}$/;

    if (!nombre || !correo || !telefono) {
      return "Por favor completa todos los campos obligatorios.";
    }

    if (!nombreRegex.test(nombre.trim())) {
      return "Nombre inválido. Usa solo letras, espacios y al menos 3 caracteres.";
    }

    if (!correoRegex.test(correo.trim())) {
      return "Correo electrónico inválido.";
    }

    if (!telefonoRegex.test(telefono.trim())) {
      return "Número de teléfono inválido. Usa solo números y opcionalmente el prefijo internacional.";
    }

    return null;
  }

  async function handleCheckout() {
    const mensajeError = validarCampos();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          cliente: {
            nombre,
            correo,
            telefono
          }
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No se pudo redirigir a Stripe");
      }
    } catch (err) {
      console.error("Error en checkout:", err);
    }
  }

  return (
    <div className={clsx(styles.checkoutContainer, dmSans.className)}>
      <div className={styles.formSection}>
        <h2 className={styles.title}>Datos de contacto</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
        >
          <label className={styles.label}>Nombre completo *</label>
          <input
            className={styles.input}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label className={styles.label}>Correo electrónico *</label>
          <input
            className={styles.input}
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label className={styles.label}>Número de teléfono *</label>
          <input
            className={styles.input}
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Continuar con el pago
          </button>
        </form>
      </div>

      <div className={styles.summarySection}>
        <h2 className={styles.title}>Resumen del pedido</h2>
        {cart.map((item) => (
          <div key={item.id + item.talla + item.color} className={styles.itemSummary}>
            <div className={styles.imageAndText}>
              <div className={styles.imageBox}>
                <Image src={item.direccion} alt={item.nombre} width={100} height={100} />
              </div>
              <div>
                <p><strong>{item.nombre}</strong></p>
                <p className={styles.subDetail}>Color: {item.color ?? "Único"}</p>
                <p className={styles.subDetail}>Talla: {item.talla ?? "Única"}</p>
                <p className={styles.subDetail}>Cantidad: {item.cantidad}</p>
                <p className={styles.subDetail}>Subtotal: ${item.subtotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.total}>Total: ${subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}