---
title: Operation Nordstern
erstellt: 2026-07-24
tags: [schweden-2026, reise, kinder, raetsel, typ/notiz, status/offen, bereich/privat, thema/urlaub]
reise: Schweden 2026
---

# ⭐ Operation Nordstern — das Fahrt-Missionsspiel

⬅️ zurück zur [[00 Schweden 2026 - Uebersicht|Übersicht]]

**29 Missionen** über die drei Etappen der Hinfahrt für **Fiona (12)** und **Felix (10)**.
Keine Wissensfragen zum Ankreuzen — Sachen, die man unterwegs **tut**: fotografieren,
rechnen, beobachten, in der Karten-App nachschauen, die Crew ansprechen.

> [!tip] Der Unterschied zur [[11 Kinder - Raetsel und Spiel|harten Nuss]]
> Das alte Rätsel war reines Kopfrechnen mit Morse, Caesar und Vigenère — und Handyverbot.
> Hier ist das Handy **Werkzeug statt Feindbild**, und jede Mission verlangt eine Handlung
> statt einer Antwort. Beide Hefte existieren parallel; ihr könnt frei wählen.

## 📦 Was dazugehört

| Datei                                  | Zweck                                             |
| -------------------------------------- | ------------------------------------------------- |
| [[Operation_Nordstern.html]]           | **Handy-App** — offline, für beide Kinder         |
| [[Operation_Nordstern.pdf]]            | **Druckheft**, 10 Seiten — Backup bei leerem Akku |
| [[13 Nordstern - Aufloesung (Eltern)]] | Alle Lösungen (Spoiler)                           |

## 🎭 Die Rollen — auf die Kinder zugeschnitten

Fiona und Felix haben **feste Spezialgebiete**, die sich über alle drei Etappen durchziehen.
Sie wechseln bewusst *nicht*, damit jeder dauerhaft in seiner Stärke arbeitet:

| Rolle | Wer | Was |
|-------|-----|-----|
| 🧮 **Zahlen & Logik** | **Fiona** immer | Tacho-Marken, Ankunftszeit ausrechnen, Kabinennummer knacken, Rettungsboote hochrechnen, Schilder gegen den Tacho prüfen |
| 📚 **Wissen & Sprache** | **Felix** immer | Städte und ihre Lage, Bundesland, schwedische Wörter entziffern, See- und Flussnamen, die englische Frage an die Crew |
| 📸 **Foto** | wechselt | Etappe 1 Felix · Etappe 2 Fiona · Etappe 3 Felix |
| 👀 **Auge** | beide | Wer zuerst etwas entdeckt |
| 👥 **Team** | beide | gemeinsam, teils mit den Eltern |

Verteilung pro Etappe: je 2 Fiona-, 2 Felix- und 2 Foto-Missionen, Rest Team und Auge.

## 🎯 Spielprinzip

1. Jede erledigte Mission gibt **einen Buchstaben** — durcheinander.
2. Am Etappenende die Buchstaben zum **Lösungswort sortieren** (Anagramm).
3. Erst dann öffnet sich die nächste Etappe.
4. Nach allen drei Wörtern kommt das **Finale**.

| Etappe | Strecke | Missionen | Lösungswort |
|--------|---------|-----------|-------------|
| 1 | Leipzig → Kiel (~480 km) | 11 | `SCHWEDENKAI` |
| 2 | Fähre Stena Germanica, Kabine 10915 | 8 | `BULLAUGE` |
| 3 | Göteborg → Karlstad → Likenäs (~350 km) | 10 | `FERIENHAUS` |

Die Buchstaben gehen **exakt auf** — kein überzähliger, kein fehlender.

> [!warning] Beim Ändern von Missionen aufpassen
> Kein Text im Heft darf die Antwort einer anderen Mission verraten. Genau das war im ersten
> Entwurf kaputt: Die Etappen-Überschrift nannte die fünf Autobahnnummern, nach denen
> Mission 3 fragt, und das Wort *Klarälven* stand über Mission 8. Das PDF-Skript prüft das
> jetzt selbst und bricht ab, wenn ein Tabu-Wort auftaucht.

## 🏆 Der Preis — und warum er sich selbst versteckt

Das Finale ist **keine Geheimschrift**, sondern eine Suchaufgabe:

> „Sucht im Reiseplan den einen Tag, an dem nichts geplant ist."

Antwort: **Freitag, 07.08.2026** — im [[02 Tagesueberblick|Tagesüberblick]] der einzige Tag
nur mit „Puffer". Genau dieser Tag ist der Gewinn: **Die Kinder bestimmen das komplette
Programm** — Aufstehzeit, Essen, Ausflug, Abendplan.

> [!info] Warum dieser Tag
> Er kostet kein geplantes Programm, liegt spät genug für Vorfreude und früh genug, dass
> noch Urlaub danach kommt. Und die Kinder finden ihre Belohnung selbst im Plan,
> statt sie überreicht zu bekommen.

## 📱 Die App aufs Handy bekommen

Eine einzige Datei, **null externe Verbindungen** (geprüft). Sie läuft im Browser und
speichert den Fortschritt lokal.

Auf dem iPhone lässt sich eine App nur dann **„zum Home-Bildschirm“** legen und
danach offline aus einem Icon starten, wenn sie über eine echte **Web-Adresse (https)**
kommt — nicht als AirDrop-Datei. Auch der **Offline-Cache** (Service Worker) braucht https.
Deshalb der Weg über **GitHub Pages** (kostenlos, einmalig):

| # | Wo | Was |
|---|-----|-----|
| 1 | **PC/Mac** | Alle App-Dateien in ein **öffentliches** GitHub-Repo laden (index.html, sw.js, manifest.webmanifest, Icons, .nojekyll). |
| 2 | **GitHub** | Settings → **Pages** → Deploy from branch `main`, Ordner `/ (root)`. Nach ~1 Min. gibt es die Adresse `https://…github.io/operation-nordstern/`. |
| 3 | **iPhone (Safari)** | Adresse öffnen, auf die grüne Zeile **„✓ Für offline gesichert“** warten. |
| 4 | **iPhone** | **Teilen → Zum Home-Bildschirm → Hinzufügen.** Fertig — Icon startet im Vollbild und läuft offline. |

> [!tip] Vor dem Flugmodus testen
> Einmal mit Internet öffnen, auf die grüne Zeile warten, App komplett schließen, Flugmodus
> an, aus dem Icon neu starten: läuft alles → passt. Zur Sicherheit eine Mission abhaken →
> schließen → neu öffnen → Haken noch da? Dann speichert das Gerät zuverlässig.

> [!note] Aktualisieren
> Neue `index.html` ins Repo laden → beim nächsten Öffnen **mit Internet** holt die App
> automatisch die neueste Fassung. Ohne Internet nimmt sie die zuletzt gespeicherte — so
> ist sie unterwegs nie „kaputt“.

> [!note] Fallback ohne GitHub
> Weil die Datei komplett eigenständig ist, kann man sie zur Not auch per **AirDrop** aufs
> iPhone geben und in Safari öffnen. Dann fehlen aber **„Zum Home-Bildschirm“** und
> der **Offline-Cache** (Service Worker läuft nur über https) — für die Reise ist der
> GitHub-Pages-Weg deshalb der empfohlene. (Die Fotos-Auswahl funktioniert auch so.)

> [!warning] Falls ein Gerät nichts speichert
> Öffnet man die Datei nur in der **Dateivorschau** der Dateien-App statt in Safari, kann
> iOS das Speichern blockieren. Die App **erkennt das selbst** und zeigt oben eine rote
> Warnung; die Buchstaben gehören dann zusätzlich ins gedruckte Heft. Über GitHub Pages +
> „Zum Home-Bildschirm“ tritt das nicht auf.

### Was die App zusätzlich kann
- **Tacho-Rechner:** Kilometerstand eintippen → nächste Dreier-Marke, runde Marke, Palindrom.
- **Foto-Erinnerungen:** Alle 12 Minuten eine neue Idee, 33 insgesamt, passend zur Etappe.
- **Streckenmarken:** antippen, wo man gerade ist.
- **Etappensperre:** Etappe 2 und 3 öffnen erst mit dem richtigen Lösungswort.
- **Fast-richtig-Hinweise:** Wer bei „Wie heißt das Tier auf Schwedisch?" *Elch* eintippt,
  bekommt „Richtig erkannt — aber wir wollen das schwedische Wort dafür!" statt nur „falsch".
- **Zeitstempel:** Jede erledigte Mission bekommt automatisch Datum und Uhrzeit.
- **Foto-Beleg:** pro Mission ein Bild aus der Mediathek als Beleg anhängen → siehe unten.
- **Standort merken** (optional, pro Mission ein Knopf) → siehe unten.
- **Bericht & Export** → siehe unten.
- **Zurücksetzen** für Eltern ganz unten (zweimal tippen zur Bestätigung).

## 📍 Standort — funktioniert ohne Internet

Jede erledigte Mission hat einen Knopf **„Ort merken"**. Er nutzt das **GPS des Handys**,
nicht das Internet — läuft also auch auf der Fähre im Flugmodus und in Schweden ohne Roaming.
Beim ersten Mal fragt das Handy um Erlaubnis.

Damit beantwortet sich die Frage „Wo hat unser Auto die 2222er-Marke geknackt?" von selbst —
ohne Screenshot-Gefummel. Die Koordinaten landen im Export als anklickbarer Kartenlink.

## 📷 Kamera — Foto aus der Mediathek anhängen

Die Kinder fotografieren mit der **normalen Kamera-App** (die Bilder landen dabei
automatisch in der Mediathek). In der Mission hängen sie dann ein Bild **aus der
Mediathek** als Beleg an:

1. Knopf **„Foto hinzufügen“** → iOS zeigt **Fotomediathek / Foto aufnehmen / Datei**.
2. **Fotomediathek** wählen → das passende Bild antippen.
3. In der Mission bleibt eine **scharfe Vorschau** (bis 1280 px) als Beleg stehen, mit den
   Knöpfen **Anderes Bild** und **Weg**.

> [!info] Warum dieser Weg
> Eine Webseite darf auf iOS **nicht von sich aus** in die Fotomediathek schreiben — ein
> Bild von dort **auswählen** aber problemlos. Deshalb fotografieren die Kinder mit der
> Kamera-App (Foto ist damit in der Mediathek) und wählen es hier nur aus. Kein
> Teilen-Menü, kein Kurzbefehl, keine Einrichtung pro iPhone — und es läuft auch aus einer
> lokalen Datei, nicht nur über https.

> [!note] Speicherplatz
> Die Vorschau-Belege liegen in einer **eigenen Datenbank** (IndexedDB), komplett getrennt
> vom Spielstand und mit viel mehr Platz als früher — deshalb dürfen die Vorschauen jetzt
> scharf sein (1280 px statt 420). Läuft der Platz doch voll, geht nur die Vorschau verloren
> — **der Spielstand bleibt immer sicher** (getestet), und das echte Foto ist ohnehin in
> der Mediathek.

## 📤 Bericht & Export — der Rückweg in den Vault

Der Reiter **„Bericht"** in der App erzeugt aus allem, was unterwegs eingetippt wurde,
eine **fertige Obsidian-Notiz**: mit Frontmatter, Tags, Wiki-Links zurück auf diese Notiz,
einer Tabelle je Etappe (Mission · wer · Antwort · Uhrzeit · Kartenlink) und den drei
Lösungswörtern.

Drei Wege, ihn vom Kinderhandy zu bekommen:

| Knopf | Was passiert |
|-------|--------------|
| **Kopieren** | Text in die Zwischenablage → in einen Chat an dich schicken |
| **Teilen** | iOS/Android-Teilen-Menü (AirDrop, Mail, Messenger) — der bequemste Weg |
| **Als Datei** | speichert `Operation_Nordstern_Bericht.md` in den Downloads |

Klappt keiner davon: Ins Textfeld tippen, es markiert sich komplett, von Hand kopieren.

**Danach im Vault:** Text als neue Notiz `14 Nordstern - Reisebericht.md` in diesen Ordner
speichern. Die Wiki-Links greifen dann automatisch.

> [!tip] Das ist der eigentliche Gewinn für später
> Am Ende steht ein Reisetagebuch der Fahrt, das die Kinder selbst geschrieben haben —
> mit Uhrzeiten, Orten und ihren eigenen Antworten. Sowas schreibt hinterher nie jemand
> freiwillig auf.

## ✅ Vor der Abfahrt

- [ ] App über **GitHub Pages** online stellen (Anleitung oben) und die Adresse notieren
- [ ] Auf **beiden** iPhones in **Safari** öffnen → auf **„✓ Für offline gesichert“**
      warten → **Zum Home-Bildschirm** hinzufügen
- [ ] Offline-Test je Handy: Flugmodus an, App aus dem Icon starten, Mission abhaken,
      schließen, neu öffnen — Haken noch da?
- [ ] `Operation_Nordstern.pdf` **zweimal ausdrucken** (ein Heft pro Kind)
- [ ] Letzte Seite (Auflösung) abtrennen und einstecken
- [ ] Zwei Stifte ins Auto legen
- [ ] Powerbank einpacken → steht schon auf der Packliste in [[10 Praktische Infos]]
- [ ] Kilometerstand beim Losfahren notieren (Mission 1)
- [ ] Beim ersten „Ort merken“ die **Standortfreigabe** auf beiden Handys erlauben
- [ ] Einmal „Foto hinzufügen“ testen → ein Bild aus der **Mediathek** auswählen

## 📌 Nach der Reise

- [ ] Bericht aus der App exportieren → als `14 Nordstern - Reisebericht.md` in diesen Ordner
- [ ] Notiz hier verlinken und den Status dieser Notiz auf `status/erledigt` setzen

## 🔗 Verknüpfungen

- [[00 Schweden 2026 - Uebersicht]] — Reise-Übersicht
- [[02 Tagesueberblick]] — enthält den Puffertag 07.08., die Lösung des Finales
- [[03 Anreise und Fahrten]] — Strecken und Zeiten, Grundlage der Missionen
- [[01 Buchungen]] — Kabinennummer 10915, Schiffsnamen, Zeiten
- [[11 Kinder - Raetsel und Spiel]] — das ältere, härtere Rätsel
- [[13 Nordstern - Aufloesung (Eltern)]] — Lösungen
