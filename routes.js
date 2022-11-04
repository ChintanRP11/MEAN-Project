const fs = require('fs');

// requesthandler to handle incoming requests and route them
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>First App</title></head>');
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>send</button></form</body></html>");
        return res.end();
    }
    if (url === "/message" && method==="POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, (err) => {
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>First App</title></head><body>Hello this is first app</body></html>');
    res.end();
};


// Exporting the necessary property of this file which can be used in another file

// // single export from file
// module.exports.handler = requestHandler;

// // multiple exports from file, this is now creates a routes a object in another file where it is imported
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text for test'
// };

// // seperately making property of routes object.
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text for test';

// short method
exports.handler = requestHandler;
exports.someText = 'Some hard coded text for test2';
