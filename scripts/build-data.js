#!/usr/bin/env node
/**
 * Build script to transpile TypeScript data files to JavaScript.
 * This ensures a single source of truth (src/data/*.ts) while
 * generating the browser-compatible JS files needed at runtime.
 */

import { build } from "esbuild";
import { readdir, mkdir, copyFile, unlink } from "fs/promises";
import { join, basename, extname } from "path";
import { existsSync } from "fs";

const SRC_DIR = "src/data";
const OUT_DIR = "public/data";

async function buildData() {
  console.log("🔨 Building data files from TypeScript source...\n");

  // Ensure output directory exists
  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true });
  }

  // Get all TypeScript files in src/data
  const files = await readdir(SRC_DIR);
  const tsFiles = files.filter((f) => extname(f) === ".ts");

  if (tsFiles.length === 0) {
    console.error("❌ No TypeScript files found in", SRC_DIR);
    process.exit(1);
  }

  console.log(`📁 Found ${tsFiles.length} TypeScript file(s) to build:\n`);

  // Build each file
  for (const file of tsFiles) {
    const entryPoint = join(SRC_DIR, file);
    const outFile = basename(file, ".ts") + ".js";
    const outPath = join(OUT_DIR, outFile);

    try {
      await build({
        entryPoints: [entryPoint],
        bundle: false, // Don't bundle - keep as ES modules
        format: "esm", // ES module output
        platform: "browser", // Browser-compatible
        target: "es2020", // Modern but safe target
        outfile: outPath,
        minify: false, // Keep readable for debugging
        sourcemap: false, // No sourcemaps needed for data files
      });

      console.log(`  ✅ ${file} → ${outFile}`);
    } catch (err) {
      console.error(`  ❌ Failed to build ${file}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\n✨ Data files built successfully!");
  console.log(`   Output: ${OUT_DIR}/\n`);
}

// Run build
buildData().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
