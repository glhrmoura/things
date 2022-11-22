const cacheVersion = 1;
const cacheName = `things_v${cacheVersion}`;

self.addEventListener('install', async event => {
  const deleteOldCaches = async () => {
    const cacheKeys = await caches.keys();

    cacheKeys
      .filter(cacheKey => cacheKey !== cacheName)
      .forEach(cacheKey => caches.delete(cacheKey));
  };

  const preCache = async () => {
    const cache = await caches.open(cacheName);
    const assets = await fetch('/asset-manifest.json')
      .then(res => res.json())
      .then(json => Object.values(json));

    await cache.addAll(assets);
  };

  event.waitUntil(deleteOldCaches());
  event.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
  const cacheAndResponse = async () => {
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
      return cacheResponse;
    }

    if (event.request.method === 'GET') {
      const cache = await caches.open(cacheName);
      cache.add(event.request).catch(() => new Response());
    }

    return fetch(event.request).catch(() => new Response());
  };

  event.respondWith(cacheAndResponse());
});
