import { copy, isLocale } from "@/lib/content";

const reply = (status: number, error: string) =>
  Response.json({ error }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return reply(403, "Invalid origin");
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply(415, "JSON required");
  // Read with a hard limit even when a client omits Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply(400, "Body required");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 16_384) {
        await reader.cancel();
        return reply(413, "Body too large");
      }
      chunks.push(value);
    }
  } catch {
    return reply(400, "Invalid body");
  }
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return reply(400, "Invalid body");
    body = parsed;
  } catch {
    return reply(400, "Invalid JSON");
  }
  const { name, email, service, message, budget, locale, website } = body;
  if (
    typeof locale !== "string" ||
    !isLocale(locale) ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 100 ||
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 4000 ||
    typeof service !== "string" ||
    !copy[locale].form.choices.includes(service) ||
    typeof budget !== "string" ||
    !copy[locale].form.budgets.includes(budget) ||
    (website !== undefined && website !== "")
  )
    return reply(400, "Invalid fields");
  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) return reply(503, "Online delivery is not configured");
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        source: "Startease",
        name: name.trim(),
        email: email.trim(),
        service,
        message: message.trim(),
        budget,
        locale,
      }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) return reply(502, "Delivery failed");
    return Response.json({ ok: true });
  } catch {
    return reply(502, "Delivery failed");
  }
}
