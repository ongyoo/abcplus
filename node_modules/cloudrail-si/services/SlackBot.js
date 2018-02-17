"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["set", "$P0.baseURL", "https://slack.com/api/"],
        ["set", "$P0.boundaryString", "------7V0ub86bNNNKWdgJgsF7r0DxYtOB06XYxWvyMuYg5BucWEINpyFRcqisOXWr"]
    ],
    "AdvancedRequestSupporter:advancedRequest": [],
    "processWebhookRequest": [
        ["stream.streamToString", "$L1", "$P2"],
        ["string.indexOf", "$L2", "$L1", "payload"],
        ["if==than", "$L2", 0, 2],
        ["string.urlDecode", "$L1", "$L1"],
        ["string.substring", "$L1", "$L1", 8],
        ["json.parse", "$L0", "$L1"],
        ["if==than", "$L0.type", "interactive_message", 2],
        ["callFunc", "extractInteractiveMessageObject", "$P0", "$L1", "$L0"],
        ["jumpRel", 1],
        ["callFunc", "extractMessageObject", "$P0", "$L1", "$L0.event"],
        ["create", "$P1", "Array"],
        ["push", "$P1", "$L1"]
    ],
    "sendMessage": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "$P0.baseURL", "chat.postMessage"],
        ["create", "$L0.requestHeaders", "Object"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["create", "$L3", "Object"],
        ["set", "$L3.channel", "$P2"],
        ["if!=than", "$P3", null, 1],
        ["set", "$L3.text", "$P3"],
        ["if!=than", "$P4", null, 3],
        ["set", "$L3.replace_original", "false"],
        ["set", "$L3.delete_original", "false"],
        ["set", "$L3.attachments", "$P4"],
        ["json.stringify", "$L4", "$L3"],
        ["stream.stringToStream", "$L0.requestBody", "$L4"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "extractMessageObject", "$P0", "$P1", "$L2.message"]
    ],
    "sendImage": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "$P6", "$P7"]
    ],
    "sendVideo": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "$P6", "$P7"]
    ],
    "sendAudio": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "$P6", "$P7"]
    ],
    "sendFile": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "$P6", "$P7"]
    ],
    "sendCarousel": [
        ["set", "$L0", 0],
        ["size", "$L1", "$P3"],
        ["create", "$L2", "Array"],
        ["if<than", "$L0", "$L1", 28],
        ["get", "$L3", "$P3", "$L0"],
        ["create", "$L4", "Object"],
        ["set", "$L4.text", "$L3.title"],
        ["if!=than", "$L3.subTitle", null, 1],
        ["string.concat", "$L4.text", "$L4.text", " ", "$L3.subTitle"],
        ["set", "$L4.fallback", "default"],
        ["set", "$L4.callback_id", "default"],
        ["set", "$L4.attachment_type", "default"],
        ["set", "$L4.image_url", "$L3.mediaUrl"],
        ["create", "$L4.actions", "Array"],
        ["set", "$L5", 0],
        ["size", "$L6", "$L3.buttons"],
        ["if<than", "$L5", "$L6", 12],
        ["get", "$L7", "$L3.buttons", "$L5"],
        ["create", "$L8", "Object"],
        ["set", "$L8.name", "someName"],
        ["set", "$L8.text", "$L7.text"],
        ["set", "$L8.type", "button"],
        ["if!=than", "$L7.url", null, 2],
        ["set", "$L8.value", "$L7.url"],
        ["jumpRel", 1],
        ["set", "$L8.value", "$L7.payload"],
        ["push", "$L4.actions", "$L8"],
        ["math.add", "$L5", "$L5", 1],
        ["jumpRel", -13],
        ["push", "$L2", "$L4"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -29],
        ["callFunc", "sendMessage", "$P0", "$P1", "$P2", "", "$L2"]
    ],
    "downloadContent": [
        ["create", "$L0", "Object"],
        ["set", "$L0.url", "$P2.id"],
        ["set", "$L0.method", "GET"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["set", "$P1", "$P2"],
        ["set", "$P1.stream", "$L1.responseBody"],
        ["if==than", "$P1.mimeType", null, 1],
        ["set", "$P1.mimeType", "$L4.responseHeaders.Content-Type"]
    ],
    "extractMessageObject": [
        ["create", "$P1", "Message"],
        ["set", "$P1.senderId", "$P2.user"],
        ["set", "$P1.chatId", "$P2.channel"],
        ["set", "$P1.messageText", "$P2.text"],
        ["set", "$P1.messageId", "$P2.ts"],
        ["set", "$P1.sendAt", "$P2.ts"],
        ["if!=than", "$P2.subtype", null, 2],
        ["if==than", "$P2.subtype", "file_share", 1],
        ["callFunc", "addAttachment", "$P0", "$P1", "$P2.file"]
    ],
    "extractInteractiveMessageObject": [
        ["create", "$P1", "Message"],
        ["set", "$P1.senderId", "$P2.user.id"],
        ["set", "$P1.chatId", "$P2.channel.id"],
        ["set", "$P1.messageId", "$P2.action_ts"],
        ["set", "$P1.replyTo", "$P2.message_ts"],
        ["set", "$P1.sendAt", "$P2.action_ts"],
        ["get", "$L1", "$P2.actions", 0],
        ["set", "$P1.messageText", "$L1.value"]
    ],
    "addAttachment": [
        ["if!=than", "$P2.url_private_download", null, 2],
        ["set", "$L1", "$P2.url_private_download"],
        ["jumpRel", 1],
        ["set", "$L1", "$P2.url_private"],
        ["create", "$L0", "MessagingAttachment", "$L1", "file", "$P2.mimetype", null, null],
        ["create", "$P1.Attachments", "Array"],
        ["push", "$P1.Attachments", "$L0"]
    ],
    "sendContent": [
        ["if==than", "$P4", null, 2],
        ["callFunc", "uploadContent", "$P0", "$P1", "$P5", "$P2", "$P7"],
        ["return"],
        ["callFunc", "sendMessage", "$P0", "$P1", "$P2", "$P4"]
    ],
    "uploadContent": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "$P0.baseURL", "files.upload"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"channels\"\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L1", "$L1", "$P3", "\r\n"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"file\"; filename=\"", "$P3", "\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Type:image/png", "\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L2", "\r\n--", "$P0.boundaryString", "--\r\n"],
        ["stream.stringToStream", "$L3", "$L1"],
        ["stream.stringToStream", "$L4", "$L2"],
        ["stream.makeJoinedStream", "$L0.requestBody", "$L3", "$P2", "$L4"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Content-Type", "multipart/form-data; boundary=", "$P0.boundaryString"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$P0.botToken"],
        ["create", "$L2", "Object"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"]
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
var SlackBot = (function () {
    function SlackBot(redirectReceiver, botToken) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("SlackBot");
        this.interpreterStorage["botToken"] = botToken;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    SlackBot.prototype.sendMessage = function (receiverId, message, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "sendMessage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendMessage", this.interpreterStorage, null, receiverId, message).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "sendMessage");
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
    SlackBot.prototype.sendImage = function (receiverId, message, imageId, imageStream, previewUrl, mimeType, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "sendImage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendImage", this.interpreterStorage, null, receiverId, message, imageId, imageStream, previewUrl, mimeType).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "sendImage");
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
    SlackBot.prototype.sendVideo = function (receiverId, message, videoId, videoStream, previewUrl, size, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "sendVideo");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendVideo", this.interpreterStorage, null, receiverId, message, videoId, videoStream, previewUrl, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "sendVideo");
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
    SlackBot.prototype.sendAudio = function (receiverId, message, audioId, audioStream, previewUrl, audioName, size, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "sendAudio");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendAudio", this.interpreterStorage, null, receiverId, message, audioId, audioStream, previewUrl, audioName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "sendAudio");
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
    SlackBot.prototype.sendFile = function (receiverId, message, fileId, fileStream, previewUrl, fileName, size, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "sendFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendFile", this.interpreterStorage, null, receiverId, message, fileId, fileStream, previewUrl, fileName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "sendFile");
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
    SlackBot.prototype.sendCarousel = function (receiverId, messageItem, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "sendCarousel");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendCarousel", this.interpreterStorage, null, receiverId, messageItem).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "sendCarousel");
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
    SlackBot.prototype.parseReceivedMessages = function (httpRequest, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "parseReceivedMessages");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("processWebhookRequest", this.interpreterStorage, null, httpRequest).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "parseReceivedMessages");
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
    SlackBot.prototype.downloadContent = function (attachment, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "downloadContent");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("downloadContent", this.interpreterStorage, null, attachment).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "downloadContent");
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
    SlackBot.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "SlackBot", "advancedRequest");
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
    SlackBot.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("SlackBot", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    SlackBot.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("SlackBot", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    SlackBot.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("SlackBot", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return SlackBot;
}());
exports.SlackBot = SlackBot;
