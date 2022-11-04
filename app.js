const express = require('express');

// express application => middlewares
const app = express();

// use() allows to add new middleware function which runs on every incoming requests on server.
// next() allows the request to move on next middleware in line
app.use((req, res, next) => {
    console.log("in the middleware");
    next();
});
app.use((req, res, next) => {
    console.log("in the another middleware");
    res.send("<h1>Hello from express middleware!</h1>") // allows to send response with html text and adds required html code.
});


// // creating server
// // creating server and handling requests with routes.handler property
// const server = http.createServer(app);

// // server is listening on port 3000
// server.listen(3000);

//express js shorten the server creation code
app.listen(3000);
