var express = require('express');
var request = require("request")
var wrap = require('word-wrap');
var moment = require('moment');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();
var models = require('../models/index');
var sess;

//router.get('/test', models.getAllImageFeed);
/* GET home page. */
router.get('/', function(req, res) {
    /*
    sess = req.session;
    if (sess.authen) {
        models.getAllImageFeed(function(callback) {
        moment.locale(); 
        console.log('sess.authenName :' + sess.authenName);
        res.render('index', { title: '', 
            username: sess,
            data: callback.data, 
            wrap: wrap, 
            moment: moment});
    })
    } else {
        res.redirect('/login');
    }
    */
        res.render('index');
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
