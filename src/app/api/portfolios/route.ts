import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser, ensurePrismaUser } from "@/lib/auth";
import { createPortfolioSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user.id },
      include: {
        holdings: true,
        trades: { orderBy: { executedAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ portfolios });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);

  const json = await req.json().catch(() => null);
  const parsed = createPortfolioSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const portfolio = await prisma.portfolio.create({
      data: { userId: user.id, name: parsed.data.name },
    });
    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}