/* Exercise the request boundary and delivery failures without sending real inquiries. */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(
  file,
  env = {},
  fetcher = async () => {
    throw new Error("Unexpected network access");
  },
) {
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require: (name) => {
      if (name === "@/lib/content") return load("lib/content.ts");
      throw new Error(`Unexpected import: ${name}`);
    },
    process: { env },
    Request,
    Response,
    Buffer,
    URL,
    AbortSignal,
    fetch: fetcher,
  });
  return exports;
}
const valid = {
  name: "Test Person",
  email: "test@example.com",
  service: "Product design",
  message: "A bilingual booking platform for our team.",
  budget: "Let’s discuss",
  locale: "en",
  website: "",
};
function request(body = valid, origin = "https://startease.test") {
  return new Request("https://startease.test/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("rejects foreign origins and malformed JSON before delivery", async () => {
  const { POST } = load("app/api/inquiry/route.ts");
  assert.equal((await POST(request(valid, "https://other.test"))).status, 403);
  assert.equal((await POST(request("{broken"))).status, 400);
  assert.equal((await POST(request("null"))).status, 400);
});
test("validates fields, locale, honeypot, and hard body size", async () => {
  const { POST } = load("app/api/inquiry/route.ts");
  for (const patch of [
    { email: "wrong" },
    { locale: "fr" },
    { name: "  " },
    { message: "short" },
    { website: "spam" },
    { service: "unknown" },
  ]) {
    assert.equal((await POST(request({ ...valid, ...patch }))).status, 400);
  }
  assert.equal((await POST(request("x".repeat(16_385)))).status, 413);
});
test("does not report success when delivery is unconfigured", async () => {
  const { POST } = load("app/api/inquiry/route.ts");
  assert.equal((await POST(request())).status, 503);
});
test("delivers only validated fields and keeps the token server-side", async () => {
  let payload;
  const { POST } = load(
    "app/api/inquiry/route.ts",
    {
      INQUIRY_WEBHOOK_URL: "https://receiver.test",
      INQUIRY_WEBHOOK_TOKEN: "test-token",
    },
    async (url, options) => {
      assert.equal(url, "https://receiver.test");
      assert.equal(options.headers.Authorization, "Bearer test-token");
      assert.equal(options.redirect, "error");
      assert.ok(options.signal);
      payload = JSON.parse(options.body);
      return new Response(null, { status: 204 });
    },
  );
  const response = await POST(request({ ...valid, arbitrary: "discard me" }));
  assert.equal(response.status, 200);
  assert.equal(payload.source, "Startease");
  assert.equal(payload.arbitrary, undefined);
  assert.equal(payload.website, undefined);
  assert.deepEqual(await response.json(), { ok: true });
});
test("supports Persian input and reports upstream errors honestly", async () => {
  const fa = load("lib/content.ts").copy.fa.form;
  const persian = {
    ...valid,
    locale: "fa",
    name: "کاربر آزمایشی",
    message: "برای طراحی یک وب‌سایت دوزبانه همکاری می‌خواهیم.",
    service: fa.choices[0],
    budget: fa.budgets[0],
  };
  for (const fetcher of [
    async () => new Response(null, { status: 500 }),
    async () => {
      throw new Error("Timeout");
    },
  ]) {
    const { POST } = load(
      "app/api/inquiry/route.ts",
      { INQUIRY_WEBHOOK_URL: "https://receiver.test" },
      fetcher,
    );
    assert.equal((await POST(request(persian))).status, 502);
  }
});
