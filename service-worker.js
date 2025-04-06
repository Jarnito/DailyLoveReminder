"use strict";
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
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ASSETS_TO_CACHE)));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then(response => {
        if (response) {
            return response;
        }
        return fetch(event.request);
    })
        .catch(() => {
        if (event.request.mode === 'navigate') {
            return caches.match('/DailyLoveReminder/index.html')
                .then(response => response || new Response('Offline'));
        }
        return new Response('Offline');
    }));
});
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name)));
    }));
});
