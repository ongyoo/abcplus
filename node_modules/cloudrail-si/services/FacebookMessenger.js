"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["string.concat", "$P0.baseURL", "https://graph.facebook.com/v2.6/me/messages?access_token=", "$P0.botToken"],
        ["set", "$P0.boundaryString", "------7V0ub86bNNNKWdgJgsF7r0DxYtOB06XYxWvyMuYg5BucWEINpyFRcqisOXWr"]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "https://graph.facebook.com/v2.6/me"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
        ["if!=than", "$P2.appendAuthorization", 0, 1],
        ["string.concat", "$L0.url", "$L0.url", "?access_token=", "$P0.botToken"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
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
        ["set", "$L0", "$L0.entry"],
        ["create", "$L1", "Number", 0],
        ["size", "$L2", "$L0"],
        ["create", "$P1", "Array"],
        ["if<than", "$L1", "$L2", 16],
        ["get", "$L3", "$L0", "$L1"],
        ["get", "$L4", "$L3.messaging", 0],
        ["get", "$L8", "$L3.messaging", 0],
        ["callFunc", "getLocation", "$P0", "$L5", "$L8.message.attachments"],
        ["callFunc", "getAttachments", "$P0", "$L6", "$L4.message.attachments"],
        ["create", "$L7", "Message"],
        ["set", "$L7.MessageId", "$L4.message.mid"],
        ["set", "$L7.SenderId", "$L4.sender.id"],
        ["set", "$L7.ChatId", "$L4.sender.id"],
        ["set", "$L7.SendAt", "$L4.timestamp"],
        ["set", "$L7.MessageText", "$L4.message.text"],
        ["set", "$L7.Location", "$L5"],
        ["set", "$L7.Attachments", "$L6"],
        ["push", "$P1", "$L7"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -17]
    ],
    "sendMessage": [
        ["callFunc", "checkMandatory", "$P0", "$P2", "chatId"],
        ["callFunc", "checkMandatory", "$P0", "$P3", "messageText"],
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", null, null, null]
    ],
    "sendImage": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "image", "$P7", "$P8"]
    ],
    "sendVideo": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "video", "$P7", "$P8"]
    ],
    "sendAudio": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "audio", "$P7", "$P8"]
    ],
    "sendFile": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "file", "$P7", "$P8"]
    ],
    "downloadContent": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "$P2.id"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["set", "$P1", "$P2"],
        ["set", "$P1.stream", "$L1.responseBody"],
        ["set", "$P1.mimeType", "$L1.responseHeaders.Content-Type"]
    ],
    "sendCarousel": [
        ["create", "$L0", "Object"],
        ["set", "$L0.url", "$P0.baseURL"],
        ["set", "$L0.method", "POST"],
        ["create", "$L0.requestHeaders", "Object"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["create", "$L1", "Object"],
        ["create", "$L1.recipient", "Object"],
        ["create", "$L1.message", "Object"],
        ["create", "$L1.message.attachment", "Object"],
        ["create", "$L1.message.attachment.payload", "Object"],
        ["set", "$L1.recipient.id", "$P2"],
        ["set", "$L1.message.attachment.type", "template"],
        ["set", "$L1.message.attachment.payload.template_type", "generic"],
        ["create", "$L1.message.attachment.payload.elements", "Array"],
        ["create", "$L3", "Number", 0],
        ["size", "$L4", "$P3"],
        ["if<than", "$L3", "$L4", 26],
        ["get", "$L5", "$P3", "$L3"],
        ["create", "$L6", "Object"],
        ["set", "$L6.image_url", "$L5.mediaUrl"],
        ["set", "$L6.title", "$L5.title"],
        ["set", "$L6.subtitle", "$L5.subTitle"],
        ["create", "$L6.buttons", "Array"],
        ["set", "$L7", 0],
        ["size", "$L8", "$L5.buttons"],
        ["if<than", "$L7", "$L8", 14],
        ["get", "$L9", "$L5.buttons", "$L7"],
        ["create", "$L10", "Object"],
        ["set", "$L10.title", "$L9.text"],
        ["set", "$L11", "$L9.type"],
        ["if==than", "$L9.type", "uri", 1],
        ["set", "$L11", "web_url"],
        ["set", "$L10.type", "$L11"],
        ["if!=than", "$L9.url", null, 1],
        ["set", "$L10.url", "$L9.url"],
        ["if!=than", "$L9.payload", null, 1],
        ["set", "$L10.payload", "$L9.payload"],
        ["push", "$L6.buttons", "$L10"],
        ["math.add", "$L7", "$L7", 1],
        ["jumpRel", -15],
        ["push", "$L1.message.attachment.payload.elements", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -27],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["create", "$L13", "Object"],
        ["http.requestCall", "$L13", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L13"],
        ["create", "$L14", "Date"],
        ["set", "$L14", "$L14.time"],
        ["create", "$P1", "Message"],
        ["set", "$P1.ChatId", "$P2"],
        ["set", "$P1.SendAt", "$L14"]
    ],
    "sendContent": [
        ["callFunc", "checkMandatory", "$P0", "$P2", "chatId"],
        ["if!=than", "$P3", null, 8],
        ["if!=than", "$P4", null, 3],
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", null, "$P4", "$P5", "$P6", "$P7", "$P8"],
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", null, null, null, null, null],
        ["return"],
        ["if!=than", "$P5", null, 3],
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", null, "$P4", "$P5", "$P6", "$P7", "$P8"],
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", null, null, null, null, null],
        ["return"],
        ["if!=than", "$P5", null, 2],
        ["callFunc", "sendContentWithStream", "$P0", "$P1", "$P2", "$P3", "$P5", "$P6", "$P7", "$P8"],
        ["jumpRel", 1],
        ["callFunc", "sendContentWithID", "$P0", "$P1", "$P2", "$P3", "$P4", "$P6"]
    ],
    "sendContentWithID": [
        ["create", "$L0", "Object"],
        ["set", "$L0.url", "$P0.baseURL"],
        ["set", "$L0.method", "POST"],
        ["create", "$L0.requestHeaders", "Object"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["create", "$L1", "Object"],
        ["create", "$L1.recipient", "Object"],
        ["create", "$L1.message", "Object"],
        ["if!=than", "$P4", null, 2],
        ["create", "$L1.message.attachment", "Object"],
        ["create", "$L1.message.attachment.payload", "Object"],
        ["set", "$L1.recipient.id", "$P2"],
        ["if!=than", "$P3", null, 1],
        ["set", "$L1.message.text", "$P3"],
        ["if!=than", "$P4", null, 2],
        ["set", "$L1.message.attachment.type", "$P5"],
        ["set", "$L1.message.attachment.payload.url", "$P4"],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"],
        ["create", "$L4", "Date"],
        ["create", "$P1", "Message"],
        ["if!=than", "$L3.message_id", null, 2],
        ["string.concat", "$L11", "$L3.message_id"],
        ["set", "$P1.MessageId", "$L11"],
        ["if!=than", "$P2", null, 2],
        ["string.concat", "$L13", "$P2"],
        ["set", "$P1.ChatId", "$L13"],
        ["set", "$P1.SendAt", "$L4.time"],
        ["if!=than", "$P3", null, 2],
        ["string.concat", "$L15", "$P3"],
        ["set", "$P1.MessageText", "$L15"]
    ],
    "sendContentWithStream": [
        ["create", "$L0", "Object"],
        ["set", "$L0.url", "$P0.baseURL"],
        ["set", "$L0.method", "POST"],
        ["string.concat", "$L11", "application/octet-stream"],
        ["if==than", "$P5", "image", 2],
        ["set", "$L11", "$P8"],
        ["if!=than", "$P6", null, 6],
        ["string.split", "$L8", "$P6", "\\."],
        ["size", "$L9", "$L8"],
        ["math.add", "$L9", "$L9", "-1"],
        ["get", "$L10", "$L8", "$L9"],
        ["getMimeType", "$L11", "$L10"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"recipient\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Type:text/plain", "\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L1", "$L1", "{\"id\":\"", "$P2", "\"}\r\n"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"message\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Type:text/plain", "\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L1", "$L1", "{"],
        ["if!=than", "$P3", null, 1],
        ["string.concat", "$L1", "$L1", "\"text\": \"", "$P3", "\", "],
        ["string.concat", "$L1", "$L1", "\"attachment\":{\"type\":\"", "$P5", "\", \"payload\":{}}}"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"filedata\"; filename=\"", "$P6", "\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Type:", "$L11", "\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L5", "\r\n--", "$P0.boundaryString", "--\r\n"],
        ["stream.stringToStream", "$L6", "$L1"],
        ["stream.stringToStream", "$L7", "$L5"],
        ["stream.makeJoinedStream", "$L0.requestBody", "$L6", "$P4", "$L7"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Content-Type", "multipart/form-data; boundary=", "$P0.boundaryString"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"]
    ],
    "getLocation": [
        ["if==than", "$P2", null, 1],
        ["return"],
        ["create", "$L0", "Number", 0],
        ["size", "$L1", "$P2"],
        ["if<than", "$L0", "$L1", 6],
        ["get", "$L2", "$P2", "$L0"],
        ["if==than", "$L2.type", "location", 4],
        ["create", "$P1", "Location"],
        ["set", "$P1.Longitude", "$L2.payload.coordinates.long"],
        ["set", "$P1.Latitude", "$L2.payload.coordinates.lat"],
        ["return"]
    ],
    "getAttachments": [
        ["if==than", "$P2", null, 1],
        ["return"],
        ["create", "$L0", "Number", 0],
        ["size", "$L1", "$P2"],
        ["create", "$P1", "Array"],
        ["if<than", "$L0", "$L1", 7],
        ["get", "$L2", "$P2", "$L0"],
        ["if!=than", "$L2.type", "location", 4],
        ["if!=than", "$L2.type", "fallback", 3],
        ["create", "$L3", "MessagingAttachment", "$L2.payload.url", "$L2.type", null, null, null],
        ["push", "$P1", "$L3"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -8]
    ],
    "extractMessageObject": [],
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
var FacebookMessenger = (function () {
    function FacebookMessenger(redirectReceiver, botToken) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("FacebookMessenger");
        this.interpreterStorage["botToken"] = botToken;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    FacebookMessenger.prototype.sendMessage = function (receiverId, message, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "sendMessage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendMessage", this.interpreterStorage, null, receiverId, message).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "sendMessage");
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
    FacebookMessenger.prototype.sendImage = function (receiverId, message, imageId, imageStream, previewUrl, mimeType, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "sendImage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendImage", this.interpreterStorage, null, receiverId, message, imageId, imageStream, previewUrl, mimeType).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "sendImage");
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
    FacebookMessenger.prototype.sendVideo = function (receiverId, message, videoId, videoStream, previewUrl, size, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "sendVideo");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendVideo", this.interpreterStorage, null, receiverId, message, videoId, videoStream, previewUrl, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "sendVideo");
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
    FacebookMessenger.prototype.sendAudio = function (receiverId, message, audioId, audioStream, previewUrl, audioName, size, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "sendAudio");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendAudio", this.interpreterStorage, null, receiverId, message, audioId, audioStream, previewUrl, audioName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "sendAudio");
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
    FacebookMessenger.prototype.sendFile = function (receiverId, message, fileId, fileStream, previewUrl, fileName, size, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "sendFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendFile", this.interpreterStorage, null, receiverId, message, fileId, fileStream, previewUrl, fileName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "sendFile");
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
    FacebookMessenger.prototype.sendCarousel = function (receiverId, messageItem, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "sendCarousel");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendCarousel", this.interpreterStorage, null, receiverId, messageItem).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "sendCarousel");
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
    FacebookMessenger.prototype.parseReceivedMessages = function (httpRequest, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "parseReceivedMessages");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("processWebhookRequest", this.interpreterStorage, null, httpRequest).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "parseReceivedMessages");
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
    FacebookMessenger.prototype.downloadContent = function (attachment, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "downloadContent");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("downloadContent", this.interpreterStorage, null, attachment).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "downloadContent");
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
    FacebookMessenger.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "FacebookMessenger", "advancedRequest");
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
    FacebookMessenger.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("FacebookMessenger", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    FacebookMessenger.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    FacebookMessenger.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("FacebookMessenger", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return FacebookMessenger;
}());
exports.FacebookMessenger = FacebookMessenger;
