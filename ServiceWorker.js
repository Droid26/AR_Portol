const cacheName = "DefaultCompany-AR_Portal-0.1.0";
const contentToCache = [
    "Build/9ed1b391228c81902917cc556cdcead8.loader.js",
    "Build/14cc4c61699a865452bf4b1840a4cbd0.framework.js",
    "Build/16c6ad59433fdc7957d0756983d46fb8.data",
    "Build/f55f0dacc9af29fff3908705d0638eb5.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
