// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: true,
  package: {
    // package.json properties
    name: "lampungify",
    version: Deno.args[0],
    description:
      "A library for Lampung language support, offering text conversion to and from Lampung script and other utilities.",
    license: "MIT",
    keywords: [
      "lampung",
      "aksara",
      "lampung script",
      "lampung language",
      "language",
      "utility",
      "typescript",
    ],
    repository: {
      type: "git",
      url: "git+https://github.com/DedeKurnn/lampungify.git",
    },
    bugs: {
      url: "https://github.com/DedeKurnn/lampungify/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
  importMap: "deno.json",
});
