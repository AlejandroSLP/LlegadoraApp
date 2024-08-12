// imports
importScripts('js/sw-utils.js');


const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    // '/',
    'index.html',
    'css/style.css',
    'css/reproductor.css',
    'img/favicon.ico',
    'img/llegadora-cover.png',
    './js/app.js',
    'js/sw-utils.js'
];


const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    './js/libs/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js'
];

self.addEventListener('install', e => {
    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil( promise.all([cacheStatic, cacheInmutable]) );
});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );


});


self.addEventListener('fetch', e => {

    const respuesta = caches.match( e.request ).then(res => {
        if (res){
            return res;
        } else {
            return fetch( e.request ).then( newRes => {
                return actualizacacheDinamico( DYNAMIC_CACHE, e.request, newRes );
            });
        }
        
    });

    e.respondWith( respuesta );

});