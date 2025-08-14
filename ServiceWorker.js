const cacheName = "DefaultCompany-AR_Portal-0.1.0";
const contentToCache = [
    "Build/832fbbe5067ace7bf39b905416384f50.loader.js",
    "Build/14cc4c61699a865452bf4b1840a4cbd0.framework.js",
    "Build/1714b2bdb4214ac9a90b5107ade896f1.data",
    "Build/4ceb7de9634d7369c05eca5bf9acbd26.wasm",
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
