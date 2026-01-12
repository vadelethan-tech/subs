const cacheName = 'flashcards-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
];

// Install the service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(filesToCache))
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Intercept fetch requests and serve from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
