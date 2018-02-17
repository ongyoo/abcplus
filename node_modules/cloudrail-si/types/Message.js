"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var Message = (function (_super) {
    __extends(Message, _super);
    function Message(_messageId, _senderId, _chatId, _replyTo, _editOf, _sendAt, _messageText, _location, _attachments) {
        _super.call(this);
        this._messageId = _messageId;
        this._senderId = _senderId;
        this._chatId = _chatId;
        this._replyTo = _replyTo;
        this._editOf = _editOf;
        this._sendAt = _sendAt;
        this._messageText = _messageText;
        this._location = _location;
        this._attachments = _attachments;
    }
    Object.defineProperty(Message.prototype, "messageId", {
        get: function () {
            return this._messageId;
        },
        set: function (messageId) {
            this._messageId = messageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "senderId", {
        get: function () {
            return this._senderId;
        },
        set: function (senderId) {
            this._senderId = senderId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "chatId", {
        get: function () {
            return this._chatId;
        },
        set: function (chatId) {
            this._chatId = chatId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "replyTo", {
        get: function () {
            return this._replyTo;
        },
        set: function (replyTo) {
            this._replyTo = replyTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "editOf", {
        get: function () {
            return this._editOf;
        },
        set: function (editOf) {
            this._editOf = editOf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "sendAt", {
        get: function () {
            return this._sendAt;
        },
        set: function (sendAt) {
            this._sendAt = sendAt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "messageText", {
        get: function () {
            return this._messageText;
        },
        set: function (messageText) {
            this._messageText = messageText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "location", {
        get: function () {
            return this._location;
        },
        set: function (location) {
            this._location = location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "attachments", {
        get: function () {
            return this._attachments;
        },
        set: function (attachments) {
            this._attachments = attachments;
        },
        enumerable: true,
        configurable: true
    });
    Message.prototype.toString = function () {
        var s = "";
        s += "messageId -> '" + this._messageId + "'\n";
        s += "senderId -> '" + this._senderId + "'\n";
        s += "chatId -> '" + this._chatId + "'\n";
        s += "replyTo -> '" + this._replyTo + "'\n";
        s += "editOf -> '" + this._editOf + "'\n";
        s += "sendAt -> '" + this._sendAt + "'\n";
        s += "messageText -> '" + this._messageText + "'\n";
        s += "location -> '" + this._location + "'\n";
        if (this._attachments != null) {
            s += "attachments -> '" + this._attachments.toString() + "'\n";
        }
        else {
            s += "attachments -> null";
        }
        return s;
    };
    return Message;
}(SandboxObject_1.SandboxObject));
exports.Message = Message;
