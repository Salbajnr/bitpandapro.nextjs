import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser, ensurePrismaUser } from "@/lib/auth";
import { updateHoldingSchema } from "@/lib/validation";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);

  const json = await req.json().catch(() => null);
  const parsed = updateHoldingSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  try {
    const resolvedParams = await params;
    const existing = await prisma.holding.findUnique({ where: { id: resolvedParams.id }, include: { portfolio: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.portfolio.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const holding = await prisma.holding.update({
      where: { id: resolvedParams.id },
      data: {
        ...(parsed.data.quantity !== undefined ? { quantity: parsed.data.quantity as any } : {}),
        ...(parsed.data.averageCost !== undefined ? { averageCost: parsed.data.averageCost as any } : {}),
      },
    });
    return NextResponse.json({ holding });
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
    const existing = await prisma.holding.findUnique({ where: { id: resolvedParams.id }, include: { portfolio: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.portfolio.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.holding.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}