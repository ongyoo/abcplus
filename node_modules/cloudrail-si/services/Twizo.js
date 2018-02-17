"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["set", "$P0.baseUrl", "https://api-asia-01.twizo.com"]
    ],
    "sendSMS": [
        ["callFunc", "validateUserInput", "$P0", "$P1", "$P2", "$P3"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["string.concat", "$L0.url", "$P0.baseUrl", "/sms/submitsimple"],
        ["create", "$L1", "Object"],
        ["set", "$L0.requestHeaders", "$L1"],
        ["set", "$L1.Accept", "application/json"],
        ["set", "$L1.Content-Type", "application/json; charset=utf8"],
        ["string.concat", "$L2", "twizo:", "$P0.key"],
        ["string.base64encode", "$L3", "$L2"],
        ["string.concat", "$L1.Authorization", "Basic ", "$L3"],
        ["create", "$L2", "Object"],
        ["set", "$L2.tag", "cloudrail"],
        ["set", "$L2.body", "$P3"],
        ["set", "$L2.sender", "$P1"],
        ["create", "$L3", "Array"],
        ["push", "$L3", "$P2"],
        ["set", "$L2.recipients", "$L3"],
        ["json.stringify", "$L4", "$L2"],
        ["stream.stringToStream", "$L0.requestBody", "$L4"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"]
    ],
    "validateUserInput": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "The sender name is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P2", null, 2],
        ["create", "$L0", "Error", "The recipient is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P3", null, 2],
        ["create", "$L0", "Error", "The content is not allowed to be null.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P1", "", 2],
        ["create", "$L0", "Error", "The sender name is not allowed to be empty.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P2", "", 2],
        ["create", "$L0", "Error", "The recipient is not allowed to be empty.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P3", "", 2],
        ["create", "$L0", "Error", "The content is not allowed to be empty.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 4],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["json.stringify", "$L0", "$L0"],
        ["create", "$L2", "Error", "$L0", "Http"],
        ["throwError", "$L2"]
    ]
};
var Twizo = (function () {
    function Twizo(redirectReceiver, key) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Twizo");
        this.interpreterStorage["key"] = key;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Twizo.prototype.sendSMS = function (fromName, toNumber, content, callback) {
        Statistics_1.Statistics.addCall("Twizo", "sendSMS");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendSMS", this.interpreterStorage, fromName, toNumber, content).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Twizo", "sendSMS");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Twizo.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Twizo", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Twizo.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Twizo", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Twizo.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Twizo", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Twizo;
}());
exports.Twizo = Twizo;
