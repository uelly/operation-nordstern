# Operation Nordstern — die Reise-Rätsel-App für Fiona & Felix

Eine **einzige Web-App** für die Fahrt nach Schweden (Leipzig → Kiel → Fähre →
Likenäs). Sie läuft im Browser, lässt sich als **App auf den Home-Bildschirm**
legen und funktioniert danach **komplett offline** – im Auto, auf der Fähre, im
Flugmodus, mitten auf dem Meer ohne jeden Empfang.

Die App braucht **kein Internet und keinen Server**. Aller Fortschritt wird
**lokal auf dem iPhone** gespeichert. Fotos landen in eurer **Fotos-App
(Mediathek)**.

---

## Die Dateien in diesem Ordner

| Datei | Wozu |
|-------|------|
| `index.html` | die eigentliche App (alles in einer Datei) |
| `manifest.webmanifest` | macht sie zur „richtigen" App (Name, Icon, Vollbild) |
| `sw.js` | Service Worker – sorgt für Offline-Betrieb + Auto-Update |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | App-Icons |
| `apple-touch-icon.png`, `favicon.png` | Icons für iPhone / Browser-Tab |
| `.nojekyll` | technischer Schalter, damit GitHub alle Dateien 1:1 ausliefert |
| `vault/` | nur Arbeitsmaterial (Obsidian-Notizen) – wird **nicht** von der App geladen |

**Alle App-Dateien müssen zusammen im selben Ordner liegen.** Nicht umbenennen.

---

## Online stellen über GitHub Pages und aufs iPhone bringen

Auf dem iPhone lässt sich eine einzelne HTML-Datei nicht direkt in Safari „zum
Home-Bildschirm" legen – dafür braucht sie eine echte Web-Adresse. Der einfachste
Weg dahin ist GitHub Pages (kostenlos, komplett im Browser, ohne Kommandozeile).

1. Auf <https://github.com> einloggen, oben rechts **+ → New repository**.
2. **Repository name** z. B. `operation-nordstern`, **Public** auswählen
   (Pages ist im kostenlosen Tarif nur für öffentliche Repos gratis).
   *Kein* „Add a README" ankreuzen. Dann **Create repository**.
3. Auf der nächsten Seite **uploading an existing file** anklicken und **alle
   App-Dateien** ins Fenster ziehen (index.html, manifest.webmanifest, sw.js und
   alle Icons). Unten **Commit changes**.
4. Oben im Repo auf **Settings → Pages**. Unter **Build and deployment → Source**
   „Deploy from a branch" wählen, Branch **main**, Ordner **/ (root)**, **Save**.
5. Nach ein bis zwei Minuten erscheint oben die Adresse, etwa
   `https://DEIN-NAME.github.io/operation-nordstern/` – das ist der Link zur App.

**Auf dem iPhone einrichten** (einmalig, mit Internet):

1. Die Adresse in **Safari** öffnen (nicht Chrome – nur Safari kann auf iOS
   „zum Home-Bildschirm").
2. Warten, bis unten die grüne Zeile **„✓ Für offline gesichert"** erscheint.
3. Unten auf **Teilen** → **Zum Home-Bildschirm** → **Hinzufügen**.
4. Ab jetzt liegt „Nordstern" als Icon auf dem Home-Bildschirm, startet im
   Vollbild und **funktioniert ohne Internet**.

> Tipp: Einmal mit Internet öffnen und auf die grüne Zeile warten, bevor ihr in
> den Flugmodus geht. In diesen Sekunden speichert die App sich selbst für offline.

**Aktualisiert sie sich?** Ja. Lädst du eine neue `index.html` ins Repo, ist die
Live-Adresse nach ~1 Minute aktuell. Beim nächsten Öffnen **mit Internet** lädt die
App automatisch die neueste Fassung. Ohne Internet nimmt sie die zuletzt
gespeicherte – so ist sie unterwegs nie „kaputt".

---

## Fotos

Jede Mission hat einen Knopf **„Foto aufnehmen"**. Der öffnet die **Kamera** des
iPhones. Direkt nach der Aufnahme fragt iOS über das Teilen-Menü, ob das Foto
gesichert werden soll – einmal auf **„Bild sichern"** tippen, und es liegt in der
**Fotos-App (Mediathek)**, zusammen mit euren anderen Urlaubsbildern.

In der App selbst bleibt nur eine **kleine Vorschau** als Beleg (und für den
Bericht). Das spart Platz – die echten, hochauflösenden Fotos sind in der
Mediathek. Über **„Nochmal in Fotos"** könnt ihr ein Foto erneut dorthin sichern.

---

## Wird alles gespeichert?

Ja, **automatisch und lokal**. Jede Antwort, jeder gelöste Buchstabe, jede
Uhrzeit und jeder GPS-Punkt wird sofort auf dem Handy gespeichert. Auch etwas, das
ihr nur **angetippt, aber noch nicht abgeschickt** habt, wird als Entwurf gemerkt –
so geht bei einem Wechsel oder App-Neustart nichts verloren.

- **Zurücksetzen (nur für Eltern)** unten in der App leert den Stand dieses Handys.
- Der **„Bericht"-Reiter** exportiert alles als fertige Notiz für Obsidian
  (Kopieren, Teilen oder als `.md`-Datei sichern).

> Falls ein Gerät gar nichts speichern kann (z. B. in einer eingeschränkten
> Dateivorschau statt in Safari), warnt die App oben deutlich. Auf dem Weg über
> GitHub Pages + „Zum Home-Bildschirm" tritt das nicht auf.

---

*Operation Nordstern · Schweden 2026*
