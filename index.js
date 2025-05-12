const http = require('http');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the overview page')
    }
    else if(pathName === '/product'){
        res.end('this is the Product')
    }
    else {
        res.writeHead(404, {'content-type': 'text/html',
            'my-own-header':'Hello World'            
        });
        res.end('<h1>this page could not be found</h1>');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening to requests on port 3000');
});
