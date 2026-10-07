import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Liveness check for the host's health check (Railway: railway.json → healthcheckPath). */
export function GET() {
  return NextResponse.json({ ok: true });
}
