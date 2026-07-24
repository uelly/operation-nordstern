/* Erzeugt das Druckheft-HTML fuer Operation Nordstern aus den Live-Daten in
   index.html (Missionen, Foto-Ideen, Knobel-Raetsel). Eltern-Loesungen sind
   unten hart hinterlegt (stehen nur in der Auflösungs-Notiz, nicht im Code). */
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..", "..");   // Repo-Wurzel: tools/pdf/ -> ../../
const html = fs.readFileSync(path.join(REPO, "index.html"), "utf8");

/* ETAPPEN und FINALE aus dem <script> ziehen und auswerten */
const i1 = html.indexOf("const ETAPPEN =");
const i2 = html.indexOf("const FINALE =");
const i3 = html.indexOf("};", i2) + 2;
const code = html.slice(i1, i3);
const { ETAPPEN, FINALE } = new Function(code + "; return {ETAPPEN, FINALE};")();

/* ---- Eltern-Loesungen (aus 13 Nordstern - Aufloesung) ---- */
const LOES = {
  1: [
    "Kilometerstand beim Losfahren (Foto vom Tacho).",
    "Ort beim Erreichen der Zahl mit drei gleichen Endziffern.",
    "A9 – A10 – A24 – A1 – A21",
    "Berlin. Der Berliner Ring ist die A10, westlicher Bogen.",
    "Reststrecke ÷ 100 = Stunden, plus Pausen; mit Karten-App vergleichen.",
    "Foto vom ersten größeren Gewässer.",
    "≥ 6 Kennzeichen nördlich von Leipzig (HH, HL, KI, SN, B, HB, RO …).",
    "Schleswig-Holstein.",
    "Foto mit allen vier Familienmitgliedern.",
    "Wer die Förde bzw. das erste Schiff zuerst sieht.",
    "Foto „Schwedenkai“ oder der Stena Germanica."
  ],
  2: [
    "Foto der Kabinentür, selbst hingefunden.",
    "Foto durchs Kabinenfenster.",
    "Etage 10 — die ersten beiden Ziffern von 10915.",
    "Foto von rechts in Fahrtrichtung, nur Wasser und Himmel.",
    "Uhrzeit laut Crew, auf Englisch erfragt.",
    "Foto der Storebælt-Brücke von unten (65 m Durchfahrtshöhe).",
    "Boote einer Seite × 2 × 150 Plätze; muss über ~1300 Passagieren liegen.",
    "Drei erkennbare Wörter, z. B. Restaurang, Information, Utgång, Hytt, Buffé."
  ],
  3: [
    "Foto vom ersten schwedischen Ortsschild.",
    "Älg — gefragt ist ausdrücklich das schwedische Wort.",
    "Ort beim Erreichen der runden Kilometerzahl.",
    "Vänern.",
    "Foto eines Tiers im Mariebergsskogen.",
    "Foto eines falunroten Holzhauses mit weißen Ecken.",
    "Differenz zweier Entfernungsschilder muss den gefahrenen km entsprechen.",
    "Klarälven — älv heißt Fluss.",
    "Fünf Kennzeichen (drei Buchstaben + drei Zeichen).",
    "Ankunftsfoto vor dem Ferienhaus."
  ]
};
/* Loesungen zu den Knobel-Raetseln (je Etappe, in Reihenfolge) */
const RLOES = {
  1: ["3 Motorräder (4 Autos, 3 Motorräder → 7 Fahrzeuge, 22 Räder).",
      "Räder (Reifen).",
      "18 (18×2 = 36, minus 6 = 30)."],
  2: ["40 (Junge 10, Kapitän 40; in 20 J.: 30 und 60).",
      "Bug.",
      "0 km/h – sie bewegt sich relativ zum Schiff gar nicht."],
  3: ["5 Hasen (5×4 + 3×2 = 26 Beine, 8 Köpfe).",
      "Die (schwedische) Flagge / Fahne.",
      "10 (12 halbiert = 6, plus 4)."]
};

/* ---- Helfer ---- */
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const ROL = {
  fiona: { t: "Fiona<br><span class='rs'>Zahlen</span>", c: "r-fiona" },
  felix: { t: "Felix<br><span class='rs'>Wissen</span>", c: "r-felix" },
  spa:   { t: "Auge", c: "r-spa" },
  team:  { t: "Team", c: "r-team" }
};
function rolle(e, m) {
  if (m.rolle === "chr") return { t: (e.chronist || "Foto") + "<br><span class='rs'>Foto</span>", c: "r-chr" };
  return ROL[m.rolle];
}
function antwortLabel(m) {
  if (m.feld === "tacho") return "Kilometerstand:";
  return m.frage || null;
}

/* ---- Missionskarte ---- */
function missionHtml(e, m) {
  const r = rolle(e, m);
  const lab = antwortLabel(m);
  let body = `<div class="tit">${m.gold ? "★ " : ""}${esc(m.titel)}</div>`;
  body += `<div class="txt">${esc(m.text)}</div>`;
  if (lab) body += `<div class="ans">${esc(lab)} <span class="line"></span></div>`;
  if (m.tipp) body += `<div class="tip">Tipp: ${esc(m.tipp)}</div>`;
  return `<div class="m${m.gold ? " gold" : ""}">
    <div class="num">${m.n}</div>
    <div class="rol ${r.c}">${r.t}</div>
    <div class="bod">${body}</div>
    <div class="chk"><span class="box"></span></div>
    <div class="let">${esc(m.b)}</div>
  </div>`;
}

/* ---- Loesungswort-Raster ---- */
function rasterHtml(e) {
  let cells = "";
  for (let i = 1; i <= e.loesung.length; i++) cells += `<div class="cell"><span>${i}</span></div>`;
  return `<div class="h-gruen">Lösungswort ${e.kurz}</div>
    <p class="hint">Sortiert eure ${e.loesung.length} Buchstaben. ${esc(e.loesungHinweis)}</p>
    <div class="raster">${cells}</div>`;
}

/* ---- Foto-Ideen (2 Spalten) ---- */
function ideenHtml(e) {
  const cells = e.impulse.map((s) => `<div class="idee">□ ${esc(s)}</div>`).join("");
  return `<div class="h-rot">Foto-Ideen für zwischendurch</div>
    <p class="hint">Kein Muss – aber wenn euch langweilig ist, hakt eine davon ab:</p>
    <div class="ideen">${cells}</div>`;
}

/* ---- Knobel-Ecke ---- */
function knobelHtml(e) {
  if (!e.raetsel || !e.raetsel.length) return "";
  const items = e.raetsel.map((r, i) => `
    <div class="kn">
      <div class="kn-f"><b>${i + 1}.</b> ${esc(r.frage)}</div>
      ${r.tipp ? `<div class="tip">Tipp: ${esc(r.tipp)}</div>` : ""}
      <div class="ans">Antwort: <span class="line"></span></div>
    </div>`).join("");
  return `<div class="h-rot" style="background:#7c3230">🧩 Knobel-Ecke</div>
    <p class="hint">Freiwillig – zählen nicht zu den Missionen und geben keinen Buchstaben.</p>
    ${items}`;
}

/* ---- Etappen-Seite ---- */
function etappeHtml(e, idx) {
  let h = `<div class="sec">`;
  h += `<div class="h-blau">${e.kurz} — ${esc(e.titel)}</div>`;
  h += `<p class="info">${esc(e.info)}</p>`;
  h += `<p class="info"><b>Foto-Missionen auf dieser Etappe:</b> ${esc(e.chronist)}</p>`;
  e.missionen.forEach((m) => { h += missionHtml(e, m); });
  h += rasterHtml(e);
  h += ideenHtml(e);
  h += knobelHtml(e);
  h += `</div>`;
  return h;
}

/* ---- Seite 1: Intro ---- */
const intro = `<div class="sec first">
  <div class="cover-bar"></div>
  <div class="titel">OPERATION NORDSTERN</div>
  <div class="untertitel">Das Missionsheft für Fiona &amp; Felix</div>
  <div class="box-gelb">
    <p><b>Eure Mission:</b> Die Fahrt nach Schweden hat <b>drei Etappen</b>. Jede Etappe hat Missionen — keine Fragen zum Ankreuzen, sondern Sachen, die ihr <b>macht</b>: fotografieren, beobachten, rechnen, herausfinden, jemanden ansprechen.</p>
    <p><b>Jede erledigte Mission gibt euch einen Buchstaben.</b> Die Buchstaben einer Etappe sind durcheinander — am Ende müsst ihr sie zu einem <b>Lösungswort</b> sortieren. Erst dann geht es zur nächsten Etappe.</p>
    <p>Habt ihr alle drei Wörter, kommt die <b>letzte Mission</b>. Sie verrät euch, was ihr gewonnen habt — und das ist deutlich mehr als ein Eis.</p>
    <p><b>Neu:</b> Unten auf jeder Etappe gibt es eine <b>Knobel-Ecke</b> mit freiwilligen Rätseln – zum Zeitvertreib, ohne Einfluss auf die Lösungswörter.</p>
  </div>
  <div class="h-blau">Wer macht was</div>
  <table class="tbl">
    <tr><td class="k"><b>Fiona</b><br>Zahlen &amp; Logik</td><td>Alle Missionen mit Rechnen, Zahlen und Knobeln. Fionas Spezialgebiet — hier ist sie dran, auf jeder Etappe.</td></tr>
    <tr><td class="k"><b>Felix</b><br>Wissen &amp; Sprache</td><td>Alle Missionen, bei denen man etwas wissen oder herausfinden muss: Städte, Namen, fremde Wörter. Felix' Spezialgebiet.</td></tr>
    <tr><td class="k"><b>Foto</b></td><td>Die Foto-Missionen wechseln: Etappe 1 Felix, Etappe 2 Fiona, Etappe 3 wieder Felix.</td></tr>
    <tr><td class="k"><b>Auge</b></td><td>Wer zuerst etwas entdeckt, gewinnt. Gilt für beide.</td></tr>
    <tr><td class="k"><b>Team</b></td><td>Zusammen lösen — teils mit den Eltern.</td></tr>
  </table>
  <div class="h-rot">Regeln</div>
  <ul class="regeln">
    <li>Das Handy ist diesmal <b>erlaubt</b> — ihr braucht es für Fotos, Screenshots und die Karten-App.</li>
    <li><b>Aber:</b> Auf der Fähre bleibt der Flugmodus an. Fotos gehen trotzdem.</li>
    <li>Eine Mission ist erst erledigt, wenn ihr den <b>Beweis</b> habt — Foto, Screenshot oder eine Antwort im Heft.</li>
    <li>Die Auflösung auf der letzten Seite ist tabu, solange ihr noch eine Idee habt.</li>
    <li><b>Es gibt auch die App-Version</b> dieses Hefts auf euren Handys. Sie rechnet die Tacho-Marken automatisch aus, schickt Foto-Ideen und hat die Knobel-Ecke zum Eintippen. Papier oder App — beides zählt.</li>
  </ul>
</div>`;

/* ---- Finale-Seite ---- */
const finale = `<div class="sec">
  <div class="h-gold">Das Finale — die letzte Mission</div>
  <p class="hint">Tragt hier eure drei Lösungswörter ein:</p>
  <table class="tbl">
    <tr><td class="k"><b>Etappe 1</b></td><td class="fill"></td></tr>
    <tr><td class="k"><b>Etappe 2</b></td><td class="fill"></td></tr>
    <tr><td class="k"><b>Etappe 3</b></td><td class="fill"></td></tr>
  </table>
  <div class="box-gelb">
    <p><b>Und jetzt der Preis — den müsst ihr euch selbst suchen.</b></p>
    <p>Nehmt den Reiseplan der Eltern und schaut euch die zwei Wochen in Värmland an. An fast jedem Tag steht etwas: Wandern, Bibersafari, Folkrace, Wasserfall, Draisine, Disc-Golf, Schwimmbad.</p>
    <p><b>An genau einem Tag steht nichts Festes.</b> Findet dieses Datum.</p>
    <p>Tipp: ${esc(FINALE.tipp)}</p>
  </div>
  <div class="datum-label">Das gefundene Datum:</div>
  <div class="datum-box"></div>
  <div class="box-gruen">
    <p><b>Wenn das Datum stimmt, gehört euch dieser Tag.</b><br>Ihr bestimmt das komplette Programm: Aufstehzeit, Essen, Ausflug, Abendplan. Die Eltern machen mit. Ohne Diskussion.</p>
  </div>
</div>`;

/* ---- Auflösung (Eltern) ---- */
function loesungTabelle(e) {
  let rows = e.missionen.map((m, i) =>
    `<tr><td>${m.n}</td><td>${esc(m.titel)}</td><td class="b">${esc(m.b)}</td><td>${esc(LOES[e.id][i] || "")}</td></tr>`
  ).join("");
  let rrows = (e.raetsel || []).map((r, i) =>
    `<tr><td>K${i + 1}</td><td>${esc(r.frage.slice(0, 46))}…</td><td class="b">–</td><td>${esc(RLOES[e.id][i] || "")}</td></tr>`
  ).join("");
  return `<div class="loes-block"><h3 class="loes-h">${e.kurz} — ${esc(e.titel)} — Lösungswort ${e.loesung}</h3>
    <table class="loes">
      <tr><th>Nr</th><th>Mission</th><th>B.</th><th>Erwartete Antwort</th></tr>
      ${rows}
      <tr class="kn-h"><td colspan="4">Knobel-Ecke</td></tr>
      ${rrows}
    </table></div>`;
}
const aufloesung = `<div class="sec">
  <div class="h-rot">Nur für Eltern — Auflösung</div>
  <p class="hint">Nicht vorher lesen. Ernsthaft.</p>
  ${ETAPPEN.map(loesungTabelle).join("")}
  <h3 class="loes-h">Finale</h3>
  <p class="info">Freitag, 7. August 2026 — der einzige Tag im Tagesüberblick ohne festes Programm („Puffer“). Preis: Die Kinder bestimmen an diesem Tag das komplette Programm.</p>
</div>`;

/* ---- Gesamtdokument ---- */
const CSS = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html,body{ margin:0; padding:0; -webkit-print-color-adjust:exact; print-color-adjust:exact;
  font-family:'Helvetica Neue',Arial,sans-serif; color:#1d2733; }
.sec{ page-break-before: always; padding: 0 13mm; }
.sec.first{ page-break-before: auto; }
.cover-bar{ height:9mm; background:#004b87; border-bottom:2.5mm solid #fecc02; margin:0 -13mm 8mm; }
.titel{ text-align:center; color:#004b87; font-size:24pt; font-weight:800; margin:0 0 1mm; letter-spacing:1px; }
.untertitel{ text-align:center; color:#2d6a4f; font-weight:700; font-size:12pt; margin:2mm 0 6mm; }
.h-blau,.h-gruen,.h-rot,.h-gold{ color:#fff; padding:6px 12px; font-weight:800; font-size:12.5pt;
  border-radius:4px; margin:10px 0 7px; }
.h-blau{ background:#004b87; } .h-gruen{ background:#2d6a4f; } .h-rot{ background:#9b2226; }
.h-gold{ background:#d9ad00; color:#33290a; }
.box-gelb{ background:#fdf6d0; border-left:4px solid #d9ad00; padding:8px 12px; border-radius:0 6px 6px 0; }
.box-gelb p{ margin:5px 0; font-size:9.5pt; line-height:1.4; }
.box-gruen{ background:#eaf6ee; border-left:4px solid #2d6a4f; padding:8px 12px; border-radius:0 6px 6px 0; margin-top:8mm; }
.box-gruen p{ margin:0; font-size:9.5pt; line-height:1.4; }
.info{ font-size:9.5pt; margin:4px 0; }
.hint{ font-size:8.5pt; color:#6b7280; margin:4px 0 8px; }
.tbl{ width:100%; border-collapse:collapse; margin:4px 0; }
.tbl td{ border:1px solid #e2e5ea; padding:7px 9px; font-size:9pt; vertical-align:top; }
.tbl td.k{ width:150px; background:#f4f6f9; }
.tbl td.fill{ height:22px; }
.regeln{ font-size:9.5pt; line-height:1.5; padding-left:18px; margin:6px 0; }
.regeln li{ margin:3px 0; }
/* Missionskarte */
.loes tr, .tbl tr { page-break-inside: avoid; }
.loes-block { page-break-inside: avoid; margin-bottom: 6px; }
.m{ display:flex; border:1px solid #dfe3ea; border-radius:6px; overflow:hidden; margin:7px 0; page-break-inside:avoid; }
.m.gold{ border-color:#d9ad00; }
.m .num{ width:34px; background:#004b87; color:#fff; font-size:14pt; font-weight:800;
  display:flex; align-items:center; justify-content:center; flex:0 0 auto; }
.m.gold .num{ background:#d9ad00; color:#33290a; }
.m .rol{ width:56px; flex:0 0 auto; display:flex; align-items:center; justify-content:center;
  text-align:center; font-size:7.5pt; font-weight:700; line-height:1.15; padding:2px; }
.m .rol .rs{ font-weight:400; }
.r-fiona{background:#e0e7ff;color:#3730a3}.r-felix{background:#fef3c7;color:#92400e}
.r-chr{background:#fde8d7;color:#9a3412}.r-spa{background:#f3e8ff;color:#6b21a8}.r-team{background:#dcfce7;color:#166534}
.m .bod{ flex:1; padding:7px 10px; }
.m .bod .tit{ font-weight:800; font-size:10.5pt; }
.m .bod .txt{ font-size:8.8pt; margin-top:2px; line-height:1.35; }
.m .bod .ans{ font-weight:700; color:#004b87; font-size:8.8pt; margin-top:6px; }
.m .bod .line{ display:inline-block; border-bottom:1px dotted #9aa0a8; min-width:55%; height:11px; }
.m .bod .tip{ font-style:italic; color:#5a6472; font-size:8pt; margin-top:5px; }
.m .chk{ width:30px; flex:0 0 auto; display:flex; align-items:center; justify-content:center; }
.m .chk .box{ width:12px; height:12px; border:1.4px solid #444; display:block; }
.m .let{ width:40px; flex:0 0 auto; background:#eef4f9; display:flex; align-items:center;
  justify-content:center; font-size:17pt; font-weight:800; }
.m.gold .let{ background:#fff6d6; }
/* Loesungswort-Raster */
.raster{ display:flex; gap:4px; margin:6px 0 2px; flex-wrap:wrap; }
.cell{ width:34px; height:40px; border:1px solid #b9c0cb; border-radius:3px; position:relative; }
.cell span{ position:absolute; top:1px; left:3px; font-size:7pt; color:#9aa0a8; }
/* Foto-Ideen */
.ideen{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.idee{ border:1px solid #e6e1d4; background:#faf8f2; border-radius:4px; padding:5px 8px; font-size:8.6pt; }
/* Knobel */
.kn{ border:1px solid #e6d7d6; border-radius:6px; padding:8px 10px; margin:6px 0; page-break-inside:avoid; }
.kn-f{ font-size:9.5pt; }
.kn .ans{ font-weight:700; color:#7c3230; font-size:8.8pt; margin-top:6px; }
.kn .line{ display:inline-block; border-bottom:1px dotted #9aa0a8; min-width:50%; height:11px; }
.kn .tip{ font-style:italic; color:#5a6472; font-size:8pt; margin-top:4px; }
/* Finale */
.datum-label{ color:#004b87; font-weight:800; font-size:11pt; margin:7mm 0 3mm; }
.datum-box{ border:2px solid #d9ad00; border-radius:6px; height:22mm; }
/* Auflösung */
.loes-h{ color:#004b87; font-size:11pt; margin:9px 0 4px; }
.loes{ width:100%; border-collapse:collapse; margin-bottom:6px; }
.loes th{ background:#f4f6f9; text-align:left; }
.loes th,.loes td{ border:1px solid #e2e5ea; padding:5px 8px; font-size:8.4pt; vertical-align:top; }
.loes td.b{ font-weight:800; text-align:center; width:26px; }
.loes tr.kn-h td{ background:#f6efef; font-weight:700; color:#7c3230; }
`;

const doc = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><style>${CSS}</style></head>
<body>
${intro}
${ETAPPEN.map(etappeHtml).join("")}
${finale}
${aufloesung}
</body></html>`;

const out = path.join(__dirname, "heft.html");
fs.writeFileSync(out, doc, "utf8");
console.log("HTML geschrieben:", out, "(" + doc.length + " Bytes)");
console.log("Etappen:", ETAPPEN.map(e => e.kurz + ":" + e.missionen.length + "M/" + e.raetsel.length + "R").join("  "));
