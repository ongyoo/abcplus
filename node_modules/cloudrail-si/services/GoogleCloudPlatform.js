"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["set", "$P0.baseUrl", "https://www.googleapis.com"],
        ["string.concat", "$P0.storageBase", "$P0.baseUrl", "/storage/v1"],
        ["string.concat", "$P0.authBase", "$P0.baseUrl", "/oauth2/v4/token"],
        ["string.substring", "$P0.privateKey", "$P0.privateKey", 28],
        ["size", "$L0", "$P0.privateKey"],
        ["math.add", "$L0", "$L0", -26],
        ["string.substring", "$P0.privateKey", "$P0.privateKey", 0, "$L0"]
    ],
    "listBuckets": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b?project=", "$P0.projectId"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["create", "$P1", "Array"],
        ["size", "$L3", "$L2.items"],
        ["create", "$L4", "Number"],
        ["if<than", "$L4", "$L3", 7],
        ["get", "$L5", "$L2.items", "$L4"],
        ["create", "$L6", "Bucket"],
        ["set", "$L6.name", "$L5.name"],
        ["set", "$L6.identifier", "$L5.id"],
        ["push", "$P1", "$L6"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -8]
    ],
    "createBucket": [
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b?project=", "$P0.projectId"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["create", "$L1", "Object"],
        ["set", "$L1.name", "$P2"],
        ["json.stringify", "$L2", "$L1"],
        ["stream.stringToStream", "$L3", "$L2"],
        ["set", "$L0.requestBody", "$L3"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["create", "$P1", "Bucket"],
        ["set", "$P1.name", "$L2.name"],
        ["set", "$P1.identifier", "$L2.id"]
    ],
    "deleteBucket": [
        ["callFunc", "checkBucket", "$P0", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "DELETE"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b/", "$P1.name"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"]
    ],
    "listFiles": [
        ["callFunc", "checkBucket", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b/", "$P2.name", "/o?maxResults=1000"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["create", "$P1", "Array"],
        ["size", "$L3", "$L2.items"],
        ["create", "$L4", "Number"],
        ["if<than", "$L4", "$L3", 6],
        ["get", "$L5", "$L2.items", "$L4"],
        ["if==than", "$L5.timeDeleted", null, 2],
        ["callFunc", "makeMeta", "$P0", "$L6", "$L5"],
        ["push", "$P1", "$L6"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -7]
    ],
    "getFileMetadata": [
        ["callFunc", "checkBucket", "$P0", "$P2"],
        ["callFunc", "checkNull", "$P0", "$P3"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b/", "$P2.name", "/o/", "$P3"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "makeMeta", "$P0", "$P1", "$L2"]
    ],
    "deleteFile": [
        ["callFunc", "checkBucket", "$P0", "$P2"],
        ["callFunc", "checkNull", "$P0", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "DELETE"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b/", "$P2.name", "/o/", "$P1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"]
    ],
    "uploadFile": [
        ["callFunc", "checkBucket", "$P0", "$P1"],
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkNull", "$P0", "$P3"],
        ["callFunc", "checkSize", "$P0", "$P4"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "initUpload", "$P0", "$L0", "$P1", "$P2"],
        ["callFunc", "performUpload", "$P0", "$L0", "$P3", "$P4"]
    ],
    "downloadFile": [
        ["callFunc", "checkBucket", "$P0", "$P3"],
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "$P0.storageBase", "/b/", "$P3.name", "/o/", "$P2", "?alt=media"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["set", "$P1", "$L1.responseBody"]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["if!=than", "$P2.appendBaseUrl", 0, 3],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.concat", "$L0.url", "$P0.storageBase", "$P2.url"],
        ["jumpRel", 1],
        ["set", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if==than", "$L0.requestHeaders", null, 1],
        ["create", "$L0.requestHeaders", "Object"],
        ["if!=than", "$P2.appendAuthorization", 0, 2],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "initUpload": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["string.concat", "$L0.url", "$P0.baseUrl", "/upload/storage/v1/b/", "$P2.name", "/o?uploadType=resumable&name=", "$P3"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["set", "$P1", "$L1.responseHeaders.Location"]
    ],
    "performUpload": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "PUT"],
        ["set", "$L0.url", "$P1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.accessToken"],
        ["string.concat", "$L0.requestHeaders.Content-Length", "$P3"],
        ["set", "$L0.requestBody", "$P2"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"]
    ],
    "makeMeta": [
        ["create", "$P1", "BusinessFileMetaData"],
        ["set", "$P1.fileName", "$P2.name"],
        ["set", "$P1.fileID", "$P2.id"],
        ["set", "$P1.size", "$P2.size"],
        ["create", "$L0", "Date", "$P2.updated"],
        ["set", "$P1.lastModified", "$L0.time"]
    ],
    "validateResponse": [
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L0", "Error", "Not Found", "NotFound"],
        ["throwError", "$L0"],
        ["if==than", "$P1.code", 409, 2],
        ["create", "$L0", "Error", "File or Bucket already exists", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if>=than", "$P1.code", 400, 4],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["json.stringify", "$L0", "$L0"],
        ["create", "$L1", "Error", "$L0", "HttpException"],
        ["throwError", "$L1"]
    ],
    "checkAuthentication": [
        ["if!=than", "$P0.accessToken", null, 3],
        ["create", "$L0", "Date"],
        ["if<than", "$L0.time", "$P0.expires", 1],
        ["return"],
        ["callFunc", "createJWT", "$P0", "$L0"],
        ["callFunc", "retrieveAccessToken", "$P0", "$L0"]
    ],
    "createJWT": [
        ["set", "$P1", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9"],
        ["create", "$L1", "Object"],
        ["set", "$L1.iss", "$P0.clientEmail"],
        ["set", "$L1.scope", "https://www.googleapis.com/auth/cloud-platform"],
        ["set", "$L1.aud", "https://www.googleapis.com/oauth2/v4/token"],
        ["create", "$L2", "Date"],
        ["math.add", "$L3", "$L2.time", 180000],
        ["set", "$L1.exp", "$L3"],
        ["math.multiply", "$L1.exp", "$L1.exp", 0.001],
        ["set", "$L1.iat", "$L2.time"],
        ["math.multiply", "$L1.iat", "$L1.iat", 0.001],
        ["json.stringify", "$L0", "$L1"],
        ["string.base64encode", "$L0", "$L0", 0, 1],
        ["string.concat", "$P1", "$P1", ".", "$L0"],
        ["stream.stringToStream", "$L0", "$P1"],
        ["stream.streamToData", "$L1", "$L0"],
        ["string.base64decode", "$L2", "$P0.privateKey"],
        ["crypt.rsa.sha256", "$L2", "$L1", "$L2"],
        ["string.base64encode", "$L3", "$L2", 0, 1],
        ["string.concat", "$P1", "$P1", ".", "$L3"]
    ],
    "retrieveAccessToken": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["set", "$L0.url", "$P0.authBase"],
        ["create", "$L0.requestHeaders", "Object"],
        ["set", "$L0.requestHeaders.Content-Type", "application/x-www-form-urlencoded"],
        ["string.concat", "$L1", "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=", "$P1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["set", "$P0.accessToken", "$L2.access_token"],
        ["create", "$L3", "Date"],
        ["math.multiply", "$L4", "$L2.expires_in", 1000],
        ["math.add", "$P0.expires", "$L3.time", "$L4", -1000000]
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
    ]
};
var GoogleCloudPlatform = (function () {
    function GoogleCloudPlatform(redirectReceiver, clientEmail, privateKey, projectId) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("GoogleCloudPlatform");
        this.interpreterStorage["clientEmail"] = clientEmail;
        this.interpreterStorage["privateKey"] = privateKey;
        this.interpreterStorage["projectId"] = projectId;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    GoogleCloudPlatform.prototype.createBucket = function (bucketName, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "createBucket");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("createBucket", this.interpreterStorage, null, bucketName).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "createBucket");
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
    GoogleCloudPlatform.prototype.listBuckets = function (callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "listBuckets");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("listBuckets", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "listBuckets");
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
    GoogleCloudPlatform.prototype.deleteBucket = function (bucket, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "deleteBucket");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("deleteBucket", this.interpreterStorage, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "deleteBucket");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    GoogleCloudPlatform.prototype.deleteFile = function (fileName, bucket, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "deleteFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("deleteFile", this.interpreterStorage, fileName, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "deleteFile");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    GoogleCloudPlatform.prototype.getFileMetadata = function (bucket, fileName, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "getFileMetadata");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getFileMetadata", this.interpreterStorage, null, bucket, fileName).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "getFileMetadata");
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
    GoogleCloudPlatform.prototype.listFiles = function (bucket, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "listFiles");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("listFiles", this.interpreterStorage, null, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "listFiles");
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
    GoogleCloudPlatform.prototype.uploadFile = function (bucket, name, stream, size, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "uploadFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("uploadFile", this.interpreterStorage, bucket, name, stream, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "uploadFile");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    GoogleCloudPlatform.prototype.downloadFile = function (fileName, bucket, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "downloadFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("downloadFile", this.interpreterStorage, null, fileName, bucket).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "downloadFile");
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
    GoogleCloudPlatform.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "GoogleCloudPlatform", "advancedRequest");
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
    GoogleCloudPlatform.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    GoogleCloudPlatform.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    GoogleCloudPlatform.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("GoogleCloudPlatform", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return GoogleCloudPlatform;
}());
exports.GoogleCloudPlatform = GoogleCloudPlatform;
