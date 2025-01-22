import { assertEquals } from "jsr:@std/assert";
import { getAksara, getLatin } from "../src/mod.ts";

Deno.test("getAksara should return correct aksara for given input", () => {
  const input = "ulay";
  const expectedOutput = "aulI";
  const result = getAksara(input);
  assertEquals(result, expectedOutput);
});

Deno.test("getAksara should handle empty input", () => {
  const input = "";
  const expectedOutput = "";
  const result = getAksara(input);
  assertEquals(result, expectedOutput);
});

Deno.test("should convert aksara string back to latin", () => {
  const input = "sikm/ hg meGA";
  const expectedOutput = "sikam haga mengan";
  const result = getLatin(input);
  assertEquals(result, expectedOutput);
});
