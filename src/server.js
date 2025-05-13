const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)
    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, product.organic ? '' : 'not-organic');
    }
    return output;
}
const data = fs.readFileSync(`${__dirname}/../data/data.json`, 'utf8');
const tempOverview = fs.readFileSync(`${__dirname}/../templates/template-overview.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/../templates/template-card.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/../templates/template-product.html`, 'utf8');
const dataObj = JSON.parse(data);
            


const server = http.createServer((req, res) => {

  
    const {query, pathname} = url.parse(req.url, true);  

    // Overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'content-type':'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output)
    }

    // Product page
    else if(pathname === '/product'){
        const product = dataObj[query.id]
        res.writeHead(200, {'content-type':'text/html'})
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    // API
    else if(pathname === '/api'){
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(data)
    }

    // Not found
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
