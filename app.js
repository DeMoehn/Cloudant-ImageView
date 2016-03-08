#!/usr/bin/env node
/*eslint-env node*/

var express = require('express'); // Frontend Framework
var cfenv = require('cfenv');

// -- Create App and chose directory --
var app = express();
//app.use(express.static('public'));
app.use(express.static('public/')); // Use directory on server

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// -- Check for different URLs --
app.get('/', function(req, res){
  res.sendFile( __dirname + '/public/index.html');
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


// server = app.listen(3000);
// console.log("Listening on 192.168.1.110:3000");
