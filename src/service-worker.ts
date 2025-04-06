/// <reference lib="webworker" />

const CACHE_NAME = 'ily-v1';
const urlsToCache: string[] = [
    '/ily/',
    '/ily/index.html',
    '/ily/styles.css',
    '/ily/dist/app.js',
    '/ily/icon-192x192.png',
    '/ily/icon-512x512.png',
    '/ily/manifest.json',
];

(self as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

(self as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If we have a cached response, return it
                if (response) {
                    return response;
                }
                
                // Otherwise, fetch from network
                return fetch(event.request)
                    .then(networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }

                        // Clone the response before caching
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    });
            })
    );
});