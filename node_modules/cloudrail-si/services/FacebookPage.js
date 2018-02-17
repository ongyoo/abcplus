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
        ["set", "$P0.scope", "manage_pages%2Cpublish_pages%2Cpages_show_list"],
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
        ["string.concat", "$L1", "https://graph.facebook.com/v2.8/", "$S0.pageId", "/feed?message=", "$L3"],
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
        ["string.concat", "$L0.url", "https://graph.facebook.com/v2.8/", "$S0.pageId", "/photos"],
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
        ["string.concat", "$L0.url", "https://graph-video.facebook.com/v2.8/", "$S0.pageId", "/videos"],
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
    "Social:getConnections": [],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["set", "$P0.userInfo", null],
        ["if!=than", "$S0.accessToken", null, 10],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "DELETE"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "https://graph.facebook.com/v2.8/me/permissions"],
        ["set", "$L0.url", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"]
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
    "checkAuthentication": [
        ["if==than", "$S0.accessToken", null, 1],
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
        ["callFunc", "getPageCredentials", "$P0", "$L2.access_token"]
    ],
    "getPageCredentials": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "https://graph.facebook.com/v2.8/me/accounts", "?access_token=", "$P1"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["set", "$L3", "$L2.data"],
        ["size", "$L4", "$L3"],
        ["create", "$L5", "Number", 0],
        ["if<than", "$L5", "$L4", 7],
        ["get", "$L6", "$L3", "$L5"],
        ["if==than", "$L6.name", "$P0.pageName", 3],
        ["set", "$S0.accessToken", "$L6.access_token"],
        ["set", "$S0.pageId", "$L6.id"],
        ["jumpRel", 2],
        ["math.add", "$L5", "$L5", 1],
        ["jumpRel", -8],
        ["if==than", "$S0.accessToken", null, 2],
        ["create", "$L7", "Error", "The page was not found or the signed in user is not an admin of that page.", "IllegalArgument"],
        ["throwError", "$L7"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 3],
        ["stream.streamToString", "$L2", "$P1.responseBody"],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"]
    ]
};
var FacebookPage = (function () {
    function FacebookPage(redirectReceiver, pageName, clientId, clientSecret, redirectUri, state, scopes) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("FacebookPage");
        this.interpreterStorage["pageName"] = pageName;
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
    FacebookPage.prototype.postUpdate = function (content, callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "postUpdate");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:postUpdate", this.interpreterStorage, content).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "postUpdate");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    FacebookPage.prototype.postImage = function (message, image, callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "postImage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:postImage", this.interpreterStorage, message, image).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "postImage");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    FacebookPage.prototype.postVideo = function (message, video, size, mimeType, callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "postVideo");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:postVideo", this.interpreterStorage, message, video, size, mimeType).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "postVideo");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    FacebookPage.prototype.getConnections = function (callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "getConnections");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Social:getConnections", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "getConnections");
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
    FacebookPage.prototype.login = function (callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "login");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:login", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "login");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    FacebookPage.prototype.logout = function (callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "logout");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:logout", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "logout");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    FacebookPage.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookPage", "advancedRequest");
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
    FacebookPage.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("FacebookPage", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    FacebookPage.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("FacebookPage", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    FacebookPage.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("FacebookPage", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return FacebookPage;
}());
exports.FacebookPage = FacebookPage;
