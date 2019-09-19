var cacheName = "V2";
var cacheAssets = [
    './index.html',
    './about.html',
    './main.js'
];

self.addEventListener('install',e=>{
    console.log("SW: Installed");
    caches.open(cacheName)
    .then(cache=>{
        console.log("SW: Catch files Adding");
        cache.addAll(cacheAssets);
    })
    .then(()=>{self.skipWaiting()});
});

self.addEventListener('activate',e=>{
    console.log("SW: Activated");
    e.waitUntil(
        caches.keys().then( cacheNames=>{
            console.log(cacheNames);
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache !== cacheName){
                        console.log("SW: Clear old cache");
                        return caches.delete(cache);
                    }
                })
            )            
        })
    );
});

self.addEventListener('fetch',e=>{
    console.log("SW: Fetching");
    e.respondWith(fetch(e.request).catch(caches.match(e.request)));
});