// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";
import { copy } from "jsr:@std/fs";

await emptyDir("./npm");

await copy("assets/css", "npm/assets/css", { overwrite: true });
await copy("assets/fonts", "npm/assets/fonts", { overwrite: true });

await build({
  entryPoints: ["./src/mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  typeCheck: "both",
  compilerOptions: {
    importHelpers: false,
    sourceMap: true,
    target: "ES2021",
    lib: ["ESNext", "DOM", "DOM.Iterable"],
  },
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
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
  importMap: "deno.json",
});
