"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "Storage:createBucket": [
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P2", "\nrestype:share"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "PUT", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P2", "?restype=share"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "PUT"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 201],
        ["set", "$L12", "$L6.responseHeaders"],
        ["create", "$L10", "Bucket"],
        ["set", "$L10.name", "$P2"],
        ["if!=than", "$L12.Etag", null, 2],
        ["set", "$L10.identifier", "$L12.Etag"],
        ["jumpRel", 1],
        ["set", "$L10.identifier", "$L12.ETag"],
        ["set", "$P1", "$L10"]
    ],
    "Storage:deleteBucket": [
        ["callFunc", "checkBucket", "$P0", "$P1"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P1.name", "\nrestype:share"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "DELETE", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P1.name", "?restype=share"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "DELETE"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 202]
    ],
    "Storage:listBuckets": [
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/\ncomp:list"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "GET", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/?comp=list"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "GET"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 200],
        ["create", "$L14", "Array"],
        ["stream.streamToString", "$L12", "$L6.responseBody"],
        ["xml.parse", "$L12", "$L12"],
        ["size", "$L10", "$L12.children.0.children"],
        ["if!=than", "$L10", 0, 7],
        ["math.add", "$L10", "$L10", -1],
        ["create", "$L13", "Bucket"],
        ["get", "$L15", "$L12.children.0.children", "$L10"],
        ["set", "$L13.identifier", "$L15.children.1.children.1.text"],
        ["set", "$L13.name", "$L15.children.0.text"],
        ["push", "$L14", "$L13"],
        ["jumpRel", -8],
        ["set", "$P1", "$L14"]
    ],
    "Storage:upload": [
        ["callFunc", "checkBucket", "$P0", "$P1"],
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkNull", "$P0", "$P3"],
        ["callFunc", "checkNull", "$P0", "$P4"],
        ["callFunc", "checkSize", "$P0", "$P4"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["string.concat", "$L4.x-ms-content-length", "$P4", ""],
        ["set", "$L4", "file", "x-ms-type"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P1.name", "/", "$P2"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "PUT", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P1.name", "/", "$P2"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "PUT"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 201],
        ["set", "$L12", "$L6.responseHeaders"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["set", "$L4", "update", "x-ms-write"],
        ["set", "$L10", 3999999],
        ["set", "$L13", 4000000],
        ["set", "$L14", "$P4"],
        ["set", "$L15", 0],
        ["if!=than", "$L15", "$P4", 30],
        ["set", "$L16", 0],
        ["math.add", "$L16", "$L15", "$L10"],
        ["math.add", "$L17", "$L13", 1],
        ["set", "$L4", "$L13", "Content-Length"],
        ["string.concat", "$L3", "bytes=", "$L15", "-", "$L16"],
        ["if<=than", "$L14", "$L13", 3],
        ["set", "$L4", "$L14", "Content-Length"],
        ["math.add", "$L17", "$P4", -1],
        ["string.concat", "$L3", "bytes=", "$L15", "-", "$L17"],
        ["set", "$L4", "$L3", "x-ms-range"],
        ["math.add", "$L15", "$L15", "$L4.Content-Length"],
        ["math.multiply", "$L16", "$L4.Content-Length", -1],
        ["math.add", "$L14", "$L14", "$L16"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P1.name", "/", "$P2", "\ncomp:range"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "PUT", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P1.name", "/", "$P2", "?comp=range"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "PUT"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["stream.makeLimitedStream", "$L0", "$P3", "$L4.Content-Length"],
        ["set", "$L5.requestBody", "$L0"],
        ["string.concat", "$L4.Content-Length", "$L4.Content-Length", ""],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 201],
        ["jumpRel", -31]
    ],
    "Storage:download": [
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkBucket", "$P0", "$P3"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P3.name", "/", "$P2"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "GET", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P3.name", "/", "$P2"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "GET"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 200],
        ["set", "$P1", "$L6.responseBody"]
    ],
    "Storage:listFiles": [
        ["callFunc", "checkBucket", "$P0", "$P2"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P2.name", "\ncomp:list", "\nrestype:directory"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "GET", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P2.name", "?restype=directory&comp=list"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "GET"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 200],
        ["create", "$L14", "Array"],
        ["stream.streamToString", "$L12", "$L6.responseBody"],
        ["xml.parse", "$L12", "$L12"],
        ["size", "$L10", "$L12.children.0.children"],
        ["if!=than", "$L10", 0, 8],
        ["math.add", "$L10", "$L10", -1],
        ["create", "$L13", "BusinessFileMetaData"],
        ["get", "$L15", "$L12.children.0.children", "$L10"],
        ["set", "$L13.fileName", "$L15.children.0.text"],
        ["math.add", "$L11", "$L15.children.1.children.0.text", 0],
        ["set", "$L13.size", "$L11"],
        ["push", "$L14", "$L13"],
        ["jumpRel", -9],
        ["set", "$P1", "$L14"]
    ],
    "Storage:getFileMetadata": [
        ["callFunc", "checkNull", "$P0", "$P3"],
        ["callFunc", "checkBucket", "$P0", "$P2"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P2.name", "/", "$P3"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "HEAD", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P2.name", "/", "$P3"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "HEAD"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "get metadata", 200],
        ["set", "$L6", "$L6.responseHeaders"],
        ["create", "$L7", "BusinessFileMetaData"],
        ["set", "$L7.fileName", "$P3"],
        ["set", "$L7.fileID", "$L6.ETag"],
        ["math.add", "$L7.size", "$L6.Content-Length", 0],
        ["callFunc", "parseDate", "$P0", "$L7.lastModified", "$L6.Last-Modified"],
        ["set", "$P1", "$L7"]
    ],
    "Storage:deleteFile": [
        ["callFunc", "checkNull", "$P0", "$P1"],
        ["callFunc", "checkBucket", "$P0", "$P2"],
        ["create", "$L1", "Date"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "$L1.rfcTime1123", "x-ms-date"],
        ["set", "$L4", "2015-12-11", "x-ms-version"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "/", "$P0.accountName", "/", "$P2.name", "/", "$P1"],
        ["create", "$L2", "String"],
        ["callFunc", "signedString", "$L2", "DELETE", "", "$L4", "$L3", "$P0"],
        ["string.concat", "$L2", "SharedKey ", "$P0.accountName", ":", "$L2"],
        ["set", "$L4", "$L2", "Authorization"],
        ["create", "$L5", "Object"],
        ["string.concat", "$L0", "https://", "$P0.accountName", ".file.core.windows.net/", "$P2.name", "/", "$P1"],
        ["set", "$L5.url", "$L0"],
        ["set", "$L5.method", "DELETE"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 202]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["if!=than", "$P2.appendBaseUrl", 0, 2],
        ["string.concat", "$L0.url", "https://", "$P0.accountName", ".file.core.windows.net", "$P2.url"],
        ["jumpRel", 1],
        ["set", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if==than", "$L0.requestHeaders", null, 1],
        ["create", "$L0.requestHeaders", "Object"],
        ["if!=than", "$P2.appendAuthorization", 0, 2],
        ["if==than", "$L0.requestHeaders.x-ms-date", null, 2],
        ["create", "$L1", "Date"],
        ["set", "$L0.requestHeaders.x-ms-date", "$L1.rfcTime1123"],
        ["callFunc", "extractCanonicalResources", "$P0", "$L1", "$L0.url"],
        ["callFunc", "signedString", "$L1", "$L0.method", "", "$L0.requestHeaders", "$L1", "$P0"],
        ["string.concat", "$L0.requestHeaders.Authorization", "SharedKey ", "$P0.accountName", ":", "$L1"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "checkHttpErrors", "$P0", "$L1", "advancedRequest"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "extractCanonicalResources": [
        ["string.concat", "$P1", "/", "$P0.accountName"],
        ["string.indexOf", "$L0", "$P2", ".net"],
        ["string.indexOf", "$L0", "$P2", "/", "$L0"],
        ["if!=than", "$L0", -1, 10],
        ["size", "$L1", "$P2"],
        ["math.add", "$L1", "$L1", -1],
        ["if!=than", "$L0", "$L1", 7],
        ["string.indexOf", "$L2", "$P2", "/", "$L1"],
        ["if==than", "$L2", -1, 5],
        ["string.substring", "$L3", "$P2", "$L0"],
        ["string.concat", "$P1", "$P1", "$L3"],
        ["jumpRel", 2],
        ["string.substring", "$L3", "$P2", "$L0", "$L2"],
        ["string.concat", "$P1", "$P1", "$L3"],
        ["string.split", "$L0", "$P2", "\\?", 2],
        ["size", "$L1", "$L0"],
        ["if==than", "$L1", 1, 1],
        ["return"],
        ["string.split", "$L1", "$L0.1", "&"],
        ["size", "$L2", "$L1"],
        ["create", "$L3", "Number", 0],
        ["if<than", "$L3", "$L2", 6],
        ["get", "$L4", "$L1", "$L3"],
        ["string.split", "$L5", "$L4", "="],
        ["array.join", "$L6", "$L5", ":"],
        ["string.concat", "$P1", "$P1", "\n", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -7]
    ],
    "signedString": [
        ["object.getKeyArray", "$L0", "$P3"],
        ["array.sort", "$L0", "$L0"],
        ["size", "$L1", "$L0"],
        ["create", "$L2", "String"],
        ["create", "$L3", "Number"],
        ["if<than", "$L3", "$L1", 7],
        ["get", "$L4", "$L0", "$L3"],
        ["string.indexOf", "$L5", "$L4", "x-ms"],
        ["if!=than", "$L5", -1, 2],
        ["get", "$L6", "$P3", "$L4"],
        ["string.concat", "$L2", "$L2", "$L4", ":", "$L6", "\n"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -8],
        ["set", "$L6", ""],
        ["set", "$L7", ""],
        ["size", "$L5", "$P2"],
        ["if!=than", "$L5", 0, 2],
        ["callFunc", "generateMD5", "$L6", "$P2"],
        ["getMimeType", "$L7", "$P2"],
        ["string.concat", "$L1", "$P1", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["if!=than", "$P3.Content-Length", null, 1],
        ["string.concat", "$L1", "$L1", "$P3.Content-Length"],
        ["string.concat", "$L1", "$L1", "\n", "$L6", "\n"],
        ["string.concat", "$L1", "$L1", "$L7", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "", "\n"],
        ["string.concat", "$L1", "$L1", "$L2"],
        ["string.concat", "$L1", "$L1", "$P4", ""],
        ["string.base64decode", "$L8", "$P5.accessKey"],
        ["callFunc", "generateSHA256", "$L10", "$L1", "$L8"],
        ["set", "$P0", "$L10"]
    ],
    "generateMD5": [
        ["hash.md5", "$L0", "$P1"],
        ["size", "$L1", "$L0"],
        ["set", "$L2", 0],
        ["set", "$P0", ""],
        ["get", "$L3", "$L0", "$L2"],
        ["string.format", "$L4", "%02x", "$L3"],
        ["string.concat", "$P0", "$P0", "$L4"],
        ["math.add", "$L2", "$L2", 1],
        ["if>=than", "$L2", "$L1", -5]
    ],
    "generateSHA256": [
        ["crypt.hmac.sha256", "$L0", "$P2", "$P1"],
        ["array.arrayToData", "$L1", "$L0"],
        ["string.base64encode", "$P0", "$L1"]
    ],
    "checkHttpErrors": [
        ["if==than", "$P3", null, 2],
        ["if>=than", "$P1.code", 400, 24],
        ["jumpRel", 1],
        ["if!=than", "$P1.code", "$P3", 20],
        ["set", "$L0", "$P1"],
        ["set", "$L2", "$L0.message"],
        ["string.indexOf", "$L3", "$L2", "The specified share already exists"],
        ["if!=than", "$L3", -1, 2],
        ["create", "$L3", "Error", "The bucket already exists.", "IllegalArgument"],
        ["throwError", "$L3"],
        ["string.indexOf", "$L3", "$L2", "The specified resource does not exist"],
        ["if!=than", "$L3", -1, 2],
        ["create", "$L3", "Error", "The file does not exists.", "NotFound"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 2],
        ["create", "$L3", "Error", "$L2", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["throwError", "$L3"],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "Parameter should not be null.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "checkBucket": [
        ["callFunc", "checkNull", "$P0", "$P1"],
        ["if==than", "$P1.name", null, 3],
        ["if==than", "$P1.identifier", null, 2],
        ["create", "$L0", "Error", "Bucket name and identifier should not be null.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "checkSize": [
        ["if<than", "$P1", 0, 2],
        ["create", "$L0", "Error", "Size can not be negative.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "parseDate": [
        ["string.substr", "$L0", "$P2", 5, 2],
        ["string.substr", "$L1", "$P2", 8, 3],
        ["set", "$L6", ""],
        ["callFunc", "getMonthNumber", "$P0", "$L6", "$L1"],
        ["string.substr", "$L2", "$P2", 12, 4],
        ["string.substr", "$L3", "$P2", 17, 8],
        ["string.concat", "$L4", "$L2", "-", "$L6", "-", "$L0", "T", "$L3", "Z"],
        ["create", "$L5", "Date", "$L4"],
        ["set", "$P1", "$L5.time"]
    ],
    "getMonthNumber": [
        ["if==than", "$P2", "Jan", 2],
        ["set", "$P1", "01"],
        ["return"],
        ["if==than", "$P2", "Feb", 2],
        ["set", "$P1", "02"],
        ["return"],
        ["if==than", "$P2", "Mar", 2],
        ["set", "$P1", "03"],
        ["return"],
        ["if==than", "$P2", "Apr", 2],
        ["set", "$P1", "04"],
        ["return"],
        ["if==than", "$P2", "May", 2],
        ["set", "$P1", "05"],
        ["return"],
        ["if==than", "$P2", "Jun", 2],
        ["set", "$P1", "06"],
        ["return"],
        ["if==than", "$P2", "Jul", 2],
        ["set", "$P1", "07"],
        ["return"],
        ["if==than", "$P2", "Aug", 2],
        ["set", "$P1", "08"],
        ["return"],
        ["if==than", "$P2", "Sep", 2],
        ["set", "$P1", "09"],
        ["return"],
        ["if==than", "$P2", "Oct", 2],
        ["set", "$P1", "10"],
        ["return"],
        ["if==than", "$P2", "Nov", 2],
        ["set", "$P1", "11"],
        ["return"],
        ["if==than", "$P2", "Dec", 2],
        ["set", "$P1", "12"],
        ["return"],
        ["create", "$L0", "Error", "Could not recognize month in Date"],
        ["throwError", "$L0"]
    ],
    "arrayToHex": [
        ["size", "$L1", "$P2"],
        ["set", "$L2", 0],
        ["create", "$P1", "String", ""],
        ["get", "$L3", "$P2", "$L2"],
        ["string.format", "$L4", "%02x", "$L3"],
        ["string.concat", "$P1", "$P1", "$L4"],
        ["math.add", "$L2", "$L2", 1],
        ["if>=than", "$L2", "$L1", -5]
    ]
};
var MicrosoftAzure = (function () {
    function MicrosoftAzure(redirectReceiver, accountName, accessKey) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("MicrosoftAzure");
        this.interpreterStorage["accountName"] = accountName;
        this.interpreterStorage["accessKey"] = accessKey;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    MicrosoftAzure.prototype.createBucket = function (bucketName, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "createBucket");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:createBucket", this.interpreterStorage, null, bucketName).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "createBucket");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.listBuckets = function (callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "listBuckets");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:listBuckets", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "listBuckets");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.deleteBucket = function (bucket, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "deleteBucket");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:deleteBucket", this.interpreterStorage, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "deleteBucket");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.deleteFile = function (fileName, bucket, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "deleteFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:deleteFile", this.interpreterStorage, fileName, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "deleteFile");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.getFileMetadata = function (bucket, fileName, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "getFileMetadata");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:getFileMetadata", this.interpreterStorage, null, bucket, fileName).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "getFileMetadata");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.listFiles = function (bucket, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "listFiles");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:listFiles", this.interpreterStorage, null, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "listFiles");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.uploadFile = function (bucket, name, stream, size, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "uploadFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:upload", this.interpreterStorage, bucket, name, stream, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "uploadFile");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.downloadFile = function (fileName, bucket, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "downloadFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Storage:download", this.interpreterStorage, null, fileName, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "downloadFile");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "MicrosoftAzure", "advancedRequest");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    MicrosoftAzure.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    MicrosoftAzure.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    MicrosoftAzure.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("MicrosoftAzure", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return MicrosoftAzure;
}());
exports.MicrosoftAzure = MicrosoftAzure;
