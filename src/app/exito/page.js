"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";

export default function ExitoPage() {
  const [verificado, setVerificado] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      router.replace("/");
      return;
    }

    fetch(`/api/validar-sesion?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setVerificado(true);
          clearCart(); // 🧹 Limpiar carrito

          // Limpiar la URL
          const cleanUrl = window.location.origin + "/exito";
          window.history.replaceState({}, document.title, cleanUrl);
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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎉 ¡Gracias por tu compra!</h1>
      <p>Recibirás un correo con la confirmación.</p>
    </div>
  );
}