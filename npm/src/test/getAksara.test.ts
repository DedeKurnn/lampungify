import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "../deps/jsr.io/@std/assert/1.0.6/mod.js";
import { getAksara } from "../src/mod.js";

dntShim.Deno.test("getAksara should return correct aksara for given input", () => {
  const input = "sikam haga mengan";
  const expectedOutput = "sikm/ hg meGA";
  const result = getAksara(input);
  assertEquals(result, expectedOutput);
});

dntShim.Deno.test("getAksara should handle empty input", () => {
  const input = "";
  const expectedOutput = "";
  const result = getAksara(input);
  assertEquals(result, expectedOutput);
});
