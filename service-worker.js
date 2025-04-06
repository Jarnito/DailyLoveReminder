"use strict";
const CACHE_NAME = 'ily-v1';
const urlsToCache = [
    './',
    'index.html',
    'styles.css',
    'dist/app.js',
    'icon-192x192.png',
    'icon-512x512.png',
    'manifest.json',
];
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then(response => {
        if (response) {
            return response;
        }
        return fetch(event.request)
            .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
                .then(cache => {
                cache.put(event.request, responseToCache);
            });
            return networkResponse;
        });
    }));
});
