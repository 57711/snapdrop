self.addEventListener('install', (event) => {
  console.log('Installed SW');
});

self.addEventListener('activate', (event) => {
  console.log('Activated SW');
});

self.addEventListener('push', (event) => {
  console.log('@@@@@', event.data.text());
});
