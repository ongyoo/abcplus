var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var http = require('http');
var https = require('http-https');
const httpPost = require('easy-post-request');
var formidable = require('formidable');
var fs = require('fs');
var empty = require('is-empty');
var sha256 = require('sha256');
var cryptoJS = require("crypto-js");
var pgp = require('pg-promise')(options);
pgp.pg.defaults.ssl = true;
var connectionString = 'postgres://xdaajbiygmknai:ba6c1455b2419a28a60876ce0008cacd5bcbf1dd43aa5cac834bec23fc54dc62@ec2-54-83-204-230.compute-1.amazonaws.com:5432/d89ehuo28eiqgm';
//var connectionString = 'postgres://postgres:root@localhost:5432/MyHouseDB';
//var connectionString = 'postgres://hlpufplzprbxoj:04cfc5fefed3e960ea3b9755729ea16c350335c4504637908dba063ab03c53d7@ec2-50-19-126-219.compute-1.amazonaws.com:5432/d40ern16qn2c6u';

var db = pgp(connectionString);

// KEY crypto 
let keyCrypto = "5ffaacb1";


function response(data, err, isArray) {
	var statusCode = baseStatusCode(data, err);
	if (isArray) {
		return { status: statusCode[0], data: checkArrayEmpty(data) ? data:[], message: statusCode[1], result: statusCode[2]};
	}
	console.log("response : "+ JSON.stringify(data));
	return { status: statusCode[0], data: data[0], message: statusCode[1], result: statusCode[2]};
}

function responseJSON(data, err) {
	var statusCode = baseStatusCode(data, err);
	console.log("responseJSON : "+ JSON.stringify(data));
	return { status: statusCode[0], data: data, message: statusCode[1], result: statusCode[2]};
}

function customResponseJSON(data, result, errStatusCode, errMsg) {
	return { status: errStatusCode, data: data, message: errMsg, result: result};
}

function checkArrayEmpty(data) {
	//console.log('checkArrayEmpty :' + empty(data));
	//console.log('Data :' + JSON.stringify(data));
	if (empty(data)) {
		return false;
	}
	return true;
}

function baseStatusCode(data, err) {
	if (typeof err === 'null' || err === null) {
		//console.log('baseStatusCode :' + checkArrayEmpty(data));
		if (checkArrayEmpty(data)) {
			return [200, '', true];
		} else {
			return [400, 'ไม่พบข้อมูล', false];
		}
	} else {
		//error
		return [500, 'เกิดข้อผิดพลาด'+' '+err.toString(), false];
	}
}

function defaultRespone(msg) {
	//return '{"message": "'+""+msg+""+'"}';
	var jsontext = '{"message": "'+""+msg+""+'"}';
	return JSON.parse(jsontext);
}

function customDefaultBoolRespone(key,val) {
	//return '{"message": "'+""+msg+""+'"}';
	var jsontext = '{"'+""+key+""+'": '+""+val+""+'}';
	console.log("customDefaultRespone :"+jsontext);
	console.log("customDefaultRespone Json:"+JSON.stringify(JSON.parse(jsontext)));
	return JSON.parse(jsontext);
}

function chechkFileType(type) {
	switch(type) {
		case 'image/png':
		return 'png';
		case 'image/gif':
		return 'gif';
		case 'image/jpg':
		return 'jpg';
		case 'image/jpeg':
		return 'jpeg';
		default:
		return;
	}
}

function authenError() {
	let err = new Error('Authen มีปัญหากรุณาติดต่อผู้ดูแล');
	return response(null, err, false);
}

//---- CryptoJS ----//
function cryptoEncode(data) {
	return cryptoJS.AES.encrypt(data, keyCrypto).toString();
}

function cryptoDecode(data) {
	var bytes  = cryptoJS.AES.decrypt(data.toString(), keyCrypto);
	return bytes.toString(cryptoJS.enc.Utf8);
}

module.exports = {
	response: response,
	responseJSON: responseJSON,
	defaultRespone: defaultRespone,
	customDefaultBoolRespone: customDefaultBoolRespone,
	customResponseJSON: customResponseJSON,
	chechkFileType: chechkFileType,
	authenError: authenError,
	empty: empty,
	sha256: sha256,
	cryptoEncode: cryptoEncode,
	cryptoDecode: cryptoDecode,
	http: http,
	https: https,
	httpPost: httpPost,
	db: db
};


//Doc
/*
200 OK
Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.[7]
201 Created
The request has been fulfilled, resulting in the creation of a new resource.[8]
202 Accepted
The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.[9]
203 Non-Authoritative Information (since HTTP/1.1)
The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response.[10][11]
204 No Content
The server successfully processed the request and is not returning any content.[12]
205 Reset Content
The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.[13]
206 Partial Content (RFC 7233)
The server is delivering only part of the resource (byte serving) due to a range header sent by the client. The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.[14]
207 Multi-Status (WebDAV; RFC 4918)
The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.[15]
208 Already Reported (WebDAV; RFC 5842)
The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.
226 IM Used (RFC 3229)
The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.[16]
*/

/*
300 Multiple Choices
Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation). For example, this code could be used to present multiple video format options, to list files with different filename extensions, or to suggest word-sense disambiguation.[18]
301 Moved Permanently
This and all future requests should be directed to the given URI.[19]
302 Found
This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"),[20] but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.[21] However, some Web applications and frameworks use the 302 status code as if it were the 303.[22]
303 See Other (since HTTP/1.1)
The response to the request can be found under another URI using a GET method. When received in response to a POST (or PUT/DELETE), the client should presume that the server has received the data and should issue a redirect with a separate GET message.[23]
304 Not Modified (RFC 7232)
Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.[24]
305 Use Proxy (since HTTP/1.1)
The requested resource is available only through a proxy, the address for which is provided in the response. Many HTTP clients (such as Mozilla[25] and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.[26]
306 Switch Proxy
No longer used. Originally meant "Subsequent requests should use the specified proxy."[27]
307 Temporary Redirect (since HTTP/1.1)
In this case, the request should be repeated with another URI; however, future requests should still use the original URI. In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request. For example, a POST request should be repeated using another POST request.[28]
308 Permanent Redirect (RFC 7538)
The request and all future requests should be repeated using another URI. 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change. So, for example, submitting a form to a permanently redirected resource may continue smoothly.[29]
*/


/*
400 Bad Request
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).[31]
401 Unauthorized (RFC 7235)
Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[32] 401 semantically means "unauthenticated",[33] i.e. the user does not have the necessary credentials.
Note: Some sites issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website.
402 Payment Required
Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed for example by GNU Taler[34], but that has not yet happened, and this code is not usually used. Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.[35]
403 Forbidden
The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.
404 Not Found
The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.[36]
405 Method Not Allowed
A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
406 Not Acceptable
The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.[37] See Content negotiation.
407 Proxy Authentication Required (RFC 7235)
The client must first authenticate itself with the proxy.[38]
408 Request Timeout
The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."[39]
409 Conflict
Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
410 Gone
Indicates that the resource requested is no longer available and will not be available again. This should be used when a resource has been intentionally removed and the resource should be purged. Upon receiving a 410 status code, the client should not request the resource in the future. Clients such as search engines should remove the resource from their indices.[40] Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
411 Length Required
The request did not specify the length of its content, which is required by the requested resource.[41]
412 Precondition Failed (RFC 7232)
The server does not meet one of the preconditions that the requester put on the request.[42]
413 Payload Too Large (RFC 7231)
The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".[43]
414 URI Too Long (RFC 7231)
The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request.[44] Called "Request-URI Too Long" previously.[45]
415 Unsupported Media Type
The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
416 Range Not Satisfiable (RFC 7233)
The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.[46] Called "Requested Range Not Satisfiable" previously.[47]
417 Expectation Failed
The server cannot meet the requirements of the Expect request-header field.[48]
418 I'm a teapot (RFC 2324)
This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by teapots requested to brew coffee.[49] This HTTP status is used as an Easter egg in some websites, including Google.com.[50]
421 Misdirected Request (RFC 7540)
The request was directed at a server that is not able to produce a response.[51] (for example because of a connection reuse)[52]
422 Unprocessable Entity (WebDAV; RFC 4918)
The request was well-formed but was unable to be followed due to semantic errors.[15]
423 Locked (WebDAV; RFC 4918)
The resource that is being accessed is locked.[15]
424 Failed Dependency (WebDAV; RFC 4918)
The request failed due to failure of a previous request (e.g., a PROPPATCH).[15]
426 Upgrade Required
The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.[53]
428 Precondition Required (RFC 6585)
The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict."[54]
429 Too Many Requests (RFC 6585)
The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.[54]
431 Request Header Fields Too Large (RFC 6585)
The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.[54]
451 Unavailable For Legal Reasons (RFC 7725)
A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.[55] The code 451 was chosen as a reference to the novel Fahrenheit 451.
*/

/*
500 Internal Server Error
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.[58]
501 Not Implemented
The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).[59]
502 Bad Gateway
The server was acting as a gateway or proxy and received an invalid response from the upstream server.[60]
503 Service Unavailable
The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.[61]
504 Gateway Timeout
The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.[62]
505 HTTP Version Not Supported
The server does not support the HTTP protocol version used in the request.[63]
506 Variant Also Negotiates (RFC 2295)
Transparent content negotiation for the request results in a circular reference.[64]
507 Insufficient Storage (WebDAV; RFC 4918)
The server is unable to store the representation needed to complete the request.[15]
508 Loop Detected (WebDAV; RFC 5842)
The server detected an infinite loop while processing the request (sent in lieu of 208 Already Reported).
510 Not Extended (RFC 2774)
Further extensions to the request are required for the server to fulfil it.[65]
511 Network Authentication Required (RFC 6585)
The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).[54]
*/



