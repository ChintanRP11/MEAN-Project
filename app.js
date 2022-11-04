const http = require('http');   // importing core modules with names
const express = require('express');

// express application => middlewares
const app = express();

// use() allow to add new middleware function which runs on every incoming requests on server.
// next() allows the request to move on next middleware in line
app.use((req, res, next) => {
    console.log("in the middleware");
    next();
});
app.use((req, res, next) => {
    console.log("in the another middleware");
});


// creating server
// creating server and handling requests with routes.handler property
const server = http.createServer(app);

// server is listening on port 3000
server.listen(3000);
