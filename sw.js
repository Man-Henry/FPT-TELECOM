const CACHE_NAME = "fpt-telecom-v38";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/pages/bang-gia.html",
  "/pages/khu-vuc.html",
  "/pages/lien-he.html",
  "/pages/news.html",
  "/pages/chinh-sach.html",
  "/css/styles.min.css",
  "/js/script.min.js",
  "/manifest.json",
  "/favicon.ico",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-512x512.png",
  "/assets/images/main/logo.webp",
  "/assets/images/main/fptfamily-m.webp",
  "/assets/images/main/fptfamily-d.webp",
  "/assets/images/main/wifi6.webp",
  "/assets/images/features/feature_wifi6.webp",
  "/assets/images/features/feature_fptplay.webp",
  "/assets/images/features/feature_nolag.webp",
  "/assets/images/main/modemwifi.webp",
  "/assets/images/main/boxtv.webp",
  "/assets/images/main/modemmeta.webp",
  "/assets/images/main/cameraplay4.webp",
  "/assets/fonts/inter-400-vietnamese.woff2",
  "/assets/fonts/inter-400-latin.woff2",
  "/assets/fonts/inter-600-vietnamese.woff2",
  "/assets/fonts/inter-600-latin.woff2",
  "/assets/fonts/inter-700-vietnamese.woff2",
  "/assets/fonts/inter-700-latin.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Bypass cache for APIs and Webhooks to preserve real-time chat
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/telegram"))
    return;

  if (event.request.method !== "GET") return;

  // HTML, CSS, JS - Network first, fallback to cache
  if (
    event.request.headers.get("accept").includes("text/html") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // Other assets - Cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((response) => {
          const responseClone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
      );
    }),
  );
});
