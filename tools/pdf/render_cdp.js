/* Rendert heft.html via Chrome DevTools Protocol zu heft.pdf.
   Echte laufende Fußzeile mit Seitenzahl; eigenes temp. Chrome-Profil. */
const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const DIR = __dirname;                       // tools/pdf/
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; // macOS
const PORT = 9333;
const URL = "file://" + DIR + "/heft.html";
const PROFILE = fs.mkdtempSync(path.join(os.tmpdir(), "nordstern-chrome-")); // temp, wird aufgeräumt

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
    "--disable-extensions", "--disable-background-networking",
    "--user-data-dir=" + PROFILE,
    "--remote-debugging-port=" + PORT, URL
  ], { stdio: "ignore" });

  // auf das Page-Target warten
  let wsUrl = null;
  for (let i = 0; i < 40 && !wsUrl; i++) {
    await sleep(250);
    try {
      const r = await fetch("http://127.0.0.1:" + PORT + "/json");
      const targets = await r.json();
      const page = targets.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) wsUrl = page.webSocketDebuggerUrl;
    } catch (e) { /* Chrome noch nicht bereit */ }
  }
  if (!wsUrl) { console.error("Kein Page-Target gefunden"); chrome.kill(); process.exit(1); }

  const ws = new WebSocket(wsUrl);
  let idc = 0;
  const pending = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });
  const send = (method, params = {}) => new Promise((res) => {
    const id = ++idc; pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });
  await new Promise((res) => ws.addEventListener("open", res));

  await send("Page.enable");
  await sleep(1200); // Fonts/Layout sicher fertig

  const footer = '<div style="font-size:8px;color:#9aa0a8;width:100%;padding:0 13mm;'
    + 'display:flex;justify-content:space-between;letter-spacing:.4px;">'
    + '<span>OPERATION NORDSTERN &middot; Schweden 2026</span>'
    + '<span>Seite <span class="pageNumber"></span></span></div>';

  const resp = await send("Page.printToPDF", {
    landscape: false, printBackground: true, preferCSSPageSize: false,
    paperWidth: 8.27, paperHeight: 11.69,
    marginTop: 0.55, marginBottom: 0.95, marginLeft: 0, marginRight: 0,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate: footer
  });

  const data = resp.result && resp.result.data;
  if (!data) { console.error("printToPDF ohne Daten", JSON.stringify(resp).slice(0, 300)); chrome.kill(); process.exit(1); }
  fs.writeFileSync(DIR + "/heft.pdf", Buffer.from(data, "base64"));
  console.log("PDF geschrieben:", fs.statSync(DIR + "/heft.pdf").size, "Bytes");
  ws.close(); chrome.kill();
  await sleep(300);
  try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) { /* egal */ }
  process.exit(0);
})();
