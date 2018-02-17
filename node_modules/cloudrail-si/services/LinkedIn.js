"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["if==than", "$P0.scopes", null, 2],
        ["set", "$P0.scope", "r_basicprofile%20r_emailaddress"],
        ["jumpRel", 10],
        ["create", "$P0.scope", "String"],
        ["size", "$L0", "$P0.scopes"],
        ["create", "$L1", "Number", 0],
        ["if<than", "$L1", "$L0", 6],
        ["if!=than", "$L1", 0, 1],
        ["string.concat", "$P0.scope", "$P0.scope", "%20"],
        ["get", "$L2", "$P0.scopes", "$L1"],
        ["string.concat", "$P0.scope", "$P0.scope", "$L2"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -7]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "https://api.linkedin.com/v1"],
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
    "getLIIdentifier": [
        ["callFunc", "checkUserData", "$P0"],
        ["string.concat", "$P1", "linkedin-", "$P0.userData.id"]
    ],
    "getLIFullName": [
        ["callFunc", "checkUserData", "$P0"],
        ["string.concat", "$P1", "$P0.userData.firstName", " ", "$P0.userData.lastName"]
    ],
    "getLIEmail": [
        ["callFunc", "checkUserData", "$P0"],
        ["set", "$P1", "$P0.userData.emailAddress"]
    ],
    "getLIGender": [],
    "getLIDescription": [
        ["callFunc", "checkUserData", "$P0"],
        ["set", "$P1", "$P0.userData.summary"]
    ],
    "getLIDateOfBirth": [
        ["callFunc", "checkUserData", "$P0"],
        ["create", "$L0", "DateOfBirth"],
        ["if!=than", "$P0.userData.dateOfBirth", null, 6],
        ["if!=than", "$P0.userData.dateOfBirth.day", null, 1],
        ["set", "$L0.day", "$P0.userData.dateOfBirth.day"],
        ["if!=than", "$P0.userData.dateOfBirth.month", null, 1],
        ["set", "$L0.month", "$P0.userData.dateOfBirth.month"],
        ["if!=than", "$P0.userData.dateOfBirth.year", null, 1],
        ["set", "$L0.year", "$P0.userData.dateOfBirth.year"],
        ["set", "$P1", "$L0"]
    ],
    "getLILocale": [],
    "getLIPictureURL": [
        ["callFunc", "checkUserData", "$P0"],
        ["set", "$P1", "$P0.userData.pictureUrl"]
    ],
    "loginLI": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "logoutLI": [
        ["set", "$S0.accessToken", null],
        ["set", "$P0.userData", null]
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
        ["string.concat", "$L0", "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=", "$P0.clientId", "&redirect_uri=", "$P0.redirectUri", "&state=", "$P0.state", "&scope=", "$P0.scope"],
        ["awaitCodeRedirect", "$L2", "$L0", null, "$P0.redirectUri"],
        ["string.concat", "$L1", "grant_type=authorization_code&code=", "$L2", "&redirect_uri=", "$P0.redirectUri", "&client_id=", "$P0.clientId", "&client_secret=", "$P0.clientSecret"],
        ["size", "$L15", "$L1"],
        ["string.concat", "$L15", "$L15"],
        ["stream.stringToStream", "$L3", "$L1"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "application/x-www-form-urlencoded", "Content-Type"],
        ["set", "$L4.Content-Length", "$L15"],
        ["create", "$L5", "Object"],
        ["set", "$L5.url", "https://www.linkedin.com/uas/oauth2/accessToken"],
        ["set", "$L5.method", "POST"],
        ["set", "$L5.requestBody", "$L3"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "validateResponse", "$P0", "$L6"],
        ["stream.streamToString", "$L7", "$L6.responseBody"],
        ["json.parse", "$L8", "$L7"],
        ["set", "$S0.accessToken", "$L8.access_token"],
        ["create", "$L10", "Date"],
        ["math.multiply", "$L9", "$L8.expires_in", 1000],
        ["math.add", "$L9", "$L9", "$L10.time", -60000],
        ["set", "$S0.expireIn", "$L9"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 20],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["set", "$L2", "$L0.message"],
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L3", "Error", "$L2", "Authentication"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 400, 2],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"],
        ["if>=than", "$P1.code", 402, 5],
        ["if<=than", "$P1.code", 509, 4],
        ["if!=than", "$P1.code", 503, 3],
        ["if!=than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 2],
        ["create", "$L3", "Error", "$L2", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["throwError", "$L3"]
    ],
    "getUserData": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,summary,picture-url)?format=json"],
        ["set", "$L0.url", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"],
        ["create", "$L3", "String"],
        ["stream.streamToString", "$L3", "$L2.responseBody"],
        ["create", "$L4", "Object"],
        ["json.parse", "$L4", "$L3"],
        ["create", "$L5", "Date"],
        ["math.add", "$L6", "$L5.time", 60000],
        ["set", "$L4.expirationTime", "$L6"],
        ["set", "$P0.userData", "$L4"]
    ],
    "checkUserData": [
        ["create", "$L0", "Date"],
        ["if!=than", "$P0.userData", null, 2],
        ["if>=than", "$P0.userData.expirationTime", "$L0.time", 1],
        ["return"],
        ["callFunc", "getUserData", "$P0"]
    ]
};
var LinkedIn = (function () {
    function LinkedIn(redirectReceiver, clientId, clientSecret, redirectUri, state, scopes) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("LinkedIn");
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
    LinkedIn.prototype.getIdentifier = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getIdentifier");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIIdentifier", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getIdentifier");
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
    LinkedIn.prototype.getFullName = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getFullName");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIFullName", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getFullName");
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
    LinkedIn.prototype.getEmail = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getEmail");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIEmail", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getEmail");
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
    LinkedIn.prototype.getGender = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getGender");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIGender", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getGender");
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
    LinkedIn.prototype.getDescription = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getDescription");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIDescription", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getDescription");
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
    LinkedIn.prototype.getDateOfBirth = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getDateOfBirth");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIDateOfBirth", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getDateOfBirth");
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
    LinkedIn.prototype.getLocale = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getLocale");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLILocale", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getLocale");
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
    LinkedIn.prototype.getPictureURL = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "getPictureURL");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getLIPictureURL", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "getPictureURL");
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
    LinkedIn.prototype.login = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "login");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("loginLI", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "login");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    LinkedIn.prototype.logout = function (callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "logout");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("logoutLI", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "logout");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    LinkedIn.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "LinkedIn", "advancedRequest");
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
    LinkedIn.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("LinkedIn", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    LinkedIn.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("LinkedIn", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    LinkedIn.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("LinkedIn", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return LinkedIn;
}());
exports.LinkedIn = LinkedIn;
