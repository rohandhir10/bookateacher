import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const form = readFileSync(join(here, "../src/components/RegisterForm.tsx"), "utf8");
const validation = readFileSync(join(here, "../src/lib/validations.ts"), "utf8");

test("registration asks both roles for a required phone number", () => {
  const fieldPosition = form.indexOf('id="reg-phone"');
  const roleSpecificPosition = form.indexOf("{/* Student-specific fields");
  assert.notEqual(fieldPosition, -1, "shared phone input must exist");
  assert.ok(fieldPosition < roleSpecificPosition, "phone input must be outside role-specific sections");
  const input = form.slice(fieldPosition, form.indexOf("/>", fieldPosition));
  assert.match(input, /type="tel"/);
  assert.match(input, /required/);
  assert.match(input, /value=\{formData\.phone\}/);
});

test("registration API rejects missing phone numbers", () => {
  assert.match(validation, /phone:\s*z\.string\(\)\.min\(10,[^\n]+\.max\(20\),/);
});

test("student lead receives the phone number collected at registration", () => {
  assert.match(form, /phone:\s*parsed\.phone/);
});
