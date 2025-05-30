import sql from 'better-sqlite3';
const db = sql('tekpatl.db');

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const codigo = searchParams.get("codigo");

  const pedido = db.prepare("SELECT * FROM Pedido WHERE codigo = ?").get(codigo);

  if (pedido) {
    return new Response(JSON.stringify({ ok: true }));
  } else {
    return new Response(JSON.stringify({ ok: false }), { status: 404 });
  }
}