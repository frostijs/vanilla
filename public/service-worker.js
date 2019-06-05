/* eslint-disable no-restricted-globals,no-undef */
/* global workbox, self */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`); // eslint-disable-line
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '__CACHE_TAG__' },
    { url: '/app.css', revision: '__CACHE_TAG__' },
    { url: '/app.js', revision: '__CACHE_TAG__' }
  ]);
} else {
  console.log(`Boo! Workbox didn't load 😬`); // eslint-disable-line
}
