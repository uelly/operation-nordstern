# Operation Nordstern — als Web-App online stellen

Das ist die Reise-Rätsel-App für Fiona & Felix. Sie ist **eine einzige Web-App**, die
im Browser läuft, sich als **App auf den Home-Bildschirm** legen lässt und danach
**komplett offline** funktioniert (Auto, Fähre, Flugmodus).

Diese Anleitung hat zwei Teile:

- **Teil A** – online stellen über GitHub Pages (nötig, ~10 Minuten).
- **Teil B** – geräteübergreifender Sync über Firebase (optional, ~10 Minuten).

Ohne Teil B läuft die App trotzdem voll – der Fortschritt wird dann nur **auf dem
jeweiligen Handy** gespeichert (plus der eingebaute Obsidian-Export im Reiter „Bericht").

---

## Die Dateien in diesem Ordner

| Datei | Wozu |
|-------|------|
| `index.html` | die eigentliche App |
| `manifest.webmanifest` | macht sie zur „richtigen" App (Name, Icon, Vollbild) |
| `sw.js` | Service Worker – sorgt für Offline-Betrieb + Auto-Update |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | App-Icons |
| `apple-touch-icon.png`, `favicon.png` | Icons für iPhone / Browser-Tab |
| `.nojekyll` | technischer Schalter, damit GitHub alle Dateien 1:1 ausliefert |

**Alle Dateien müssen zusammen im selben Ordner liegen.** Nicht umbenennen.

---

## Teil A — Online stellen über GitHub Pages

Am einfachsten komplett im Browser, ohne Kommandozeile.

1. Auf <https://github.com> einloggen, oben rechts **+ → New repository**.
2. **Repository name** z. B. `operation-nordstern`. **Public** auswählen
   (Pages ist im kostenlosen Tarif nur für öffentliche Repos gratis).
   *Kein* „Add a README" ankreuzen. Dann **Create repository**.
3. Auf der nächsten Seite: **uploading an existing file** anklicken.
   Jetzt **alle Dateien aus diesem Ordner** ins Fenster ziehen
   (index.html, manifest.webmanifest, sw.js und alle Icons – am besten alle
   auf einmal markieren und reinziehen). Unten **Commit changes**.
4. Oben im Repo auf **Settings → Pages**.
   Unter **Build and deployment → Source** „Deploy from a branch" wählen,
   Branch **main**, Ordner **/ (root)**, **Save**.
5. Nach ein bis zwei Minuten erscheint oben auf der Pages-Seite die Adresse, etwa:
   `https://DEIN-NAME.github.io/operation-nordstern/`
   Das ist der Link zur App.

**Auf dem iPhone einrichten** (einmalig, mit Internet):

1. Die Adresse in **Safari** öffnen (nicht Chrome – nur Safari kann auf iOS
   „zum Home-Bildschirm").
2. Unten auf **Teilen** → **Zum Home-Bildschirm** → **Hinzufügen**.
3. Ab jetzt liegt „Nordstern" als Icon auf dem Home-Bildschirm, startet im
   Vollbild und **funktioniert ohne Internet**.

> Tipp: Einmal mit Internet öffnen und ein paar Sekunden warten, bevor ihr in den
> Flugmodus geht. In diesen Sekunden speichert die App sich selbst für offline.

**Aktualisiert sie sich?** Ja. Wenn du im Repo eine neue `index.html` hochlädst,
ist die Live-Adresse nach ~1 Minute aktuell. Beim nächsten Öffnen **mit Internet**
lädt die App automatisch die neueste Fassung. Ohne Internet nimmt sie die zuletzt
gespeicherte – so ist sie unterwegs nie „kaputt".

---

## Teil B — Sync über mehrere Handys (optional)

Damit Fiona und Felix auf **zwei Handys denselben Fortschritt** sehen, braucht es
einen kleinen kostenlosen Datenspeicher. GitHub Pages allein kann das nicht (es
liefert nur Dateien aus, speichert aber nichts). Wir nehmen **Firebase** (Google).

1. Auf <https://console.firebase.google.com> mit dem Google-Konto einloggen,
   **Projekt hinzufügen**, Name z. B. `nordstern`. Google Analytics kannst du
   **abwählen**. **Projekt erstellen**.
2. Links im Menü **Build → Realtime Database** → **Datenbank erstellen**.
   Standort Europa (z. B. `europe-west1`). Beim Sicherheitsmodus zunächst
   **Testmodus** wählen (Regeln stellen wir gleich richtig).
3. **Web-App anlegen:** oben auf das Zahnrad **⚙ → Projekteinstellungen →**
   Reiter **Allgemein**, ganz unten **Deine Apps → Web (`</>`)**. Namen vergeben,
   registrieren. Firebase zeigt dir dann einen Block `const firebaseConfig = { … }`.
4. **Werte übertragen:** Öffne `index.html`, suche oben im Skript nach
   `const FIREBASE_CONFIG` und trage die Werte ein:

   ```js
   const FIREBASE_CONFIG = {
     apiKey: "AIza…",                 // aus der Firebase-Konsole
     authDomain: "nordstern.firebaseapp.com",
     databaseURL: "https://nordstern-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "nordstern"
   };
   ```

   Wichtig ist vor allem, dass `databaseURL` gesetzt ist – die zeigt die Konsole
   bei „Realtime Database" oben an.
5. **Sicherheitsregeln** setzen (Realtime Database → Reiter **Regeln**), damit nicht
   der ganze Speicher offensteht:

   ```json
   {
     "rules": {
       "reisen": {
         "$code": {
           ".read": true,
           ".write": true,
           ".validate": "$code.length >= 6"
         }
       }
     }
   }
   ```

   Das begrenzt Zugriffe auf einen Reise-Code mit mindestens 6 Zeichen.
   **Nehmt einen nicht offensichtlichen Code** (z. B. `NORDSTERN2026XZ`) – wer ihn
   nicht kennt, kommt an eure Daten nicht heran. Nach dem Urlaub könnt ihr die
   Regeln auf `".read": false, ".write": false` stellen oder die Daten löschen.
6. Die **geänderte `index.html` erneut zu GitHub hochladen** (Repo → index.html →
   Stift-Symbol → Datei ersetzen, oder einfach neu hochladen und commiten).
7. Auf **jedem** Handy die App öffnen, oben im Kasten **„Sync über mehrere Handys"**
   **denselben Reise-Code** eintippen → **Verbinden**. Fertig: Was das eine Handy
   löst, erscheint auf dem anderen (sobald Internet da ist).

### Gut zu wissen

- **Offline sammeln, online abgleichen:** Unterwegs ohne Netz sammelt jedes Handy
  für sich. Sobald wieder Internet da ist, führt die App beide Stände zusammen –
  **Erledigtes geht dabei nie verloren** (die Stände werden vereinigt, nicht
  überschrieben).
- **Fotos werden nicht synchronisiert.** Die Beleg-Fotos bleiben bewusst nur lokal
  auf dem jeweiligen Handy (sonst wäre der Speicher schnell voll). Über „In Fotos
  sichern" landen sie in der Mediathek. Synchronisiert werden nur Fortschritt,
  Antworten, Uhrzeiten und die GPS-Punkte.
- **Zurücksetzen (nur für Eltern)** unten in der App leert nur das lokale Handy.
- Wollt ihr **keinen** Sync: Teil B einfach weglassen. Die App läuft komplett und
  speichert lokal; der „Bericht"-Reiter exportiert alles als Notiz für Obsidian.

---

*Operation Nordstern · Schweden 2026*
