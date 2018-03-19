---
layout: null
---
//lazy script for simplifying the add to cache event, by Tal Alter (www.talalter.com/adderall)
// importScripts('https://cdnjs.cloudflare.com/ajax/libs/cache.adderall/1.0.0/cache.adderall.js');
// cache version - change it with every change in the static files
var CACHE_NAME = 'mark-muthii-v4';
// files that keep changing. Fetched from the network with each sw update
var cacheFiles = [
	'/articles/',
	{% for file in site.static_files %}
		{% if file.path contains '/img' %}
			{% if file.path contains '/assets'%}
			{% else %}
				'{{ file.path }}',
			{% endif %}
		{% endif %}
	{% endfor %}
	'/favicon.ico',
	'/fav.png',
	{% for post in site.posts %}
		'{{ post.url }}',
	{% endfor %}
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/main.css',
  '/assets/vendor/css/prism.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
  'https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic',
  'https://fonts.gstatic.com/s/lora/v12/0QIgMX1D_JOuO7HeNtxumg.woff2',
  '/assets/vendor/jquery/jquery.min.js',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/startbootstrap-clean-blog/js/clean-blog.min.js',
  '/assets/scripts.js',
  '/assets/vendor/js/prism.js',
  '/assets/vendor/js/custom.js',
  '/assets/vendor/startbootstrap-clean-blog/js/jqBootstrapValidation.js',
	'/contact',
	'/'
];

self.addEventListener('install', (event)=>{
	event.waitUntil(
		cache.open(CACHE_NAME).then((cache)=>{
			return cache.addAll(cacheFiles);
		})
	);
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request).then(function(response) {
//         if (response) {
//           return response;
//         } else if (event.request.headers.get('accept').includes('text/html')) {
//           return caches.match('/offline-index.html');
//         }
//       });
//     })
//   );
// });


self.addEventListener('fetch', (event)=>{
  event.respondWith(
    caches.match(event.request)
    .then((response)=>{
      if (response) {
        console.log('[*] Serving cached: ' + event.request.url);
        return response;
      }
      console.log('[*] Fetching: ' + event.request.url);
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event)=>{
	event.waitUntil(
		caches.keys().then((cacheNames)=>{
			return Promise.all(
				cacheNames.map((cacheName)=>{
					if(cacheName !== CACHE_NAME && cacheName.startsWith('mark-muthii')){
        		console.log('[ServiceWorker] Removing Cached Files from Cache - ', cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
