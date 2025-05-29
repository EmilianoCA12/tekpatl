// /src/app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();
  const { cart } = body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return new Response(JSON.stringify({ error: 'Cart is empty or invalid' }), {
      status: 400,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cart.map((item) => ({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.nombre,
            description: `Color: ${item.color ?? 'Unico'}, Talla: ${item.talla ?? 'Unica'}`,
            images: [
              `${process.env.NEXT_PUBLIC_URL}${item.direccion}`
            ]
          },
          unit_amount: Math.round(item.costo * 100), // Stripe espera centavos
        },
        quantity: item.cantidad,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/exito`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancelado`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}