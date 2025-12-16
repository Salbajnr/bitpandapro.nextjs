import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser, ensurePrismaUser } from "@/lib/auth";
import { createTradeSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);
  try {
    const trades = await prisma.trade.findMany({
      where: { portfolio: { userId: user.id } },
      orderBy: { executedAt: "desc" },
    });
    return NextResponse.json({ trades });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);

  const json = await req.json().catch(() => null);
  const parsed = createTradeSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { portfolioId, symbol, side, quantity, price, executedAt } = parsed.data;

  // Authorization: portfolio must belong to the user
  const portfolio = await prisma.portfolio.findFirst({ where: { id: portfolioId, userId: user.id } });
  if (!portfolio) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const trade = await prisma.trade.create({
      data: {
        portfolioId,
        symbol,
        side,
        quantity: quantity as any,
        price: price as any,
        ...(executedAt ? { executedAt: new Date(executedAt) } : {}),
      },
    });
    return NextResponse.json({ trade }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}