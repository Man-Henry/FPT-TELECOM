const CACHE_NAME = 'fpt-telecom-v5';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/pages/bang-gia.html',
  '/pages/khu-vuc.html',
  '/pages/lien-he.html',
  '/pages/news.html',
  '/pages/chinh-sach.html',
  '/css/styles.css',
  '/js/script.js',
  '/manifest.json',
  '/assets/images/logo.webp',
  '/assets/images/fptfamily.webp',
  '/assets/images/wifi6.webp',
  '/assets/images/modemwifi.webp',
  '/assets/images/boxtv.webp',
  '/assets/images/modemmeta.webp',
  '/assets/images/cameraplay4.webp',
  '/assets/images/cameraiq4s.webp',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Bypass cache for APIs and Webhooks to preserve real-time chat
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/telegram')) return;
  
  if (event.request.method !== 'GET') return;
  
  // HTML, CSS, JS - Network first, fallback to cache
  if (event.request.headers.get('accept').includes('text/html') || 
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Other assets - Cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});
