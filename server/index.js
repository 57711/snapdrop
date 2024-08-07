const { createServer } = require('http');
const { createSecureServer } = require('node:http2');
const fs = require('node:fs');
const wsServer = require('./wsServer.js');
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  'BAL5QGuWfW9UWg9SuW-fOgAAz2Ek2053oMaT34e5o69mgiR3IBFEUK7ZG3cNsQ2HdNQ4RQnviTVPePyTTKa0csM',
  'asBCZ-9yU652Mz7L7eyF-qhTqmJUY9GKfAG5QU7YisY'
);

function handler(req, res) {
  if (req.method === 'POST' && req.url === '/send') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = JSON.parse(body);
      console.log(body);
      webpush
        .sendNotification(body, 'Hello web push')
        .then((...args) => {
          console.log('@!@!@', args);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST');
          res.setHeader('Accept', 'application/json');
          res.end('send "Hello web push"');
        })
        .catch((err) => {
          console.log('send Fail', err);
          res.statusCode = 500;
          res.end(err.message);
        });
    });
  } else {
    res.end('hello');
  }
}

const secureServer = createSecureServer(
  {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
  },
  handler
);

secureServer.listen(8443, 'localhost', () => {
  console.log(`running on localhost:8443`);
});

const server = createServer(handler);

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing request for upgrade');
  wsServer._wss.handleUpgrade(request, socket, head, function done(ws) {
    wsServer._wss.emit('connection', ws, request);
  });
});

server.listen(process.env.PORT || 8080);

// =======================================

// Public Key:
// BAL5QGuWfW9UWg9SuW-fOgAAz2Ek2053oMaT34e5o69mgiR3IBFEUK7ZG3cNsQ2HdNQ4RQnviTVPePyTTKa0csM

// Private Key:
// asBCZ-9yU652Mz7L7eyF-qhTqmJUY9GKfAG5QU7YisY

// =======================================
