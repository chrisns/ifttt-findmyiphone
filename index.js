"use strict";
const iCloud = require('node-icloud');

const localtunnel = require('localtunnel');
const express = require('express');
const bodyParser = require('body-parser');

const PORT=8080; 

const intended_subdomain = process.env.SUBDOMAIN;

const secret_token = process.env.SECRET_TOKEN;

const exec = require('child_process').exec;

const tunnel = localtunnel(PORT, {subdomain: intended_subdomain}, (err, tunnel) => {
  if (err) {
    process.exit();
  }
  if (tunnel.url !== `http://${intended_subdomain}.localtunnel.me` && tunnel.url !== `https://${intended_subdomain}.localtunnel.me`) {
    console.error("Could not get the intended subdomain");
    process.exit();
  }


  var app = express();
  app.use(bodyParser.json()); // for parsing application/json
  app.listen(PORT, () => {
    console.log(`Server listening on: ${tunnel.url}`);
  });

  app.post('/', handleRequest);

});

tunnel.on('close', () => process.exit());

function handleRequest(req, res){
  if (req.body.token != secret_token) {
    console.error("bad request");
    res.writeHead(403);
    return res.end();
  }
  try {
    console.log("finding phone");
    let device = new iCloud(process.env.ICLOUDUSER, process.env.ICLOUDPASS, req.body.device);
    device.playSound()
    res.writeHead(200);
    return res.end();    
  }
  catch(err) {
    console.error("error");
    res.writeHead(500);
    return res.end();    
  }
}
