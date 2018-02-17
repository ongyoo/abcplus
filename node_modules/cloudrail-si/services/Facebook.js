"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["set", "$P0.boundary", "Amgrmg43ghg3g39glv0k2ldk"],
        ["if==than", "$P0.scopes", null, 2],
        ["set", "$P0.scope", "public_profile%2Cemail%2Cuser_birthday%2Cuser_about_me%2Cpublish_actions%2Cuser_friends%2Cuser_photos"],
        ["jumpRel", 11],
        ["create", "$P0.scope", "String"],
        ["size", "$L0", "$P0.scopes"],
        ["create", "$L1", "Number", 0],
        ["if<than", "$L1", "$L0", 7],
        ["if!=than", "$L1", 0, 1],
        ["string.concat", "$P0.scope", "$P0.scope", "%2C"],
        ["get", "$L2", "$P0.scopes", "$L1"],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$P0.scope", "$P0.scope", "$L2"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -8]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "https://graph.facebook.com"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if!=than", "$P2.appendAuthorization", 0, 2],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "Social:postUpdate": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "The content is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L3", "String"],
        ["string.urlEncode", "$L3", "$P1"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "https://graph.facebook.com/v2.8/me/feed?message=", "$L3"],
        ["set", "$L0.url", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"]
    ],
    "Social:postImage": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "The message is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P2", null, 2],
        ["create", "$L0", "Error", "The image is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["set", "$L0.url", "https://graph.facebook.com/v2.8/me/photos"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Content-Type", "multipart/form-data; boundary=", "$P0.boundary"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["string.concat", "$L1", "--", "$P0.boundary", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"caption\"\r\n\r\n"],
        ["string.concat", "$L1", "$L1", "$P1", "\r\n"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundary", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"source\"; filename=\"somename\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Transfer-Encoding: binary\r\n\r\n"],
        ["stream.stringToStream", "$L1", "$L1"],
        ["string.concat", "$L2", "\r\n--", "$P0.boundary", "--"],
        ["stream.stringToStream", "$L2", "$L2"],
        ["stream.makeJoinedStream", "$L0.requestBody", "$L1", "$P2", "$L2"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L4"]
    ],
    "Social:postVideo": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "The message is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P2", null, 2],
        ["create", "$L0", "Error", "The image is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["set", "$L0.url", "https://graph-video.facebook.com/v2.8/me/videos"],
        ["string.indexOf", "$L20", "$P4", "/"],
        ["math.add", "$L20", "$L20", 1],
        ["string.substring", "$L21", "$P4", "$L20"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Content-Type", "multipart/form-data; boundary=", "$P0.boundary"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["string.concat", "$L1", "--", "$P0.boundary", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"description\"\r\n\r\n"],
        ["string.concat", "$L1", "$L1", "$P1", "\r\n"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundary", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"source\"; filename=\"somename.", "$L21", "\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Transfer-Encoding: binary\r\n\r\n"],
        ["stream.stringToStream", "$L1", "$L1"],
        ["string.concat", "$L2", "\r\n--", "$P0.boundary", "--"],
        ["stream.stringToStream", "$L2", "$L2"],
        ["stream.makeJoinedStream", "$L0.requestBody", "$L1", "$P2", "$L2"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L4"]
    ],
    "Social:getConnections": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "https://graph.facebook.com/v2.8/me/friends"],
        ["set", "$L0.url", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"],
        ["create", "$L3", "String"],
        ["stream.streamToString", "$L3", "$L2.responseBody"],
        ["json.parse", "$L4", "$L3"],
        ["create", "$L9", "Number"],
        ["size", "$L9", "$L4.data"],
        ["create", "$P1", "Array"],
        ["if!=than", "$L9", 0, 11],
        ["set", "$L5", "$L4.data.items"],
        ["create", "$L6", "Number"],
        ["size", "$L6", "$L5"],
        ["create", "$L7", "Number", 0],
        ["if<than", "$L7", "$L6", 6],
        ["create", "$L8", "Object"],
        ["get", "$L8", "$L5", "$L7"],
        ["string.concat", "$L9", "facebook-", "$L8.id"],
        ["push", "$P1", "$L9"],
        ["math.add", "$L7", "$L7", 1],
        ["jumpRel", -7]
    ],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["set", "$P0.userInfo", null],
        ["if!=than", "$S0.accessToken", null, 11],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "DELETE"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "https://graph.facebook.com/v2.8/me/permissions"],
        ["set", "$L0.url", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"],
        ["set", "$S0.accessToken", null]
    ],
    "Profile:getIdentifier": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["string.concat", "$P1", "facebook-", "$P0.userInfo.id"]
    ],
    "Profile:getFullName": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["if!=than", "$P0.userInfo.name", null, 1],
        ["set", "$P1", "$P0.userInfo.name"]
    ],
    "Profile:getEmail": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["if!=than", "$P0.userInfo.email", null, 1],
        ["set", "$P1", "$P0.userInfo.email"]
    ],
    "Profile:getGender": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["if!=than", "$P0.userInfo.gender", null, 7],
        ["if==than", "$P0.userInfo.gender", "male", 2],
        ["set", "$P1", "$P0.userInfo.gender"],
        ["return"],
        ["if==than", "$P0.userInfo.gender", "female", 2],
        ["set", "$P1", "$P0.userInfo.gender"],
        ["return"],
        ["set", "$P1", "other"]
    ],
    "Profile:getDescription": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["if!=than", "$P0.userInfo.about", null, 1],
        ["set", "$P1", "$P0.userInfo.about"]
    ],
    "Profile:getDateOfBirth": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["create", "$P1", "DateOfBirth"],
        ["if!=than", "$P0.userInfo.birthday", null, 10],
        ["string.split", "$L0", "$P0.userInfo.birthday", "/"],
        ["get", "$L1", "$L0", 0],
        ["if!=than", "$L1", "00", 1],
        ["math.add", "$P1.month", "$L1", 0],
        ["get", "$L1", "$L0", 1],
        ["if!=than", "$L1", "00", 1],
        ["math.add", "$P1.day", "$L1", 0],
        ["get", "$L1", "$L0", 2],
        ["if!=than", "$L1", "0000", 1],
        ["math.add", "$P1.year", "$L1", 0]
    ],
    "Profile:getLocale": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["if!=than", "$P0.userInfo.locale", null, 3],
        ["create", "$L1", "String"],
        ["string.substring", "$L1", "$P0.userInfo.locale", 0, 2],
        ["set", "$P1", "$L1"]
    ],
    "Profile:getPictureURL": [
        ["callFunc", "checkUserInfo", "$P0"],
        ["if!=than", "$P0.userInfo.picture.data.url", null, 1],
        ["set", "$P1", "$P0.userInfo.picture.data.url"]
    ],
    "checkUserInfo": [
        ["create", "$L0", "Date"],
        ["if!=than", "$P0.userInfo", null, 2],
        ["if>than", "$P0.expirationTime", "$L0", 1],
        ["return"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L2", "Object"],
        ["set", "$L2.url", "https://graph.facebook.com/v2.8/me?fields=locale,gender,name,birthday,email,about"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["set", "$L2.method", "GET"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L3"],
        ["json.parse", "$P0.userInfo", "$L3.responseBody"],
        ["create", "$L2", "Object"],
        ["set", "$L2.url", "https://graph.facebook.com/v2.8/me/picture?fields=url&type=large&redirect=false"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["set", "$L2.method", "GET"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L3"],
        ["json.parse", "$L4", "$L3.responseBody"],
        ["set", "$P0.userInfo.picture", "$L4"],
        ["create", "$P0.expirationTime", "Date"],
        ["math.add", "$P0.expirationTime.time", "$P0.expirationTime.time", 60000]
    ],
    "checkAuthentication": [
        ["create", "$L0", "Date"],
        ["if==than", "$S0.accessToken", null, 2],
        ["callFunc", "authenticate", "$P0"],
        ["return"],
        ["create", "$L1", "Date"],
        ["set", "$L1.time", "$S0.expireIn"],
        ["if<than", "$L1", "$L0", 1],
        ["callFunc", "authenticate", "$P0"]
    ],
    "authenticate": [
        ["create", "$L0", "String"],
        ["create", "$L1", "String"],
        ["string.urlEncode", "$L3", "$P0.redirectUri"],
        ["string.concat", "$L0", "https://www.facebook.com/dialog/oauth?response_type=code&client_id=", "$P0.clientId", "&redirect_uri=", "$L3", "&state=", "$P0.state", "&scope=", "$P0.scope"],
        ["awaitCodeRedirect", "$L2", "$L0", null, "$P0.redirectUri"],
        ["string.concat", "$L1", "https://graph.facebook.com/v2.8/oauth/access_token?client_id=", "$P0.clientId", "&redirect_uri=", "$L3", "&client_secret=", "$P0.clientSecret", "&code=", "$L2"],
        ["create", "$L5", "Object"],
        ["set", "$L5.url", "$L1"],
        ["set", "$L5.method", "GET"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "validateResponse", "$P0", "$L6"],
        ["stream.streamToString", "$L7", "$L6.responseBody"],
        ["json.parse", "$L8", "$L7"],
        ["set", "$S0.accessToken", "$L8.access_token"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "https://graph.facebook.com/v2.8/oauth/access_token?client_id=", "$P0.clientId", "&client_secret=", "$P0.clientSecret", "&grant_type=fb_exchange_token&fb_exchange_token=", "$S0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["set", "$S0.accessToken", "$L2.access_token"],
        ["create", "$L10", "Date"],
        ["math.multiply", "$L9", 60, 24, 60, 60, 1000],
        ["math.add", "$L9", "$L9", "$L10.time", -60000],
        ["set", "$S0.expireIn", "$L9"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 3],
        ["stream.streamToString", "$L2", "$P1.responseBody"],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"]
    ]
};
var Facebook = (function () {
    function Facebook(redirectReceiver, clientId, clientSecret, redirectUri, state, scopes) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Facebook");
        this.interpreterStorage["clientId"] = clientId;
        this.interpreterStorage["clientSecret"] = clientSecret;
        this.interpreterStorage["redirectUri"] = redirectUri;
        this.interpreterStorage["state"] = state;
        this.interpreterStorage["scopes"] = scopes;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Facebook.prototype.getIdentifier = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getIdentifier");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getIdentifier", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getIdentifier");
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
    Facebook.prototype.getFullName = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getFullName");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getFullName", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getFullName");
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
    Facebook.prototype.getEmail = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getEmail");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getEmail", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getEmail");
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
    Facebook.prototype.getGender = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getGender");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getGender", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getGender");
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
    Facebook.prototype.getDescription = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getDescription");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDescription", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getDescription");
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
    Facebook.prototype.getDateOfBirth = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getDateOfBirth");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDateOfBirth", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getDateOfBirth");
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
    Facebook.prototype.getLocale = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getLocale");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getLocale", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getLocale");
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
    Facebook.prototype.getPictureURL = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getPictureURL");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getPictureURL", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getPictureURL");
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
    Facebook.prototype.login = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "login");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:login", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "login");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Facebook.prototype.logout = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "logout");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:logout", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "logout");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Facebook.prototype.postUpdate = function (content, callback) {
        Statistics_1.Statistics.addCall("Facebook", "postUpdate");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:postUpdate", this.interpreterStorage, content).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "postUpdate");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Facebook.prototype.postImage = function (message, image, callback) {
        Statistics_1.Statistics.addCall("Facebook", "postImage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:postImage", this.interpreterStorage, message, image).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "postImage");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Facebook.prototype.postVideo = function (message, video, size, mimeType, callback) {
        Statistics_1.Statistics.addCall("Facebook", "postVideo");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:postVideo", this.interpreterStorage, message, video, size, mimeType).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "postVideo");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Facebook.prototype.getConnections = function (callback) {
        Statistics_1.Statistics.addCall("Facebook", "getConnections");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:getConnections", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "getConnections");
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
    Facebook.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("Facebook", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Facebook", "advancedRequest");
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
    Facebook.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Facebook", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Facebook.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Facebook", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Facebook.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Facebook", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Facebook;
}());
exports.Facebook = Facebook;
