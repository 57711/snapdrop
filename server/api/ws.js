const { createServer } = require('http');
const wsServer = require('../wsServer.js');

const server = createServer(function (req, res) {
  res.end('hello');
});

// server.on('upgrade', (request, socket, head) => {
//   console.log('Parsing request for upgrade');
//   wsServer._wss.handleUpgrade(request, socket, head, function done(ws) {
//     wsServer._wss.emit('connection', ws, request);
//   });
// });

server.listen(process.env.PORT || 8080);

// module.exports = (request, res) => {
//   console.log(request);
//   // wsServer._wss.handleUpgrade(request, request.socket, head, function done(ws) {
//   //   wsServer._wss.emit('connection', ws, request);
//   // });
//   res.status(200)
//   res.status(200).json(request);
// };

export function GET(request) {
  console.log(request);
  return new Response('hello');
}
