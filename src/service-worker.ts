/// <reference lib="webworker" />

const CACHE_NAME = 'ily-v1';
const ASSETS_TO_CACHE = [
    '/DailyLoveReminder/',
    '/DailyLoveReminder/index.html',
    '/DailyLoveReminder/styles.css',
    '/DailyLoveReminder/dist/app.js',
    '/DailyLoveReminder/icon-192x192.png',
    '/DailyLoveReminder/icon-512x512.png',
    '/DailyLoveReminder/manifest.json'
];

// Install service worker and cache assets
self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

// Serve cached content when offline
self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(() => {
                // If both cache and network fail, you might want to show an offline page
                if (event.request.mode === 'navigate') {
                    return caches.match('/DailyLoveReminder/index.html')
                        .then(response => response || new Response('Offline'));
                }
                return new Response('Offline');
            })
    );
});

// Clean up old caches when a new version is available
self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});