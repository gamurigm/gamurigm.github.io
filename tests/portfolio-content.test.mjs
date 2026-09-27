import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");

test("portfolio uses the premium editorial interaction model", () => {
  assert.match(page, /Trabajo seleccionado\./);
  assert.match(page, /hero-systems\.png/);
  assert.match(page, /aria-expanded=/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /<main/);
  assert.doesNotMatch(page, /window\.addEventListener\("scroll"/);
  assert.doesNotMatch(layout, /fontawesome/i);
});
