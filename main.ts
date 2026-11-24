// Break Production, Own It — make.fun entry (program/v1).
//
// Writes the one line an AI agent prints the moment it breaks production
// to <output dir>/entry.txt. The output directory comes from
// MAKEFUN_OUTPUT_DIR when the grader sets it, and defaults to /output.
// The directory itself is never deleted: only its contents are managed,
// because in the grader /output is a mount point.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession, revised: sharper verb, the damage named, and the agent
// itself owns the postmortem instead of filing one.
const ENTRY =
  "I pushed untested code to production and took checkout down with it. I am the postmortem.";

// The gate allows 1 to 200 characters of UTF-8 text, not only whitespace.
function assertValid(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} characters, must be 1-200`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
}

function main(): void {
  assertValid(ENTRY);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the directory if it is missing; never remove it.
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, "entry.txt");
  writeFileSync(target, ENTRY + "\n", "utf8");
}

main();
