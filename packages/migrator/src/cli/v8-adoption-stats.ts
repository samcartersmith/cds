#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';

import { computeV8AdoptionSync } from '../migrations/update-8-0-0-incremental-jscodeshift/adoption';

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.split('=');
      args[k.replace(/^--/, '')] = v ?? true;
    } else if (!args['_']) {
      args['_'] = a;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  const target = (args._ as string) || process.cwd();
  const abs = path.resolve(target);
  const summary = computeV8AdoptionSync(abs);
  const fmtNum = (n: number) => n.toLocaleString();
  const fmtPct =
    typeof summary.v8MigrationPercent === 'number' && !Number.isNaN(summary.v8MigrationPercent)
      ? `${(summary.v8MigrationPercent * 100).toFixed(2)}%`
      : 'N/A';

  const lines = [
    '',
    '════════════════════════ CDS v8 Adoption ════════════════════════',
    `Target  : ${summary.targetDir}`,
    `CDS Version : ${summary.version || 'unknown'}`,
    '',
    'Counts:',
    `  - CDS Components    : ${fmtNum(summary.cds)}`,
    `  - v7 CDS Components : ${fmtNum(summary.v7Cds)}`,
    `  - Total             : ${fmtNum(summary.total)}`,
    '',
    `v8 Migration %: ${fmtPct}`,
    '══════════════════════════════════════════════════════════════════',
    '',
  ];

  console.log(lines.join('\n'));
}

main();
