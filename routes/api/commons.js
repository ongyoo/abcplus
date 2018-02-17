var express = require('express');
var request = require("request")
var wrap = require('word-wrap');
var moment = require('moment');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();
var models = require('../../models/common');
var sess;

const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.txt' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

/* GEO IP */
router.get('/geo_ip', function(req, res) {   
    models.getGeoIP(function(callback) {
        res.json(callback);
    })
});

router.get('/st', function(req, res) {   
    models.getAbToken(function(callback) {
        logger.debug("API st :" + JSON.stringify(req.body )+ "\n" + "callback :" + JSON.stringify(callback) + "\n" + "createDate: "+ new Date().toISOString());
        res.json(callback);
    })
});

router.post('/get_signature', function(req, res) {   
    models.get_signature(req.body,function(callback) {
        logger.debug("API st :" + JSON.stringify(req.body) + "\n" + "callback :" + JSON.stringify(callback) + "\n" + "createDate: "+ new Date().toISOString());
        res.json(callback);
    })
});

router.post('/reqpayment', function(req, res) {   
    models.reqpayment(req.body,function(callback) {
        logger.debug("API st :" + JSON.stringify(req.body) + "\n" + "callback :" + JSON.stringify(callback) + "\n" + "createDate: "+ new Date().toISOString());
        res.json(callback);
    })
});



module.exports = router;
