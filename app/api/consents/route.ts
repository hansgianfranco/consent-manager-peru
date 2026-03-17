import { prisma } from "@/lib/db";

interface ConsentBody {
  status: string;
  purpose?: string;
}

export async function POST(req: Request) {
  const data: ConsentBody = await req.json();

  const consent = await prisma.consent.create({
    data: {
      status: data.status,
      ip: req.headers.get("x-forwarded-for") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
    },
  });

  return new Response(JSON.stringify(consent), { status: 201 });
}