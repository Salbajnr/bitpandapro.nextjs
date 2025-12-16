import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser, ensurePrismaUser } from "@/lib/auth";
import { updateTradeSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);
  try {
    const resolvedParams = await params;
    const trade = await prisma.trade.findFirst({ where: { id: resolvedParams.id, portfolio: { userId: user.id } } });
    if (!trade) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ trade });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);

  const json = await req.json().catch(() => null);
  const parsed = updateTradeSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  try {
    const resolvedParams = await params;
    const existing = await prisma.trade.findUnique({ where: { id: resolvedParams.id }, include: { portfolio: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.portfolio.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const trade = await prisma.trade.update({
      where: { id: resolvedParams.id },
      data: {
        ...(parsed.data.symbol ? { symbol: parsed.data.symbol } : {}),
        ...(parsed.data.side ? { side: parsed.data.side } : {}),
        ...(parsed.data.quantity !== undefined ? { quantity: parsed.data.quantity as any } : {}),
        ...(parsed.data.price !== undefined ? { price: parsed.data.price as any } : {}),
        ...(parsed.data.executedAt ? { executedAt: new Date(parsed.data.executedAt) } : {}),
      },
    });
    return NextResponse.json({ trade });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);
  try {
    const resolvedParams = await params;
    const existing = await prisma.trade.findUnique({ where: { id: resolvedParams.id }, include: { portfolio: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.portfolio.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.trade.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}