/* Operation Nordstern – Service Worker
   Ziel:
   - Die App laeuft offline (Auto, Faehre, Flugmodus).
   - Wenn Internet da ist, wird IMMER die neueste Version der Seite geladen.
   Strategie:
   - Seite (index.html / Navigation): "network-first" -> online = neueste Version,
     offline = zuletzt gespeicherte Fassung.
   - Uebrige eigene Dateien + Firebase-SDK: "stale-while-revalidate".
   - Alles Fremde (Firebase-Datenbank-Verbindungen usw.) wird NICHT angefasst.

   Wichtig: Bei jeder neuen Version unten CACHE hochzaehlen (v1 -> v2 ...),
   damit alte Dateien sicher ersetzt werden.
*/
const CACHE = "nordstern-v2";

const EIGEN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon.png"
];
/* Firebase-SDK: NUR fuer den optionalen Sync. Wird nicht mehr beim Install
   vorgeladen (sonst haengt der Install am Netz) - es wird erst dann gecacht,
   wenn die App es tatsaechlich anfordert. So braucht der Offline-Kern der App
   keinerlei fremde Server. */
const FREMD = [
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-database-compat.js"
];
const VORLADEN = EIGEN;

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // einzeln laden, damit ein fehlendes Fremd-Skript den Rest nicht sprengt
      Promise.all(VORLADEN.map((u) => c.add(u).catch(() => null)))
    )
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const eigen = url.origin === self.location.origin;
  const bekanntesFremd = FREMD.indexOf(req.url) >= 0;

  // Fremde Aufrufe (z. B. die Firebase-Echtzeit-Datenbank) unangetastet lassen
  if (!eigen && !bekanntesFremd) return;

  // Die eigentliche Seite: network-first -> online stets aktuell
  if (req.mode === "navigate" || (eigen && (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")))) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
    return;
  }

  // Rest: sofort aus dem Cache, im Hintergrund aktualisieren
  e.respondWith(
    caches.match(req).then((cached) => {
      const netz = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => cached);
      return cached || netz;
    })
  );
});
