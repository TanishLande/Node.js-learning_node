const http = require('http');
const fs = require('fs');
const lo = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    const random = lo.random(0,20);
    console.log(random);

    // Setting the content type
    res.setHeader('Content-Type', 'text/html');

    // Define file path based on URL
    let path = './html-files/';
    let statusCode = 200;

    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            return;
        default:
            path += '404.html';
            statusCode = 404;
            break;
    }

    // Read and serve the HTML file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log('There was an error:', err);
            res.statusCode = 500;
            res.end('Server Error');
        } else {
            res.statusCode = statusCode;
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on port 3000');
});
