// /app/api/validar-sesion/route.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session && session.payment_status === "paid") {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ ok: false }), { status: 403 });
    }
  } catch (err) {
    console.error("Error validando sesión:", err.message);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}