import { favoritos } from "../../lib/db";

export function GET() {
  return Response.json(favoritos);
}

export async function POST(req) {
  const poke = await req.json();

  if (poke && !favoritos.some((item) => item.id === poke.id)) {
    favoritos.push(poke);
  }

  return Response.json({ status: "Capturado!" }, { status: 201 });
}