"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["set", "$P0.baseUrl", "https://api.producthunt.com/v1"],
        ["string.concat", "$P0.authUrl", "$P0.baseUrl", "/oauth"],
        ["string.urlEncode", "$P0.redirectUriEncoded", "$P0.redirectUri"],
        ["if==than", "$P0.scopes", null, 2],
        ["set", "$P0.scope", "public+private"],
        ["jumpRel", 10],
        ["create", "$P0.scope", "String"],
        ["size", "$L0", "$P0.scopes"],
        ["create", "$L1", "Number", 0],
        ["if<than", "$L1", "$L0", 6],
        ["if!=than", "$L1", 0, 1],
        ["string.concat", "$P0.scope", "$P0.scope", "+"],
        ["get", "$L2", "$P0.scopes", "$L1"],
        ["string.concat", "$P0.scope", "$P0.scope", "$L2"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -7]
    ],
    "Profile:getIdentifier": [
        ["callFunc", "updateUserInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.id"]
    ],
    "Profile:getFullName": [
        ["callFunc", "updateUserInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.fullName"]
    ],
    "Profile:getPictureURL": [
        ["callFunc", "updateUserInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.pictureURL"]
    ],
    "Profile:getDescription": [
        ["callFunc", "updateUserInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.description"]
    ],
    "Profile:getEmail": [
        ["callFunc", "updateUserInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.email"]
    ],
    "Profile:getGender": [],
    "Profile:getDateOfBirth": [
        ["create", "$P1", "DateOfBirth"]
    ],
    "Profile:getLocale": [],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["set", "$S0.accessToken", null]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "$P0.baseUrl"],
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
    "checkAuthentication": [
        ["if==than", "$S0.accessToken", null, 1],
        ["callFunc", "authenticate", "$P0"]
    ],
    "authenticate": [
        ["string.concat", "$L0", "$P0.authUrl", "/authorize?client_id=", "$P0.clientId", "&redirect_uri=", "$P0.redirectUriEncoded", "&response_type=code&scope=", "$P0.scope"],
        ["awaitCodeRedirect", "$L1", "$L0", null, "$P0.redirectUri"],
        ["create", "$L2", "Object"],
        ["set", "$L2.method", "POST"],
        ["string.concat", "$L2.url", "$P0.authUrl", "/token"],
        ["create", "$L3", "Object"],
        ["set", "$L3.client_id", "$P0.clientId"],
        ["set", "$L3.client_secret", "$P0.clientSecret"],
        ["set", "$L3.redirect_uri", "$P0.redirectUri"],
        ["set", "$L3.grant_type", "authorization_code"],
        ["set", "$L3.code", "$L1"],
        ["json.stringify", "$L4", "$L3"],
        ["stream.stringToStream", "$L2.requestBody", "$L4"],
        ["create", "$L4", "Object"],
        ["set", "$L4.Accept", "application/json"],
        ["set", "$L4.Content-Type", "application/json"],
        ["set", "$L2.requestHeaders", "$L4"],
        ["http.requestCall", "$L5", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L5"],
        ["json.parse", "$L6", "$L5.responseBody"],
        ["set", "$S0.accessToken", "$L6.access_token"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 3],
        ["stream.streamToString", "$L0", "$P1.responseBody"],
        ["create", "$L1", "Error", "$L0", "Http"],
        ["throwError", "$L1"]
    ],
    "updateUserInfo": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["if!=than", "$P0.userInfo", null, 3],
        ["create", "$L0", "Date"],
        ["if<than", "$L0.time", "$P0.userInfo.expires", 1],
        ["return"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "$P0.baseUrl", "/me"],
        ["create", "$L1", "Object"],
        ["string.concat", "$L1.Authorization", "Bearer ", "$S0.accessToken"],
        ["set", "$L0.requestHeaders", "$L1"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "parseUser", "$P0", "$L2.user"]
    ],
    "parseUser": [
        ["create", "$L0", "Object"],
        ["create", "$L1", "Date"],
        ["math.add", "$L0.expires", "$L1.time", 60000],
        ["string.concat", "$L0.id", "producthunt-", "$P1.id"],
        ["set", "$L0.fullName", "$P1.name"],
        ["set", "$L0.pictureURL", "$P1.image_url.264px"],
        ["set", "$L0.description", "$P1.headline"],
        ["set", "$L0.email", "$P1.email"],
        ["set", "$P0.userInfo", "$L0"]
    ]
};
var ProductHunt = (function () {
    function ProductHunt(redirectReceiver, clientId, clientSecret, redirectUri, state, scopes) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("ProductHunt");
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
    ProductHunt.prototype.getIdentifier = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getIdentifier");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getIdentifier", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getIdentifier");
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
    ProductHunt.prototype.getFullName = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getFullName");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getFullName", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getFullName");
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
    ProductHunt.prototype.getEmail = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getEmail");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getEmail", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getEmail");
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
    ProductHunt.prototype.getGender = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getGender");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getGender", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getGender");
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
    ProductHunt.prototype.getDescription = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getDescription");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDescription", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getDescription");
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
    ProductHunt.prototype.getDateOfBirth = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getDateOfBirth");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDateOfBirth", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getDateOfBirth");
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
    ProductHunt.prototype.getLocale = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getLocale");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getLocale", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getLocale");
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
    ProductHunt.prototype.getPictureURL = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "getPictureURL");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getPictureURL", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "getPictureURL");
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
    ProductHunt.prototype.login = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "login");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:login", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "login");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    ProductHunt.prototype.logout = function (callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "logout");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:logout", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "logout");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    ProductHunt.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "ProductHunt", "advancedRequest");
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
    ProductHunt.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("ProductHunt", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    ProductHunt.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("ProductHunt", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    ProductHunt.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("ProductHunt", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return ProductHunt;
}());
exports.ProductHunt = ProductHunt;
