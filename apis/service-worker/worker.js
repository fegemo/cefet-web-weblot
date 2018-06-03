const cacheId = 'weblot-123';

const offlinePage = 'offline.html';

const offAssets = ['style.css'];

offAssets.push(offlinePage);

self.addEventListener('install', event => {
    offAssets.forEach(asset => {
        event.waitUntil(
            fetch(asset).then(response => {
                return caches.open(cacheId).then(cache => {
                    return cache.put(asset, response);
                });
            })
        );
    });
});

self.addEventListener('fetch', event => {
    if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request).catch(error => {
                return caches.match(offlinePage);
            })
        );
    }
});
