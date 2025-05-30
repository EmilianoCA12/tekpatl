// ✅ /src/app/api/webhook/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import sql from 'better-sqlite3';
import { Readable } from 'stream';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const db = sql('tekpatl.db');

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  const rawBody = await buffer(req.body);
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    try {
      const codigo = metadata.codigo;
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

      const stmtPedido = db.prepare(`
        INSERT INTO Pedido (idCliente, estatus, total, codigo)
        VALUES (?, 0, ?, ?)
      `);
      const resultPedido = stmtPedido.run(idCliente, metadata.total, codigo);
      const idPedido = resultPedido.lastInsertRowid;

      const cart = JSON.parse(metadata.cart);
      const stmtDetalle = db.prepare(`
        INSERT INTO DetallePedido (idJoya, idPedido, talla, color, cantidad, subTotal)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      for (const item of cart) {
        stmtDetalle.run(item.id, idPedido, item.talla, item.color, item.cantidad, item.subtotal);
      }

      console.log("✅ Pedido registrado correctamente en la BD");
    } catch (err) {
      console.error("❌ Error guardando en la BD:", err);
      return new NextResponse("Error al registrar el pedido", { status: 500 });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
