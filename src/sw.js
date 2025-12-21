'use strict';

const CACHE_NAME = 'ethno-explorer-v3-20251220';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/bundle.js',
  '/manifest.json'
];

// Runtime cache for audio, images, and data
const RUNTIME_CACHE = 'ethno-runtime-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k.startsWith('ethno-')).map((k) => (k !== CACHE_NAME && k !== RUNTIME_CACHE ? caches.delete(k) : undefined)))).then(
      () => self.clients.claim()
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Network-first for navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return response;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for audio files
  if (request.url.match(/\.(wav|ogg|flac|mp3|m4a|weba|webm)$/i)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Cache-first for images
  if (request.url.match(/\.(png|jpg|jpeg|svg|gif|webp)$/i)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Cache-first for precached assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Cache new GET requests
        if (request.method === 'GET' && response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
