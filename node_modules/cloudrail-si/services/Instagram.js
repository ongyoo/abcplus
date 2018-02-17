"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["if==than", "$P0.scopes", null, 2],
        ["set", "$P0.scope", "basic"],
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
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "https://api.instagram.com/v1"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if!=than", "$P2.appendAuthorization", 0, 6],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.indexOf", "$L2", "$P2.url", "?"],
        ["if==than", "$L2", -1, 2],
        ["string.concat", "$L0.url", "$L0.url", "?access_token=", "$S0.accessToken"],
        ["jumpRel", 1],
        ["string.concat", "$L0.url", "$L0.url", "&access_token=", "$S0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["set", "$S0.accessToken", null]
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
        ["set", "$P1", null]
    ],
    "Profile:getGender": [
        ["set", "$P1", null]
    ],
    "Profile:getDateOfBirth": [
        ["create", "$P1", "DateOfBirth"]
    ],
    "Profile:getLocale": [],
    "checkAuthentication": [
        ["if==than", "$S0.accessToken", null, 1],
        ["callFunc", "authenticate", "$P0"]
    ],
    "authenticate": [
        ["create", "$L2", "String"],
        ["string.concat", "$L0", "https://api.instagram.com/oauth/authorize/?client_id=", "$P0.clientId", "&response_type=code&redirect_uri=", "$P0.redirectUri", "&scope=", "$P0.scope", "&state=", "$P0.state"],
        ["awaitCodeRedirect", "$L1", "$L0", null, "$P0.redirectUri"],
        ["string.concat", "$L2", "--------------------------c77df4126e3a1dc1\r\n"],
        ["string.concat", "$L2", "$L2", "Content-Disposition: form-data; name=\"client_id\"\r\n\r\n"],
        ["string.concat", "$L2", "$L2", "$P0.clientId", "\r\n"],
        ["string.concat", "$L2", "$L2", "--------------------------c77df4126e3a1dc1\r\n"],
        ["string.concat", "$L2", "$L2", "Content-Disposition: form-data; name=\"client_secret\"\r\n\r\n"],
        ["string.concat", "$L2", "$L2", "$P0.clientSecret", "\r\n"],
        ["string.concat", "$L2", "$L2", "--------------------------c77df4126e3a1dc1\r\n"],
        ["string.concat", "$L2", "$L2", "Content-Disposition: form-data; name=\"grant_type\"\r\n\r\n"],
        ["string.concat", "$L2", "$L2", "authorization_code\r\n"],
        ["string.concat", "$L2", "$L2", "--------------------------c77df4126e3a1dc1\r\n"],
        ["string.concat", "$L2", "$L2", "Content-Disposition: form-data; name=\"redirect_uri\"\r\n\r\n"],
        ["string.concat", "$L2", "$L2", "$P0.redirectUri", "\r\n"],
        ["string.concat", "$L2", "$L2", "--------------------------c77df4126e3a1dc1\r\n"],
        ["string.concat", "$L2", "$L2", "Content-Disposition: form-data; name=\"code\"\r\n\r\n"],
        ["string.concat", "$L2", "$L2", "$L1", "\r\n"],
        ["string.concat", "$L2", "$L2", "--------------------------c77df4126e3a1dc1--\r\n"],
        ["stream.stringToStream", "$L3", "$L2"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "multipart/form-data; boundary=------------------------c77df4126e3a1dc1", "Content-Type"],
        ["size", "$L20", "$L2"],
        ["string.concat", "$L4.Content-Length", "$L20"],
        ["create", "$L5", "Object"],
        ["set", "$L5.url", "https://api.instagram.com/oauth/access_token"],
        ["set", "$L5.method", "POST"],
        ["set", "$L5.requestBody", "$L3"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "validateResponse", "$P0", "$L6"],
        ["stream.streamToString", "$L7", "$L6.responseBody"],
        ["json.parse", "$L8", "$L7"],
        ["set", "$S0.accessToken", "$L8.access_token"]
    ],
    "parseUser": [
        ["create", "$L0", "Object"],
        ["create", "$L1", "Date"],
        ["math.add", "$L0.expires", "$L1.time", 60000],
        ["string.concat", "$L0.id", "instagram-", "$P1.id"],
        ["set", "$L0.fullName", "$P1.full_name"],
        ["set", "$L0.pictureURL", "$P1.profile_picture"],
        ["set", "$L0.description", "$P1.bio"],
        ["set", "$P0.userInfo", "$L0"]
    ],
    "updateUserInfo": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["if!=than", "$P0.userInfo", null, 3],
        ["create", "$L0", "Date"],
        ["if<than", "$L0.time", "$P0.userInfo.expires", 1],
        ["return"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "https://api.instagram.com/v1/users/self/?access_token=", "$S0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "parseUser", "$P0", "$L2.data"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 6],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["set", "$L2", "$L0.error_message"],
        ["if==than", "$L2", null, 1],
        ["set", "$L2", "$L0.meta.error_message"],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"]
    ]
};
var Instagram = (function () {
    function Instagram(redirectReceiver, clientId, clientSecret, redirectUri, state, scopes) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Instagram");
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
    Instagram.prototype.getIdentifier = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getIdentifier");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getIdentifier", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getIdentifier");
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
    Instagram.prototype.getFullName = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getFullName");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getFullName", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getFullName");
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
    Instagram.prototype.getEmail = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getEmail");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getEmail", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getEmail");
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
    Instagram.prototype.getGender = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getGender");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getGender", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getGender");
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
    Instagram.prototype.getDescription = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getDescription");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDescription", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getDescription");
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
    Instagram.prototype.getDateOfBirth = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getDateOfBirth");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDateOfBirth", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getDateOfBirth");
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
    Instagram.prototype.getLocale = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getLocale");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getLocale", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getLocale");
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
    Instagram.prototype.getPictureURL = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "getPictureURL");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getPictureURL", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "getPictureURL");
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
    Instagram.prototype.login = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "login");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:login", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "login");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Instagram.prototype.logout = function (callback) {
        Statistics_1.Statistics.addCall("Instagram", "logout");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:logout", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "logout");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Instagram.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("Instagram", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Instagram", "advancedRequest");
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
    Instagram.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Instagram", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Instagram.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Instagram", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Instagram.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Instagram", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Instagram;
}());
exports.Instagram = Instagram;
