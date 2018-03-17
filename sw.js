---
layout: null
---

const CACHE_NAME = 'mark-muthii-cache-v4.2';

var cacheFiles = [

  // Stylesheets
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/main.css',
  '/assets/vendor/css/prism.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',

  // JS Files
  '/assets/vendor/jquery/jquery.min.js',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/startbootstrap-clean-blog/js/clean-blog.min.js',
  '/assets/scripts.js',
  '/assets/vendor/js/prism.js',
  '/assets/vendor/js/custom.js',
  '/assets/vendor/startbootstrap-clean-blog/js/jqBootstrapValidation.js',

  // Images
  {% for file in site.static_files %}

  	{% if file.path contains "/img" %}
  		'{{ file.path }}',
		{% endif %}

  {% endfor %}
  '/fav.png',
  '/favicon.ico',

  // Pages
  {% for page in site.html_pages %}
	  '{{ page.url }}',
  {% endfor %}

	// Blog posts
  {% for post in site.posts %}
  	'{{ post.url }}',
	{% endfor %}

];



self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(cacheFiles);
    }).then(function(event){
    	return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(cacheName){
        	if(cacheName.startsWith("mark-muthii-cache-") && cacheName !== CACHE_NAME){
        		console.log('[ServiceWorker] Removing Cached Files from Cache - ', cacheName);
        		return caches.delete(cacheName);
        	}else{
        		console.log('Else- ', cacheName);
        	}
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log('[*] Serving cached: ' + event.request.url);
        return response;
      }
      console.log('[*] Fetching: ' + event.request.url);
      return fetch(event.request);
    })
  );
});