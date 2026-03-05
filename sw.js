const CACHE_NAME = 'tenora-shell-v2';
const ASSETS_TO_CACHE = [
  './',              // Caches the index.html
  './index.html',
  './manifest.json',
  './Tenora Icon.jpg' // Your specific logo file
];

// 1. INSTALL: Save the App Shell to the device
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Tenora: Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Clean up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. FETCH: Serve from Cache first, then Network
self.addEventListener('fetch', (event) => {
  // We only cache the GitHub static assets, NOT the Google Script URL
  if (event.request.url.includes('script.google.com')) {
    return; // Let Google handle its own loading
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
