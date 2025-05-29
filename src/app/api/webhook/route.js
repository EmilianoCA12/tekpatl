// src/app/api/webhook/route.js
import { buffer } from "micro";
import Stripe from "stripe";
import sql from "better-sqlite3";

// Inicializar Stripe con la secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inicializar base de datos
const db = sql("tekpatl.db");

// Desactivar parsing automático de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Procesar evento exitoso
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    try {
      // Insertar cliente (modo invitado)
      const stmtCliente = db.prepare(`
        INSERT INTO Cliente (nombre, correo, numeroTelefono, invitado)
        VALUES (?, ?, ?, 1)
      `);
      const result = stmtCliente.run(
        metadata.nombre,
        metadata.correo,
        metadata.telefono
      );
      const idCliente = result.lastInsertRowid;

      // Insertar pedido
      const stmtPedido = db.prepare(`
        INSERT INTO Pedido (idCliente, estatus, total)
        VALUES (?, 0, ?)
      `);
      const resultPedido = stmtPedido.run(idCliente, metadata.total);
      const idPedido = resultPedido.lastInsertRowid;

      // Parsear cart
      const cart = JSON.parse(metadata.cart);
      const stmtDetalle = db.prepare(`
        INSERT INTO DetallePedido (idPedido, talla, color, cantidad, subTotal)
        VALUES (?, ?, ?, ?, ?)
      `);
      for (const item of cart) {
        stmtDetalle.run(idPedido, item.talla, item.color, item.cantidad, item.subtotal);
      }

      console.log("✅ Pedido registrado exitosamente");
    } catch (err) {
      console.error("❌ Error al guardar en la base de datos:", err);
      return res.status(500).send("Error al registrar pedido");
    }
  }

  res.status(200).json({ received: true });
}