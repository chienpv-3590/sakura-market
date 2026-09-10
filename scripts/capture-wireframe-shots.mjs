// Chup tung wireframe thanh PNG doc lap + dump toa do DOM chinh xac.
//
// Vi sao can: tkm:generate-ui-specs o che do `image` doi mot file PNG moi lan chay, va doi
// bbox trong "original-image pixel space". Wireframe cua ta la HTML nen thay vi uoc luong
// toa do bang mat tu anh raster, lay thang getBoundingClientRect() -- cung he toa do,
// chinh xac tuyet doi. Anh va so do dung chung mot khung: cung be rong, deviceScaleFactor=1.
//
// Chay: node scripts/capture-wireframe-shots.mjs [SC-11 SC-18 ...]   (khong tham so = ca 32)
// Ra:   .momorph/shots/SC-XX-<slug>.png  va  .momorph/shots/SC-XX-<slug>-dom-boxes.json
//
// Chu y: tranh regex o moi cho co the tranh -- file nay tung bi loi vi tang escape long nhau.

import { readFile, writeFile, readdir, mkdir, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const WF = path.join(process.cwd(), "docs", "lab4", "wireframes");
const OUT = path.join(process.cwd(), ".momorph", "shots");
const TMP = path.join(process.cwd(), ".momorph", ".tmp-shots");
const WIDTH = 1280;

// Selector duoc coi la "component logic" ung vien. Khong dump moi node -- rac.
const SEL = [
  "section.wf-screen", ".wf-screen__hd", "h2", "p.wf-screen__meta", ".wf-tag", ".wf-todo",
  ".wf-box", ".wf-box__t", ".wf-row", ".wf-f", ".wf-f__l", ".wf-f__i", ".wf-f__h",
  ".wf-b", "table.wf-t", "thead", "tbody", "tr", "th", ".wf-scroll",
  ".wf-states", ".wf-state", ".wf-state h4", ".wf-note",
].join(",");

// Script chay trong trang: do bbox moi ung vien roi nhet ket qua vao mot <pre> de --dump-dom doc lai.
const MEASURE = [
  "(() => {",
  "  const out = [];",
  "  const ws = new RegExp(String.fromCharCode(92) + 's+', 'g');",
  "  document.querySelectorAll(" + JSON.stringify(SEL) + ").forEach((el, i) => {",
  "    const r = el.getBoundingClientRect();",
  "    if (r.width < 2 || r.height < 2) return;",
  "    out.push({ i, tag: el.tagName.toLowerCase(), cls: (el.getAttribute('class') || ''),",
  "      startX: Math.round(r.left + scrollX), startY: Math.round(r.top + scrollY),",
  "      endX: Math.round(r.right + scrollX), endY: Math.round(r.bottom + scrollY),",
  "      text: (el.textContent || '').replace(ws, ' ').trim().slice(0, 120) });",
  "  });",
  "  const pre = document.createElement('pre');",
  "  pre.id = '__boxes__';",
  "  pre.textContent = JSON.stringify({ height: document.body.scrollHeight, width: " + WIDTH + ", boxes: out });",
  "  document.body.appendChild(pre);",
  "})();",
].join(" ");

const fileUrl = (p) => "file:///" + p.split(path.sep).join("/");
const chrome = (args) => run(CHROME, args, { maxBuffer: 1 << 28 }).then((r) => r.stdout);

const unesc = (s) =>
  s.split("&quot;").join('"').split("&lt;").join("<").split("&gt;").join(">").split("&amp;").join("&");

function between(hay, open, close) {
  const a = hay.indexOf(open);
  if (a < 0) return null;
  const b = hay.indexOf(close, a + open.length);
  if (b < 0) return null;
  return hay.slice(a + open.length, b);
}

const shell = await readFile(path.join(WF, "shell.html"), "utf8");
const styleInner = between(shell, "<style>", "</style>");
if (!styleInner) throw new Error("shell.html: khong tim thay khoi <style>");
const style = "<style>" + styleInner + "</style>";

const want = process.argv.slice(2);
const files = (await readdir(path.join(WF, "screens")))
  .filter((f) => f.endsWith(".html"))
  .filter((f) => want.length === 0 || want.some((w) => f.startsWith(w + "-")))
  .sort();
if (files.length === 0) throw new Error("Khong khop man nao: " + want.join(" "));

await mkdir(OUT, { recursive: true });
await mkdir(TMP, { recursive: true });

for (const f of files) {
  const raw = await readFile(path.join(WF, "screens", f), "utf8");
  const stem = f.slice(0, -".html".length);

  // bo dong meta, mo section ra (bo `hidden`), khong sidebar
  const afterMeta = raw.indexOf("-->") >= 0 ? raw.slice(raw.indexOf("-->") + 3) : raw;
  const body = afterMeta.split(" hidden>").join(">").trim();

  const page =
    '<!doctype html><html lang="vi"><head><meta charset="utf-8">' + style +
    "<style>body{margin:0;background:var(--g1)}" +
    "#wrap{width:" + WIDTH + "px;padding:22px 26px;box-sizing:border-box}" +
    "#__boxes__{display:none}</style></head><body><div id=\"wrap\">" + body +
    "</div><script>" + MEASURE + "</script></body></html>";

  const tmpHtml = path.join(TMP, stem + ".html");
  await writeFile(tmpHtml, page, "utf8");
  const url = fileUrl(tmpHtml);

  // luot 1: do chieu cao that + toa do moi component
  let dom = "";
  try {
    dom = await chrome([
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=1", "--window-size=" + WIDTH + ",900",
      "--virtual-time-budget=2000",
      "--dump-dom", url,
    ]);
  } catch (e) {
    console.error(stem + ": chrome loi o luot do -- " + e.message.slice(0, 120));
    continue;
  }
  const payload = between(dom, '<pre id="__boxes__">', "</pre>");
  if (!payload) { console.error(stem + ": KHONG do duoc DOM -- bo qua"); continue; }
  const data = JSON.parse(unesc(payload));

  // luot 2: chup dung chieu cao vua do -> anh 1:1 voi he toa do tren
  const png = path.join(OUT, stem + ".png");
  await chrome([
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--window-size=" + WIDTH + "," + data.height,
    "--default-background-color=FFFFFFFF", "--virtual-time-budget=2000",
    "--screenshot=" + png, url,
  ]);

  await writeFile(path.join(OUT, stem + "-dom-boxes.json"), JSON.stringify(data, null, 2), "utf8");
  console.log(stem + ": " + WIDTH + "x" + data.height + ", " + data.boxes.length + " component");
}

await rm(TMP, { recursive: true, force: true });
console.log("Xong " + files.length + " man -> .momorph/shots/");
