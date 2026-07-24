/* Operation Nordstern – Service Worker
   Ziel:
   - Die App laeuft offline (Auto, Faehre, Flugmodus).
   - Wenn Internet da ist, wird IMMER die neueste Version der Seite geladen.
   Strategie:
   - Seite (index.html / Navigation): "network-first" -> online = neueste Version,
     offline = zuletzt gespeicherte Fassung.
   - Uebrige eigene Dateien (Icons, Manifest): "stale-while-revalidate".
   - Die App laedt KEINE fremden Server mehr - alles liegt im Repo. Damit ist der
     Offline-Betrieb komplett unabhaengig von jeder Internet-Verbindung.

   Wichtig: Bei jeder neuen Version unten CACHE hochzaehlen (v1 -> v2 ...),
   damit alte Dateien sicher ersetzt werden.
*/
const CACHE = "nordstern-v4";

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

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // einzeln laden, damit eine einzelne fehlende Datei den Rest nicht sprengt
      Promise.all(EIGEN.map((u) => c.add(u).catch(() => null)))
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
  // Nur eigene Dateien behandeln - die App ruft ohnehin nichts Fremdes mehr auf.
  if (url.origin !== self.location.origin) return;

  // Die eigentliche Seite: network-first -> online stets aktuell
  if (req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) {
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

  // Rest (Icons, Manifest): sofort aus dem Cache, im Hintergrund aktualisieren
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
