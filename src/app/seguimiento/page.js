"use client";

import { useState } from "react";
import styles from "./Seguimiento.module.css";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function SeguimientoPage() {
  const [codigo, setCodigo] = useState("");
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState("");

  async function buscarPedido() {
    if (!codigo.trim()) return;

    const res = await fetch(`/api/seguimiento?codigo=${codigo}`);
    const data = await res.json();

    if (data.ok) {
      setPedido(data.pedido);
      setError("");
    } else {
      setPedido(null);
      setError("No se encontró ningún pedido con ese código.");
    }
  }

  return (
    <div className={clsx(styles.container, dmSans.className)}>
      <h1 className={styles.title}>📦 Seguimiento de pedido</h1>

      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Ingresa tu código de pedido"
          className={styles.input}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button onClick={buscarPedido} className={styles.button}>
          Buscar
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {pedido && (
        <div className={styles.resumenBox}>
          <h2 className={styles.subTitle}>Resumen del pedido</h2>
          {pedido.detalles.map((item, index) => (
            <div
              key={`${item.nombre}-${item.talla}-${item.color}-${index}`}
              className={styles.itemSummary}
            >
              <div className={styles.imageAndText}>
                {item.direccion && (
                  <div className={styles.imageBox}>
                    <img
                      src={item.direccion}
                      alt={item.nombre}
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                <div>
                  <p><strong>{item.nombre}</strong></p>
                  <p className={styles.subDetail}>Color: {item.color}</p>
                  <p className={styles.subDetail}>Talla: {item.talla}</p>
                  <p className={styles.subDetail}>Cantidad: {item.cantidad}</p>
                  <p className={styles.subDetail}>Subtotal: ${item.subTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.total}>Total: ${pedido.total.toFixed(2)}</div>
          <div className={styles.status}>Estatus: {pedido.estatus}</div>
        </div>
      )}
    </div>
  );
}