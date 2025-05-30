"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import styles from "./Exito.module.css";
import Link from "next/link";

export default function ExitoPage() {
  const [verificado, setVerificado] = useState(false);
  const [codigo, setCodigo] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const codigoParam = searchParams.get("codigo");

    if (!codigoParam) {
      router.replace("/");
      return;
    }

    fetch(`/api/validar-codigo?codigo=${codigoParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setVerificado(true);
          setCodigo(codigoParam);
          clearCart();
          window.history.replaceState({}, document.title, "/exito");
        } else {
          router.replace("/");
        }
      })
      .catch(() => {
        router.replace("/");
      });
  }, []);

  if (!verificado) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎉 ¡Gracias por tu compra!</h1>
      <p className={styles.text}>Recibirás un correo con la confirmación.</p>
      <p className={styles.text}>Tu código de pedido es: <strong>{codigo}</strong></p>
      <Link href="/" className={styles.button}>Volver a la tienda</Link>
    </div>
  );
}