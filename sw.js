// Cache do app para rodar offline. Suba a versão quando mudar a lista de arquivos.
var CACHE = 'agente-v17';
var ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Rede primeiro (pega a versão nova do jogo quando houver internet), cache se estiver offline.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      if (r.ok) { var copia = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copia); }); }
      return r;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (r) {
        return r || (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined);
      });
    })
  );
});
