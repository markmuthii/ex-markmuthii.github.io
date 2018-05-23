---
layout: null
---
//lazy script for simplifying the add to cache event, by Tal Alter (www.talalter.com/adderall)
// importScripts("https://cdnjs.cloudflare.com/ajax/libs/cache.adderall/1.0.0/cache.adderall.js");
// cache version - change it with every change in the static files
var CACHE_NAME = "mark-muthii-v1";
// files that keep changing. Fetched from the network with each sw update
var cacheFiles = [
	"/articles/",
	"/favicon.ico",
	{% for post in site.posts limit : 3 %}
		"{{ post.url }}",
	{% endfor %}
  "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "assets/vendor/js/main.min.js",
  "assets/vendor/js/post.min.js",
  "/assets/vendor/material-kit/js/jqBootstrapValidation.js",
	"/contact",
	"/"
];

self.addEventListener("install", (event)=>{
	// self.skipWaiting();
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache)=>{
			return cache.addAll(cacheFiles);
		})
	)
});

self.addEventListener("fetch", (event)=>{
  event.respondWith(
    caches.match(event.request)
    .then((response)=>{
      if (response) {
        console.log("[*] Serving cached: " + event.request.url);
        return response;
      }
      console.log("[*] Fetching: " + event.request.url);
      return fetch(event.request);
    })
  )
});

self.addEventListener("activate", (event)=>{
	event.waitUntil(
		caches.keys().then((cacheNames)=>{
			return Promise.all(
				cacheNames.map((cacheName)=>{
					if(cacheName !== CACHE_NAME && cacheName.startsWith("mark-muthii")){
        		console.log("[ServiceWorker] Removing Cached Files from Cache - ", cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	)
});
