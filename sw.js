// Minimal Service Worker to satisfy PWA requirements
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Pass-through: Just let the browser fetch naturally
  event.respondWith(fetch(event.request));
});
