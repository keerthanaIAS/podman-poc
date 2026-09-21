const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      service: 'service-b',
      status: 'UP'
    }));
    return;
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    service: 'service-b',
    message: 'Request received from another container'
  }));
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Service B listening on port 4000');
});
