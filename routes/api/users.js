var express = require('express');
var request = require("request")
var wrap = require('word-wrap');
var moment = require('moment');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();
var models = require('../../models/user');
var sess;

/* SignIn User */
router.post('/signin', function(req, res) {
    var header = req.headers['authorization']||'',        // get the header
      token = header.split(/\s+/).pop()||'',            // and the encoded auth token
      auth = new Buffer(token, 'base64').toString(),    // convert from base64
      parts = auth.split(/:/),                          // split on colon
      username = parts[0],
      password = parts[1];

    models.signin(username, password, function(callback) {
        res.json(callback);
    })
});

/* SignUp(Register) User */
router.post('/signup', function(req, res) {
    models.signup(req.body, function(callback) {
        res.json(callback);
    })
});

/* Get User Detail*/
router.get('/userDetail', function(req, res) {
    models.userDetail(req.query.user_id, function(callback) {
        res.json(callback);
    })
});

router.get('/imageFeeds', function(req, res) {
	models.getAllImageFeed(function(callback) {
		res.json(callback);
		console.log(callback.data);
	})
});

router.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req);
	console.log("form test :"+form.image);
    
    form.on('fileBegin', function (name, file) {
    	var hostname = req.headers.host
    	let path = './uploads'+ '/komsit/';
    	models.checkDirectorySync(path);
        file.path = path+ 'testasdasd2222.png';
        console.log("form file.name :"+file.name);
        console.log("form file :"+file);
        console.log("form name :"+name);
        //res.send(hostname + file.path.substr(1));
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    //res.send(__dirname);
    //res.send(__dirname);
});

module.exports = router;
