const { createServer } = require('http');
const wsServer = require('./wsServer.js');

const server = createServer();

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing request for upgrade');
  wsServer._wss.handleUpgrade(request, socket, head, function done(ws) {
    wsServer._wss.emit('connection', ws, request);
  });
});

server.listen(process.env.PORT || 8080);
