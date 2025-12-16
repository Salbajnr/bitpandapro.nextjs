import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser, ensurePrismaUser } from "@/lib/auth";
import { updatePortfolioSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);
  try {
    const resolvedParams = await params;
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: resolvedParams.id, userId: user.id },
      include: { holdings: true, trades: { orderBy: { executedAt: "desc" } } },
    });
    if (!portfolio) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ portfolio });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSupabaseUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensurePrismaUser(user);

  const json = await req.json().catch(() => null);
  const parsed = updatePortfolioSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const resolvedParams = await params;
    const portfolio = await prisma.portfolio.update({
      where: { id: resolvedParams.id },
      data: { ...parsed.data },
    });
    if (portfolio.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ portfolio });
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
    const existing = await prisma.portfolio.findUnique({ where: { id: resolvedParams.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    await prisma.portfolio.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}