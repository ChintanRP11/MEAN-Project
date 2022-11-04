const http = require('http');   // creating http to use its functions to create server
const fs = require('fs');


// creating server
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    // routing(sending different data in response) based on url in request
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

});

// server is listening on port 3000
server.listen(3000);
