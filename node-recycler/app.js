'use strict';
require('magic-globals');

var express    = require('express');            // required for front
var bodyParser = require('body-parser');        // parser for post requests
var accions    = require('./utils/accions');    // back-end actions
var app        = express(); 

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/bagToOwner',function(req,res){
    var proof = Promise.resolve(accions.associateBagToOwner(req.body.account, req.body.privateKey, req.body.qrCode));
    proof.then(function(data){
        return res.json(data);
    });
});

app.post('/api/evaluateBag',function(req,res){
    var proof = Promise.resolve(accions.evaluateBag(req.body.account, req.body.privateKey, req.body.qrCode, req.body.grade));
    proof.then(function(data){
        return res.json(data);
    });
});

app.post('/api/tokens',function(req,res){
    var proof = Promise.resolve(accions.getBagScores(req.body.account, req.body.privateKey, req.body.shopAddress));
    proof.then(function(data){
        return res.json(data);
    });
});



// FUNCTIONS "READY" FOR THE FUTURE... WHEN FRONT IS PROPERLY DEVELOPED

app.post('/api/register',function(req,res){
    var proof = Promise.resolve(accions.registerShop(req.body.account, req.body.privateKey, req.body.address, req.body.shopType));
    proof.then(function(data){
        return res.json(data);
    });
});



app.post('/api/commerceType',function(req,res){
    var proof = Promise.resolve(accions.getCommerceType(req.body.account, req.body.privateKey, req.body.shopAddress));
    proof.then(function(data){
        return res.json(data);
    });
});

app.post('/api/commerceType',function(req,res){
    var proof = Promise.resolve(accions.getBagToOwner(req.body.account, req.body.privateKey, req.body.qrCode));
    proof.then(function(data){
        return res.json(data);
    });
});

app.post('/api/bagScore',function(req,res){
    var proof = Promise.resolve(accions.getBagScores(req.body.account, req.body.privateKey, req.body.qrCode));
    proof.then(function(data){
        return res.json(data);
    });
});



module.exports = app;