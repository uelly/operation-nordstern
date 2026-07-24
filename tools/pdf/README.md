# Druckheft-Generator (Operation Nordstern)

Erzeugt `Operation_Nordstern.pdf` – das 10-seitige Druckheft – **direkt aus den
Live-Daten in `index.html`** (Missionen, Foto-Ideen, Knobel-Rätsel). So bleibt
das Heft automatisch mit der App in Sync; nur die Eltern-Lösungen stehen fest im
Generator (sie stehen nur in der Auflösungs-Notiz, nicht im App-Code).

## Erzeugen

```sh
cd tools/pdf
node gen_pdf.js        # liest ../../index.html -> schreibt heft.html
node render_cdp.js     # rendert heft.html -> heft.pdf (via Chrome, DevTools-Protocol)
```

Danach `heft.pdf` prüfen und – falls gewünscht – in den Obsidian-Vault kopieren:

```sh
cp heft.pdf "/Users/uelly/Documents/Obsidian/MM_Vault/Schweden 2026/attachments/Operation_Nordstern.pdf"
```

## Voraussetzungen

- **Node ≥ 18** (getestet mit 22; nutzt globales `fetch` und `WebSocket`).
- **Google Chrome** unter `/Applications/Google Chrome.app` (macOS). Auf anderen
  Systemen den Pfad in `render_cdp.js` (`CHROME`) anpassen.
- Chrome läuft headless mit einem **temporären Profil** (os-Tempordner), das echte
  Chrome-Profil wird nicht angefasst.

## Warum zwei Schritte

`gen_pdf.js` baut nur das HTML (schnell, gut zu prüfen). `render_cdp.js` steuert
Chrome über das DevTools-Protocol, um eine echte laufende Fußzeile mit Seitenzahl
und saubere A4-Ränder zu bekommen (mit reinem CSS in Chrome nicht zuverlässig).

## Layout ändern

Design/CSS steckt in `gen_pdf.js` (Konstante `CSS`), Seitenränder/Fußzeile in
`render_cdp.js` (Aufruf `Page.printToPDF`). `heft.html` und `heft.pdf` sind
Build-Artefakte und per `.gitignore` ausgeschlossen.
