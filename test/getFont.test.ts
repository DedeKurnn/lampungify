import { assertEquals } from "jsr:@std/assert";

import { getFont } from "../src/mod.ts";

Deno.test("getFont returns default font class", () => {
  const result = getFont();
  assertEquals(result, { class: "lampung-kaganga" });
});

Deno.test("getFont returns Lampung Suarnadipa font class", () => {
  const result = getFont("Lampung Suarnadipa");
  assertEquals(result, { class: "lampung-suarnadipa" });
});

Deno.test("getFont returns Lampung Kaganga font class", () => {
  const result = getFont("Lampung Kaganga");
  assertEquals(result, { class: "lampung-kaganga" });
});

Deno.test("getFont returns default font class for unknown font", () => {
  const result = getFont("Unknown Font");
  assertEquals(result, { class: "lampung-suarnadipa" });
});
