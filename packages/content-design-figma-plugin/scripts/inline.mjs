/**
 * Post-build script: reads Vite's dist/index.html and produces dist/ui.html
 * for Figma's sandboxed plugin iframe.
 *
 * How Figma loads plugin HTML:
 *   A bootstrap data: URL page sets window.onmessage. When triggered, it calls:
 *     document.write(figmaInitScript + figmaStyles + event.data)
 *   …where event.data is our HTML string.  It then leaves window.onmessage set.
 *   Later, plugin messages (figma.ui.postMessage calls from code.ts) also arrive
 *   via the same channel, causing the bootstrap to call document.write() again
 *   with the message object — which triggers a SyntaxError in Chrome because
 *   document.open() is called on an already-written document from an async handler.
 *
 * Fixes applied here:
 *   1. MINIMAL HTML FRAGMENT — no <!doctype>/<html>/<head>/<body> wrapper.
 *      Figma's bootstrap already creates the document skeleton; we just append
 *      a content fragment. A full HTML document wrapped inside document.write
 *      confuses the HTML parser's insertion mode.
 *   2. window.onmessage = null  (injected as the very first JS, synchronously)
 *      Clears the bootstrap handler before any async plugin messages can arrive,
 *      preventing the double document.write that causes the SyntaxError.
 *   3. </script> → <\/script> in all inlined JS (belt-and-suspenders safety net).
 *
 * Development (vite dev) is unaffected — index.html keeps its full HTML structure.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const inputPath = resolve(distDir, 'index.html');
const outputPath = resolve(distDir, 'ui.html');

if (!existsSync(inputPath)) {
  console.error('❌  dist/index.html not found — run `vite build` first');
  process.exit(1);
}

let html = readFileSync(inputPath, 'utf-8');

// ── 1. Collect inlined CSS ────────────────────────────────────────────────────
const cssBlocks = [];
html = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*\/?>/g, (_, href) => {
  const filePath = resolve(distDir, href.replace(/^\//, ''));
  if (!existsSync(filePath)) {
    console.warn(`⚠  Stylesheet not found, skipping: ${href}`);
    return '';
  }
  cssBlocks.push(readFileSync(filePath, 'utf-8'));
  return '';
});

// ── 2. Collect inlined JS ─────────────────────────────────────────────────────
// Escape </script> → <\/script>: prevents the HTML parser from closing our
// <script> tag prematurely if the bundle contains that literal string.
const scriptBlocks = [];
html = html.replace(/<script([^>]*?)src="([^"]+)"([^>]*?)><\/script>/g, (_, _before, src) => {
  const filePath = resolve(distDir, src.replace(/^\//, ''));
  if (!existsSync(filePath)) {
    console.warn(`⚠  Script not found, skipping: ${src}`);
    return '';
  }
  const js = readFileSync(filePath, 'utf-8').replace(/<\/script>/gi, '<\\/script>');
  scriptBlocks.push(js);
  return '';
});

// ── 3. Build preamble ─────────────────────────────────────────────────────────
const PREAMBLE_JS = [
  // ① Immediately clear the bootstrap's onmessage handler.
  //   window.onmessage is set by Figma's bootstrap (the data: URL wrapper) to
  //   perform the initial document.write that loads our HTML. After that first
  //   write completes, our scripts run synchronously — and this null assignment
  //   runs before any async plugin messages can reach the event queue.
  //   Without this, every figma.ui.postMessage() call would re-trigger
  //   document.write("{...object...}") in the bootstrap, wiping our UI.
  `window.onmessage=null;`,

  // ② process shim: safety net for npm packages that reference Node.js globals.
  `(function(){if(typeof globalThis.process==='undefined'){globalThis.process={env:{NODE_ENV:'production'},version:'v18.0.0',platform:'browser',arch:'x64',emit:function(){},on:function(){}};}if(typeof window.process==='undefined')window.process=globalThis.process;})();`,

  // ③ Visible error banner: if any subsequent script throws, show it in-panel
  //   instead of a blank/white screen.
  `window.onerror=function(msg,src,line,col){var b=document.body||document.documentElement;if(!b)return false;b.style.cssText='margin:0;padding:16px;background:#b91c1c;color:#fff;font:13px/1.5 monospace;word-break:break-all;';b.innerHTML='<b>Plugin error</b><br><br>'+String(msg)+'<br><br>'+String(src)+':'+line+':'+col;return false;};`,
  `window.onunhandledrejection=function(e){window.onerror(e.reason&&(e.reason.message||e.reason)||'Unhandled rejection','promise',0,0);};`,
].join('\n');

// ── 4. Assemble MINIMAL HTML fragment ─────────────────────────────────────────
// No <!doctype>, <html>, <head>, or <body> tags.
// Figma's bootstrap document.write provides the document skeleton; we append
// just the content we need: styles → mount point → scripts.
const parts = [];

if (cssBlocks.length > 0) {
  parts.push(`<style>\n${cssBlocks.join('\n')}\n</style>`);
}

parts.push('<div id="root"></div>');
parts.push(`<script>\n${PREAMBLE_JS}\n</script>`);

for (const js of scriptBlocks) {
  parts.push(`<script>\n${js}\n</script>`);
}

const output = parts.join('\n');
writeFileSync(outputPath, output);
const sizeKb = Math.round(readFileSync(outputPath).length / 1024);
console.log(
  `✓  dist/ui.html written (${sizeKb} KB, minimal fragment, onmessage cleared, scripts escaped)`,
);
