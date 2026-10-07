/**
 * Best-effort, in-memory rate limiting for the form endpoints: a fixed number
 * of submissions per client IP per window. On serverless hosts each instance
 * keeps its own counts, so this blunts bursts from a single source rather than
 * guaranteeing a global limit — together with the honeypot field it is enough
 * for a marketing site's form volume. Swap in a shared store (e.g. Upstash
 * Redis) if abuse ever becomes a real problem.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on long-lived servers.
  if (hits.size > 5000) {
    for (const [entryKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(entryKey);
    }
  }
  return false;
}

export function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return `${scope}:${forwarded || request.headers.get("x-real-ip") || "unknown"}`;
}
