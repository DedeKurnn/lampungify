import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "../deps/jsr.io/@std/assert/1.0.6/mod.js";

import { getFont } from "../src/mod.js";

dntShim.Deno.test("getFont returns default font class", () => {
  const result = getFont();
  assertEquals(result, { class: "lampung-suarnadipa" });
});

dntShim.Deno.test("getFont returns Lampung Suarnadipa font class", () => {
  const result = getFont("Lampung Suarnadipa");
  assertEquals(result, { class: "lampung-suarnadipa" });
});

dntShim.Deno.test("getFont returns Lampung Kaganga font class", () => {
  const result = getFont("Lampung Kaganga");
  assertEquals(result, { class: "lampung-kaganga" });
});

dntShim.Deno.test("getFont returns default font class for unknown font", () => {
  const result = getFont("Unknown Font");
  assertEquals(result, { class: "lampung-suarnadipa" });
});
