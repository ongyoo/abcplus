"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "https://api.line.me/v2/bot/message"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if==than", "$L0.requestHeaders", null, 1],
        ["create", "$L0.requestHeaders", "Object"],
        ["if!=than", "$P2.appendAuthorization", 0, 1],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "processWebhookRequest": [
        ["json.parse", "$L0", "$P2"],
        ["get", "$L1", "$L0.events", 0],
        ["if==than", "$L1.source.type", "user", 1],
        ["set", "$L2", "$L1.source.userId"],
        ["if==than", "$L1.type", "group", 1],
        ["set", "$L2", "$L1.source.groupId"],
        ["if==than", "$L1.type", "room", 1],
        ["set", "$L2", "$L1.source.roomId"],
        ["set", "$L3", null],
        ["if!=than", "$L1.message.longitude", null, 3],
        ["create", "$L3", "Location"],
        ["set", "$L3.Longitude", "$L1.message.longitude"],
        ["set", "$L3.Latitude", "$L1.message.latitude"],
        ["set", "$L4", null],
        ["if!=than", "$L1.message.type", "text", 3],
        ["create", "$L4", "Array"],
        ["create", "$L5", "MessagingAttachment", "$L1.message.id", "$L1.message.type", null, null, null],
        ["push", "$L4", "$L5"],
        ["create", "$L6", "Message"],
        ["if!=than", "$L1.message.id", null, 2],
        ["string.concat", "$L11", "$L1.message.id"],
        ["set", "$L6.MessageId", "$L11"],
        ["if!=than", "$L1.source.userId", null, 2],
        ["string.concat", "$L12", "$L1.source.userId"],
        ["set", "$L6.SenderId", "$L12"],
        ["if!=than", "$L2", null, 2],
        ["string.concat", "$L13", "$L2"],
        ["set", "$L6.ChatId", "$L13"],
        ["if!=than", "$L1.timestamp", null, 1],
        ["set", "$L6.SendAt", "$L1.timestamp"],
        ["if!=than", "$L1.message.text", null, 2],
        ["string.concat", "$L15", "$L1.message.text"],
        ["set", "$L6.MessageText", "$L15"],
        ["if!=than", "$L3", null, 1],
        ["set", "$L6.Location", "$L3"],
        ["if!=than", "$L4", null, 1],
        ["set", "$L6.Attachments", "$L4"],
        ["create", "$P1", "Array"],
        ["push", "$P1", "$L6"]
    ],
    "sendMessage": [
        ["callFunc", "checkMandatory", "$P3", "message text"],
        ["callFunc", "send", "$P0", "$P1", "text", "$P2", "$P3", null, null]
    ],
    "sendImage": [
        ["callFunc", "checkMandatory", "$P4", "content URL"],
        ["if==than", "$P6", null, 1],
        ["set", "$P6", "$P4"],
        ["callFunc", "send", "$P0", "$P1", "image", "$P2", "$P3", "$P4", "$P6"]
    ],
    "sendVideo": [
        ["callFunc", "checkMandatory", "$P4", "content URL"],
        ["if==than", "$P6", null, 1],
        ["set", "$P6", "https://webhooks.cloudrail.com/home/ubuntu/server/media/cloudrail_preview.png"],
        ["callFunc", "send", "$P0", "$P1", "video", "$P2", "$P3", "$P4", "$P6"]
    ],
    "sendAudio": [
        ["callFunc", "checkMandatory", "$P4", "content URL"],
        ["if==than", "$P6", null, 1],
        ["set", "$P6", "https://webhooks.cloudrail.com/home/ubuntu/server/media/cloudrail_preview.png"],
        ["callFunc", "send", "$P0", "$P1", "audio", "$P2", "$P3", "$P4", "$P6"]
    ],
    "sendFile": [],
    "sendCarousel": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["set", "$L0.url", "https://api.line.me/v2/bot/message/push"],
        ["create", "$L1", "Object"],
        ["set", "$L1.to", "$P2"],
        ["create", "$L1.messages", "Array"],
        ["create", "$L2", "Object"],
        ["set", "$L2.type", "template"],
        ["set", "$L2.altText", "this is a template message"],
        ["create", "$L2.template", "Object"],
        ["set", "$L2.template.type", "carousel"],
        ["create", "$L2.template.columns", "Array"],
        ["create", "$L3", "Number", 0],
        ["size", "$L4", "$P3"],
        ["if<than", "$L3", "$L4", 21],
        ["get", "$L5", "$P3", "$L3"],
        ["create", "$L6", "Object"],
        ["set", "$L6.thumbnailImageUrl", "$L5.mediaUrl"],
        ["set", "$L6.title", "$L5.title"],
        ["set", "$L6.text", "$L5.subTitle"],
        ["create", "$L6.actions", "Array"],
        ["set", "$L7", 0],
        ["size", "$L8", "$L5.buttons"],
        ["if<than", "$L7", "$L8", 9],
        ["get", "$L9", "$L5.buttons", "$L7"],
        ["create", "$L10", "Object"],
        ["set", "$L10.type", "$L9.type"],
        ["set", "$L10.label", "$L9.text"],
        ["set", "$L10.data", "$L9.payload"],
        ["set", "$L10.uri", "$L9.url"],
        ["push", "$L6.actions", "$L10"],
        ["math.add", "$L7", "$L7", 1],
        ["jumpRel", -10],
        ["push", "$L2.template.columns", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -22],
        ["push", "$L1.messages", "$L2"],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["size", "$L11", "$L1"],
        ["string.concat", "$L12", "$L11"],
        ["set", "$L0.requestHeaders.Content-Length", "$L12"],
        ["create", "$L13", "Object"],
        ["http.requestCall", "$L13", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L13"],
        ["create", "$L14", "Date"],
        ["set", "$L14", "$L14.time"],
        ["create", "$P1", "Message"],
        ["set", "$P1.ChatId", "$P2"],
        ["set", "$P1.SendAt", "$L14"]
    ],
    "downloadContent": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "https://api.line.me/v2/bot/message/", "$P2.id", "/content"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["set", "$P1", "$P2"],
        ["set", "$P1.stream", "$L1.responseBody"],
        ["set", "$P1.mimeType", "$L1.responseHeaders.Content-Type"]
    ],
    "send": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["set", "$L0.url", "https://api.line.me/v2/bot/message/push"],
        ["create", "$L1", "Object"],
        ["set", "$L1.to", "$P3"],
        ["create", "$L1.messages", "Array"],
        ["if!=than", "$P4", null, 4],
        ["create", "$L4", "Object"],
        ["set", "$L4.type", "text"],
        ["set", "$L4.text", "$P4"],
        ["push", "$L1.messages", "$L4"],
        ["if!=than", "$P5", null, 7],
        ["create", "$L5", "Object"],
        ["set", "$L5.type", "$P2"],
        ["set", "$L5.originalContentUrl", "$P5"],
        ["set", "$L5.previewImageUrl", "$P6"],
        ["if==than", "$P2", "audio", 1],
        ["set", "$L5.duration", 1],
        ["push", "$L1.messages", "$L5"],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["size", "$L2", "$L1"],
        ["string.concat", "$L20", "$L2"],
        ["set", "$L0.requestHeaders.Content-Length", "$L20"],
        ["create", "$L3", "Object"],
        ["http.requestCall", "$L3", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L3"],
        ["create", "$L4", "Date"],
        ["set", "$L4", "$L4.time"],
        ["create", "$P1", "Message"],
        ["set", "$P1.ChatId", "$P3"],
        ["set", "$P1.SendAt", "$L4"],
        ["set", "$P1.MessageText", "$P4"]
    ],
    "checkMandatory": [
        ["if==than", "$P1", null, 3],
        ["string.concat", "$L1", "Field ", "$P2", " is mandatory"],
        ["create", "$L0", "Error", "$L1", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 15],
        ["debug.out", "$P1.code"],
        ["stream.streamToString", "$L5", "$P1.responseBody"],
        ["debug.out", "$L5"],
        ["set", "$L2", ""],
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L3", "Error", "$L2", "Authentication"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 2],
        ["create", "$L3", "Error", "$L2", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"]
    ]
};
var Line = (function () {
    function Line(redirectReceiver, botToken) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Line");
        this.interpreterStorage["botToken"] = botToken;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Line.prototype.sendMessage = function (receiverId, message, callback) {
        Statistics_1.Statistics.addCall("Line", "sendMessage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendMessage", this.interpreterStorage, null, receiverId, message).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "sendMessage");
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
    Line.prototype.sendImage = function (receiverId, message, imageId, imageStream, previewUrl, mimeType, callback) {
        Statistics_1.Statistics.addCall("Line", "sendImage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendImage", this.interpreterStorage, null, receiverId, message, imageId, imageStream, previewUrl, mimeType).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "sendImage");
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
    Line.prototype.sendVideo = function (receiverId, message, videoId, videoStream, previewUrl, size, callback) {
        Statistics_1.Statistics.addCall("Line", "sendVideo");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendVideo", this.interpreterStorage, null, receiverId, message, videoId, videoStream, previewUrl, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "sendVideo");
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
    Line.prototype.sendAudio = function (receiverId, message, audioId, audioStream, previewUrl, audioName, size, callback) {
        Statistics_1.Statistics.addCall("Line", "sendAudio");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendAudio", this.interpreterStorage, null, receiverId, message, audioId, audioStream, previewUrl, audioName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "sendAudio");
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
    Line.prototype.sendFile = function (receiverId, message, fileId, fileStream, previewUrl, fileName, size, callback) {
        Statistics_1.Statistics.addCall("Line", "sendFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendFile", this.interpreterStorage, null, receiverId, message, fileId, fileStream, previewUrl, fileName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "sendFile");
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
    Line.prototype.sendCarousel = function (receiverId, messageItem, callback) {
        Statistics_1.Statistics.addCall("Line", "sendCarousel");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendCarousel", this.interpreterStorage, null, receiverId, messageItem).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "sendCarousel");
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
    Line.prototype.parseReceivedMessages = function (httpRequest, callback) {
        Statistics_1.Statistics.addCall("Line", "parseReceivedMessages");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("processWebhookRequest", this.interpreterStorage, null, httpRequest).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "parseReceivedMessages");
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
    Line.prototype.downloadContent = function (attachment, callback) {
        Statistics_1.Statistics.addCall("Line", "downloadContent");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("downloadContent", this.interpreterStorage, null, attachment).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "downloadContent");
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
    Line.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("Line", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Line", "advancedRequest");
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
    Line.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Line", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Line.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Line", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Line.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Line", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Line;
}());
exports.Line = Line;
