// Gop shell.html + docs/lab4/wireframes/screens/*.html thanh mot file self-contained.
// Vi sao can script: mo bang file:// thi fetch() bi CORS chan, nen 32 man phai nam trong
// MOT file. Ma mot file 32 man viet tay thi khong sua noi -> tach partial + gop.
// Chay: node scripts/build-wireframes.mjs

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const WF = path.join(process.cwd(), "docs", "lab4", "wireframes");
const OUT = path.join(WF, "index.html");

// Moi partial mo dau bang: <!-- meta: sc=SC-01 | name=Dang nhap | group=A - Xac thuc | status=built -->
const META = /<!--\s*meta:\s*([^>]*?)\s*-->/;

function parseMeta(html, file) {
  const m = html.match(META);
  if (!m) throw new Error(`${file}: thieu dong <!-- meta: ... -->`);
  const out = {};
  for (const part of m[1].split("|")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  for (const k of ["sc", "name", "group", "status"]) {
    if (!out[k]) throw new Error(`${file}: meta thieu truong "${k}"`);
  }
  return out;
}

const files = (await readdir(path.join(WF, "screens")))
  .filter((f) => f.endsWith(".html"))
  .sort(); // ten file bat dau bang SC-XX nen sort la dung thu tu roster

const screens = [];
for (const f of files) {
  const html = await readFile(path.join(WF, "screens", f), "utf8");
  screens.push({ ...parseMeta(html, f), body: html.replace(META, "").trim(), file: f });
}

// sidebar: nhom theo truong group. Ten nhom mo dau bang chu cai (A, B, ... K) nen sort
// theo ten la dung thu tu mong muon -- khong phu thuoc thu tu SC- xuat hien.
const groups = [];
for (const s of screens) {
  let g = groups.find((x) => x.name === s.group);
  if (!g) groups.push((g = { name: s.group, items: [] }));
  g.items.push(s);
}
groups.sort((a, b) => a.name.localeCompare(b.name, "vi"));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const sidebar = groups
  .map(
    (g) =>
      `    <div class="wf-nav__grp">${esc(g.name)}</div>\n` +
      g.items
        .map(
          (s) =>
            `    <a href="#${s.sc}"${s.status === "todo" ? ' class="is-todo"' : ""}>` +
            `<code>${s.sc}</code><span>${esc(s.name)}</span></a>`
        )
        .join("\n")
  )
  .join("\n");

const shell = await readFile(path.join(WF, "shell.html"), "utf8");
if (!shell.includes("<!--WF_SIDEBAR-->") || !shell.includes("<!--WF_SECTIONS-->")) {
  throw new Error("shell.html thieu moc <!--WF_SIDEBAR--> hoac <!--WF_SECTIONS-->");
}

const banner =
  "<!-- FILE SINH RA TU DONG - DUNG SUA TAY.\n" +
  "     Sua partial trong docs/lab4/wireframes/screens/ roi chay:\n" +
  "       node scripts/build-wireframes.mjs -->\n";

await writeFile(
  OUT,
  banner +
    shell
      .replace("<!--WF_SIDEBAR-->", sidebar)
      .replace("<!--WF_SECTIONS-->", screens.map((s) => s.body).join("\n\n")),
  "utf8"
);

const todo = screens.filter((s) => s.status === "todo").length;
console.log(
  `Da gop ${screens.length} man (${screens.length - todo} da dung, ${todo} chua dung) ` +
    `tu ${groups.length} nhom -> docs/lab4/wireframes/index.html`
);
if (screens.length !== 32) console.warn(`CANH BAO: mong doi 32 man, dem duoc ${screens.length}`);
