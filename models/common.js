var baseModel = require('./baseModel');
const uuidv4 = require('uuid/v4');
var request = require('minimal-request');

function getGeoIP(callback) {
  const url = 'http://ip-api.com/json';
  baseModel.http.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      console.log("Sucess");
      console.log(body);
      callback(baseModel.responseJSON(body, null));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    callback(baseModel.responseJSON(null, err));
  });
}


// AB Money
//Get ab-token  // API 1
/*
{
    "ab-token": "lj5srju3tP"
}
*/
function getAbToken(callback) {
  const url = 'https://services.ab-fx.com/order/api/st/';
  baseModel.https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      console.log("Sucess");
      console.log(body);
      callback(baseModel.responseJSON(body, null));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    callback(baseModel.responseJSON(null, err));
  });
}

function get_signature(param,callback) {
  const url = 'https://services.ab-fx.com/order/lab/get_signature.php';
  request({
    url: url,
    method: 'post',
    body: JSON.stringify(param),
    json: true,
    headers: { 'Content-Type': 'application/json' },
  timeout: 5 // seconds
}, function(err, res, details){
  //console.log(err);
  console.log(res);
  // -> something like 404 or null
  if (err == null) {
    callback(baseModel.responseJSON(res, null));
    return;
  }
  callback(baseModel.responseJSON(null, err));
  console.log(res);
  // -> Something like {hi: 1234}

  //console.log(details);
  // -> Something like { statusCode: 200, headers: { ... }}
});
}

//reqpayment
function reqpayment(param,callback) {
  const url = 'https://services.ab-fx.com/order/api/st/reqpayment/';
  request({
    url: url,
    method: 'post',
    body: JSON.stringify(param),
    json: true,
    headers: { 'Content-Type': 'application/json' },
  timeout: 5 // seconds
}, function(err, res, details){
  //console.log(err);
  console.log(res);
  // -> something like 404 or null
  if (err == null) {
    callback(baseModel.responseJSON(res, null));
    return;
  }
  callback(baseModel.responseJSON(null, err));
  console.log(res);
  // -> Something like {hi: 1234}

  //console.log(details);
  // -> Something like { statusCode: 200, headers: { ... }}
});
}

module.exports = {
  getGeoIP: getGeoIP,
  getAbToken: getAbToken,
  get_signature: get_signature,
  reqpayment: reqpayment
};


/*
{
as: "AS45629 JasTel Network International Gateway",
city: "Bangkok",
country: "Thailand",
countryCode: "TH",
isp: "3BB Broadband",
lat: 13.75,
lon: 100.4833,
org: "3BB Broadband",
query: "49.49.247.133",
region: "10",
regionName: "Bangkok",
status: "success",
timezone: "Asia/Bangkok",
zip: "10700"
}
*/

/*
var request = http.get(options, function (res) {
    // other code goes here
});
request.setTimeout( 10000, function( ) {
    // handle timeout here
});
*/