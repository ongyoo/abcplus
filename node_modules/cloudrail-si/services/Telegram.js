"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["string.concat", "$P0.baseURL", "https://api.telegram.org/bot", "$P0.botToken"],
        ["string.concat", "$P0.fileURL", "https://api.telegram.org/file/bot", "$P0.botToken"],
        ["set", "$P0.boundaryString", "------7V0ub86bNNNKWdgJgsF7r0DxYtOB06XYxWvyMuYg5BucWEINpyFRcqisOXWr"]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["callFunc", "setWebhook", "$P0"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "$P0.baseURL"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
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
    "setWebhook": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "$P0.baseURL", "/setWebhook?url=", "$P0.webhook"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"]
    ],
    "processWebhookRequest": [
        ["json.parse", "$L0", "$P2"],
        ["if!=than", "$L0.message", null, 1],
        ["callFunc", "extractMessageObject", "$P0", "$L1", "$L0.message", null],
        ["if!=than", "$L0.edited_message", null, 1],
        ["callFunc", "extractMessageObject", "$P0", "$L1", "$L0.edited_message", "$L0.edited_message.message_id"],
        ["if!=than", "$L0.channel_post", null, 1],
        ["callFunc", "extractMessageObject", "$P0", "$L1", "$L0.channel_post", null],
        ["if!=than", "$L0.edited_channel_post", null, 1],
        ["callFunc", "extractMessageObject", "$P0", "$L1", "$L0.edited_channel_post", "$L0.edited_channel_post.message_id"],
        ["if!=than", "$L0.callback_query", null, 1],
        ["callFunc", "extractCallbackQuery", "$P0", "$L1", "$L0.callback_query"],
        ["create", "$P1", "Array"],
        ["push", "$P1", "$L1"]
    ],
    "sendMessage": [
        ["callFunc", "checkMandatory", "$P0", "$P2", "chatId"],
        ["callFunc", "checkMandatory", "$P0", "$P3", "messageText"],
        ["callFunc", "setWebhook", "$P0"],
        ["create", "$L0", "Object"],
        ["string.urlEncode", "$P3", "$P3"],
        ["string.concat", "$L0.url", "$P0.baseURL", "/sendMessage?chat_id=", "$P2", "&text=", "$P3"],
        ["if!=than", "$P4", null, 1],
        ["string.concat", "$L0.url", "$L0.url", "&reply_markup=", "$P4"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "extractMessageObject", "$P0", "$P1", "$L2.result", null]
    ],
    "sendImage": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "/sendPhoto", "photo", "somename"]
    ],
    "sendVideo": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "/sendVideo", "video", "somename"]
    ],
    "sendAudio": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "/sendAudio", "audio", "somename"]
    ],
    "sendFile": [
        ["callFunc", "sendContent", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "/sendDocument", "document", "$P7"]
    ],
    "sendCarousel": [
        ["set", "$L0", 0],
        ["size", "$L1", "$P3"],
        ["if<than", "$L0", "$L1", 28],
        ["get", "$L2", "$P3", "$L0"],
        ["if!=than", "$L2.subTitle", null, 1],
        ["string.concat", "$L2.title", "$L2.title", "\n", "$L2.subTitle"],
        ["create", "$L3", "Object"],
        ["create", "$L3.inline_keyboard", "Array"],
        ["set", "$L4", 0],
        ["size", "$L5", "$L2.buttons"],
        ["if<than", "$L4", "$L5", 12],
        ["get", "$L6", "$L2.buttons", "$L4"],
        ["create", "$L7", "Array"],
        ["create", "$L8", "Object"],
        ["set", "$L8.text", "$L6.text"],
        ["if!=than", "$L6.url", null, 2],
        ["set", "$L8.url", "$L6.url"],
        ["jumpRel", 1],
        ["set", "$L8.callback_data", "$L6.payload"],
        ["push", "$L7", "$L8"],
        ["push", "$L3.inline_keyboard", "$L7"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -13],
        ["json.stringify", "$L3", "$L3"],
        ["string.urlEncode", "$L3", "$L3"],
        ["if==than", "$L2.mediaUrl", null, 2],
        ["callFunc", "sendMessage", "$P0", "$P1", "$P2", "$L2.title", "$L3"],
        ["jumpRel", 1],
        ["callFunc", "sendContentWithID", "$P0", "$P1", "$P2", "$L2.title", "$L2.mediaUrl", "/sendPhoto", "photo", "$L3"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -29]
    ],
    "downloadContent": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "$P0.baseURL", "/getFile?file_id=", "$P2.id"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["create", "$L3", "Object"],
        ["string.concat", "$L3.url", "$P0.fileURL", "/", "$L2.result.file_path"],
        ["set", "$L3.method", "GET"],
        ["create", "$L4", "Object"],
        ["http.requestCall", "$L4", "$L3"],
        ["callFunc", "validateResponse", "$P0", "$L4"],
        ["set", "$P1", "$P2"],
        ["set", "$P1.stream", "$L4.responseBody"],
        ["if==than", "$P1.mimeType", null, 1],
        ["set", "$P1.mimeType", "$L4.responseHeaders.Content-Type"]
    ],
    "sendContent": [
        ["callFunc", "checkMandatory", "$P0", "$P2", "chatId"],
        ["if==than", "$P4", null, 3],
        ["if==than", "$P5", null, 2],
        ["create", "$L4", "Error", "Either a file identifer or a file stream must be provided!", "IllegalArgument"],
        ["throwError", "$L4"],
        ["callFunc", "setWebhook", "$P0"],
        ["if!=than", "$P4", null, 2],
        ["callFunc", "sendContentWithID", "$P0", "$P1", "$P2", "$P3", "$P4", "$P6", "$P7"],
        ["jumpRel", 1],
        ["callFunc", "sendContentWithStream", "$P0", "$P1", "$P2", "$P3", "$P5", "$P6", "$P7", "$P8"]
    ],
    "sendContentWithID": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.urlEncode", "$P4", "$P4"],
        ["string.concat", "$L0.url", "$P0.baseURL", "$P5", "?chat_id=", "$P2", "&", "$P6", "=", "$P4"],
        ["if!=than", "$P3", null, 2],
        ["string.urlEncode", "$P3", "$P3"],
        ["string.concat", "$L0.url", "$L0.url", "&caption=", "$P3"],
        ["if!=than", "$P7", null, 1],
        ["string.concat", "$L0.url", "$L0.url", "&reply_markup=", "$P7"],
        ["create", "$L1", "Object"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "extractMessageObject", "$P0", "$P1", "$L2.result", null]
    ],
    "sendContentWithStream": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "$P0.baseURL", "$P5"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"chat_id\"\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L1", "$L1", "$P2", "\r\n"],
        ["if!=than", "$P3", null, 4],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"caption\"\r\n"],
        ["string.concat", "$L1", "$L1", "\r\n"],
        ["string.concat", "$L1", "$L1", "$P3", "\r\n"],
        ["string.concat", "$L1", "$L1", "--", "$P0.boundaryString", "\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Disposition: form-data; name=\"", "$P6", "\"; filename=\"", "$P7", "\"\r\n"],
        ["string.concat", "$L1", "$L1", "Content-Type:image/png", "\r\n"],
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
    "extractMessageObject": [
        ["create", "$L1", "Array"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "photo", "image"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "audio", "audio"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "voice", "audio"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "video", "video"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "video_note", "video"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "file", "file"],
        ["callFunc", "addAttachment", "$P0", "$L1", "$P2", "document", "file"],
        ["size", "$L8", "$L1"],
        ["create", "$P1", "Message"],
        ["if!=than", "$P2.message_id", null, 2],
        ["string.concat", "$L11", "$P2.message_id"],
        ["set", "$P1.MessageId", "$L11"],
        ["if!=than", "$P2.from.id", null, 2],
        ["string.concat", "$L12", "$P2.from.id"],
        ["set", "$P1.SenderId", "$L12"],
        ["if!=than", "$P2.chat.id", null, 2],
        ["string.concat", "$L13", "$P2.chat.id"],
        ["set", "$P1.ChatId", "$L13"],
        ["if!=than", "$P2.reply_to_message.message_id", null, 2],
        ["string.concat", "$L14", "$P2.reply_to_message.message_id"],
        ["set", "$P1.ReplyTo", "$L14"],
        ["if!=than", "$P3", null, 1],
        ["set", "$P1.EditOf", "$P3"],
        ["if!=than", "$P2.text", null, 2],
        ["string.concat", "$L15", "$P2.text"],
        ["set", "$P1.MessageText", "$L15"],
        ["if!=than", "$P2.date", null, 1],
        ["set", "$P1.SendAt", "$P2.date"],
        ["if!=than", "$P2.location", null, 4],
        ["create", "$L0", "Location"],
        ["set", "$L0.Longitude", "$P2.location.longitude"],
        ["set", "$L0.Latitude", "$P2.location.latitude"],
        ["set", "$P1.Location", "$L0"],
        ["if!=than", "$L8", 0, 1],
        ["set", "$P1.Attachments", "$L1"]
    ],
    "extractCallbackQuery": [
        ["create", "$P1", "Message"],
        ["if!=than", "$P2.id", null, 2],
        ["string.concat", "$L11", "$P2.id"],
        ["set", "$P1.MessageId", "$L11"],
        ["if!=than", "$P2.message.from.id", null, 2],
        ["string.concat", "$L12", "$P2.message.from.id"],
        ["set", "$P1.SenderId", "$L12"],
        ["if!=than", "$P2.message.chat.id", null, 2],
        ["string.concat", "$L13", "$P2.message.chat.id"],
        ["set", "$P1.ChatId", "$L13"],
        ["if!=than", "$P2.message.message_id", null, 2],
        ["string.concat", "$L14", "$P2.message.message_id"],
        ["set", "$P1.ReplyTo", "$L14"],
        ["if!=than", "$P2.data", null, 2],
        ["string.concat", "$L15", "$P2.data"],
        ["set", "$P1.MessageText", "$L15"],
        ["if!=than", "$P2.date", null, 1],
        ["set", "$P1.SendAt", "$P2.date"],
        ["if!=than", "$P2.location", null, 4],
        ["create", "$L0", "Location"],
        ["set", "$L0.Longitude", "$P2.location.longitude"],
        ["set", "$L0.Latitude", "$P2.location.latitude"],
        ["set", "$P1.Location", "$L0"]
    ],
    "addAttachment": [
        ["get", "$L0", "$P2", "$P3"],
        ["if==than", "$P3", "photo", 3],
        ["size", "$L1", "$L0"],
        ["math.add", "$L1", "$L1", -1],
        ["get", "$L0", "$L0", "$L1"],
        ["if!=than", "$L0", null, 2],
        ["create", "$L2", "MessagingAttachment", "$L0.file_id", "$P4", "$L0.mime_type", "$P2.caption", null],
        ["push", "$P1", "$L2"]
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
var Telegram = (function () {
    function Telegram(redirectReceiver, botToken, webhook) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Telegram");
        this.interpreterStorage["botToken"] = botToken;
        this.interpreterStorage["webhook"] = webhook;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Telegram.prototype.sendMessage = function (receiverId, message, callback) {
        Statistics_1.Statistics.addCall("Telegram", "sendMessage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendMessage", this.interpreterStorage, null, receiverId, message).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "sendMessage");
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
    Telegram.prototype.sendImage = function (receiverId, message, imageId, imageStream, previewUrl, mimeType, callback) {
        Statistics_1.Statistics.addCall("Telegram", "sendImage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendImage", this.interpreterStorage, null, receiverId, message, imageId, imageStream, previewUrl, mimeType).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "sendImage");
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
    Telegram.prototype.sendVideo = function (receiverId, message, videoId, videoStream, previewUrl, size, callback) {
        Statistics_1.Statistics.addCall("Telegram", "sendVideo");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendVideo", this.interpreterStorage, null, receiverId, message, videoId, videoStream, previewUrl, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "sendVideo");
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
    Telegram.prototype.sendAudio = function (receiverId, message, audioId, audioStream, previewUrl, audioName, size, callback) {
        Statistics_1.Statistics.addCall("Telegram", "sendAudio");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendAudio", this.interpreterStorage, null, receiverId, message, audioId, audioStream, previewUrl, audioName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "sendAudio");
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
    Telegram.prototype.sendFile = function (receiverId, message, fileId, fileStream, previewUrl, fileName, size, callback) {
        Statistics_1.Statistics.addCall("Telegram", "sendFile");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendFile", this.interpreterStorage, null, receiverId, message, fileId, fileStream, previewUrl, fileName, size).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "sendFile");
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
    Telegram.prototype.sendCarousel = function (receiverId, messageItem, callback) {
        Statistics_1.Statistics.addCall("Telegram", "sendCarousel");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendCarousel", this.interpreterStorage, null, receiverId, messageItem).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "sendCarousel");
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
    Telegram.prototype.parseReceivedMessages = function (httpRequest, callback) {
        Statistics_1.Statistics.addCall("Telegram", "parseReceivedMessages");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("processWebhookRequest", this.interpreterStorage, null, httpRequest).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "parseReceivedMessages");
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
    Telegram.prototype.downloadContent = function (attachment, callback) {
        Statistics_1.Statistics.addCall("Telegram", "downloadContent");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("downloadContent", this.interpreterStorage, null, attachment).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "downloadContent");
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
    Telegram.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("Telegram", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Telegram", "advancedRequest");
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
    Telegram.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Telegram", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Telegram.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Telegram", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Telegram.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Telegram", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Telegram;
}());
exports.Telegram = Telegram;
