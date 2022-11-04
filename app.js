const http = require('http');   // importing core modules with names
const routes = require('./routes'); // importing custom module by relative path

console.log(routes.someText);   // accessing property of routes which are exported

// creating server
const server = http.createServer(routes.handler);   // creating server and handling requets with routes.handler property

// server is listening on port 3000
server.listen(3000);
