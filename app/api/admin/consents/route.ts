import { prisma } from "@/lib/db";

const ADMIN_KEY = process.env.ADMIN_KEY || "1234";

export async function GET(req: Request) {
  const auth = req.headers.get("x-admin-key");
  if (auth !== ADMIN_KEY) return new Response("Unauthorized", { status: 401 });

  const consents = await prisma.consent.findMany({
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(consents), { status: 200 });
}