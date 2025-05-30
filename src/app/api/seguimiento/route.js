import sql from "better-sqlite3";
import { NextResponse } from "next/server";

const db = sql("tekpatl.db");

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const codigo = searchParams.get("codigo");

  if (!codigo) {
    return NextResponse.json({ ok: false, error: "Código no proporcionado" }, { status: 400 });
  }

  const pedido = db.prepare(`
    SELECT id, total, estatus FROM Pedido WHERE codigo = ?
  `).get(codigo);

  if (!pedido) {
    return NextResponse.json({ ok: false, error: "Pedido no encontrado" }, { status: 404 });
  }

  const detalles = db.prepare(`
    SELECT d.talla, d.color, d.cantidad, d.subTotal, j.nombre, i.direccion
    FROM DetallePedido d
    JOIN Joyas j ON d.idPedido = ?
    JOIN DImagenes i ON j.id = i.idJoya
    GROUP BY j.id
  `).all(pedido.id);

  const estatusTexto = ["En revisión", "Pagado", "Enviado", "Entregado"][pedido.estatus] ?? "Desconocido";

  return NextResponse.json({
    ok: true,
    pedido: {
      total: pedido.total,
      estatus: estatusTexto,
      detalles,
    },
  });
}