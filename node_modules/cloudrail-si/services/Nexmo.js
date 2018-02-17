"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["set", "$P0.baseUrl", "https://rest.nexmo.com"]
    ],
    "SendNexmoSMS": [
        ["callFunc", "validateUserInput", "$P0", "$P1", "$P2", "$P3"],
        ["create", "$L0", "Object"],
        ["create", "$L1", "Object"],
        ["create", "$L2", "Object"],
        ["create", "$L3", "String"],
        ["create", "$L4", "String"],
        ["string.urlEncode", "$L3", "$P3"],
        ["string.urlEncode", "$L5", "$P1"],
        ["string.concat", "$L0.url", "$P0.baseUrl", "/sms/json?api_key=", "$P0.clientId", "&api_secret=", "$P0.clientSecret", "&to=", "$P2", "&from=", "$L5", "&text=", "$L3"],
        ["set", "$L0.method", "POST"],
        ["set", "$L1.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L1.Content-Length", "0"],
        ["set", "$L0.requestHeaders", "$L1"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkError", "$P0", "$L2", 1]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["if!=than", "$P2.appendBaseUrl", 0, 2],
        ["string.concat", "$L0.url", "$P0.baseUrl", "$P2.url"],
        ["jumpRel", 1],
        ["set", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if==than", "$L0.requestHeaders", null, 1],
        ["create", "$L0.requestHeaders", "Object"],
        ["if!=than", "$P2.appendAuthorization", 0, 6],
        ["string.indexOf", "$L1", "$L0.url", "?"],
        ["if==than", "$L1", -1, 2],
        ["string.concat", "$L0.url", "$L0.url", "?"],
        ["jumpRel", 1],
        ["string.concat", "$L0.url", "$L0.url", "&"],
        ["string.concat", "$L0.url", "$L0.url", "api_key=", "$P0.clientId", "&api_secret=", "$P0.clientSecret"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "checkError", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "validateUserInput": [
        ["if==than", "$P1", null, 2],
        ["create", "$L1", "Error", "One of the arguments is 'null'. You need to assign a value to it.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["if==than", "$P2", null, 2],
        ["create", "$L1", "Error", "One of the arguments is 'null'. You need to assign a value to it.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["if==than", "$P3", null, 2],
        ["create", "$L1", "Error", "One of the arguments is 'null'. You need to assign a value to it.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P1"],
        ["if==than", "$L2", 0, 2],
        ["create", "$L1", "Error", "The 'From' number parameter is empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P2"],
        ["if==than", "$L2", 0, 2],
        ["create", "$L1", "Error", "The 'To' number parameter is empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P3"],
        ["if==than", "$L2", 0, 2],
        ["create", "$L1", "Error", "The message is empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P1"],
        ["if>than", "$L2", 16, 2],
        ["create", "$L1", "Error", "The 'From' phone number is too big, it should have maximum 15 digits. Example: +16175551212", "IllegalArgument"],
        ["throwError", "$L1"],
        ["string.lastIndexOf", "$L0", "$P2", "+"],
        ["if!=than", "$L0", 0, 2],
        ["create", "$L1", "Error", "The 'To' phone number isn't in E.164 format. Example: +16175551212", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P2"],
        ["if>than", "$L2", 16, 2],
        ["create", "$L1", "Error", "The 'To' phone number is too big, it should have maximum 15 digits. Example: +16175551212", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P3"],
        ["if>than", "$L2", 1600, 2],
        ["create", "$L1", "Error", "The length of the message exceeds the 1600 allowed characters.", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkError": [
        ["if>=than", "$P1.code", 400, 8],
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L3", "Error", "Invalid credentials or access rights. Make sure that your application has read and write permission.", "Authentication"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 2],
        ["create", "$L3", "Error", "Service unavailable. Try again later.", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["create", "$L3", "Error", "$P1.message", "Http"],
        ["throwError", "$L3"],
        ["if!=than", "$P2", null, 8],
        ["stream.streamToString", "$L11", "$P1.responseBody"],
        ["create", "$L12", "Object"],
        ["json.parse", "$L12", "$L11"],
        ["set", "$L13", "$L12.messages.0.status"],
        ["set", "$L14", "$L12.messages.0.error-text"],
        ["if!=than", "$L13", "0", 2],
        ["create", "$L15", "Error", "$L14", "Http"],
        ["throwError", "$L15"]
    ]
};
var Nexmo = (function () {
    function Nexmo(redirectReceiver, clientId, clientSecret) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Nexmo");
        this.interpreterStorage["clientId"] = clientId;
        this.interpreterStorage["clientSecret"] = clientSecret;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Nexmo.prototype.sendSMS = function (fromName, toNumber, content, callback) {
        Statistics_1.Statistics.addCall("Nexmo", "sendSMS");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("SendNexmoSMS", this.interpreterStorage, fromName, toNumber, content).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Nexmo", "sendSMS");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Nexmo.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("Nexmo", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Nexmo", "advancedRequest");
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
    Nexmo.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Nexmo", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Nexmo.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Nexmo", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Nexmo.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Nexmo", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Nexmo;
}());
exports.Nexmo = Nexmo;
