const port = 9075;

var credentials = [];

function verifyCredentials(username, pass){
    for(var x in credentials){
        if(x[0] == username && x[1] == pass){
            return true;
        }
        if(x[0] == username && x[1] != pass){
            return false;
        }
    }

    credentials.push([username, pass]);
    return true;
}



const { write } = require('fs');
const http = require('http');
const server = http.createServer(async function (request, response) {
    const {method, url} = request;

    let body = [];
    // Parses request's body into javascript object
    for await (const chunk of request) body.push(chunk);
    body = JSON.parse(Buffer.concat(body).toString());


    if(url == '/ranking'){
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/javascript',
            'Keep-Alive': 'timeout=5',
            'Transfer-Encoding': 'chunked'
        })
        responseBody = {ranking: ranking.slice(0, 10)};
        response.write(JSON.stringify(responseBody));
        response.end();
        return;
    }

    if(url == '/register'){
        let responseNum;
        if(credentials(body.username, body.pass)){
            responseNum = 200;
        }
        else{
            responseNum = 
        }

        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/javascript',
            'Keep-Alive': 'timeout=5',
            'Transfer-Encoding': 'chunked'
        });
        responseBody = {};
        response.write(JSON.stringify(responseBody));
        response.end();
        return;
    }
    
   
});

server.listen(port, function(error) {
    if (error) 
        console.log("Something went wrong");
    else 
        console.log("Listening on port " + port);
});



response.writeHead(204, {
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Max-Age': '86400',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
     'Access-Control-Allow-Origin': '*',
     'Connection': 'Keep-Alive',
     'Keep-Alive': 'timeout=2, max=100',
     'Vary': 'Accept-Encoding, Origin'
   });
response.end();


response.write();

responseBody = {ranking: ranking.slice(0, 10)};
response.write(JSON.stringify(responseBody));
            response.end();
            return;