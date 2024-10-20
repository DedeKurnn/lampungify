import { assertEquals } from "jsr:@std/assert";
import { getAksara } from "../src/mod.ts";

Deno.test("getAksara should return correct aksara for given input", () => {
  const input = "sikam haga mengan";
  const expectedOutput = "sikm/ hg meGA";
  const result = getAksara(input);
  assertEquals(result, expectedOutput);
});

Deno.test("getAksara should handle empty input", () => {
  const input = "";
  const expectedOutput = "";
  const result = getAksara(input);
  assertEquals(result, expectedOutput);
});
