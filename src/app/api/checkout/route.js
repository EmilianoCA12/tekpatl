// ✅ checkout/route.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();
  const { cart, nombre, correo, telefono } = body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return new Response(JSON.stringify({ error: 'Cart is empty or invalid' }), {
      status: 400,
    });
  }

  const codigo = `TEK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  const metadata = {
    nombre: nombre || '',
    correo: correo || '',
    telefono: telefono || '',
    total: cart.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
    cart: JSON.stringify(cart.map(item => ({
      id: item.id,
      talla: item.talla,
      color: item.color,
      cantidad: item.cantidad,
      subtotal: item.subtotal
    }))),
    codigo
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cart.map((item) => ({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.nombre,
            description: `Color: ${item.color ?? 'Único'}, Talla: ${item.talla ?? 'Única'}`,
            images: [`${process.env.NEXT_PUBLIC_URL}${item.direccion}`],
          },
          unit_amount: Math.round(item.costo * 100),
        },
        quantity: item.cantidad,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/exito?codigo=${codigo}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancelado`,
      metadata
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });

  } catch (err) {
    console.error("❌ Error al crear sesión de Stripe:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}