"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var MessagingAttachment = (function (_super) {
    __extends(MessagingAttachment, _super);
    function MessagingAttachment(_id, _contentType, _mimeType, _caption, _stream) {
        _super.call(this);
        this._id = _id;
        this._contentType = _contentType;
        this._mimeType = _mimeType;
        this._caption = _caption;
        this._stream = _stream;
    }
    Object.defineProperty(MessagingAttachment.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessagingAttachment.prototype, "contentType", {
        get: function () {
            return this._contentType;
        },
        set: function (contentType) {
            this._contentType = contentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessagingAttachment.prototype, "mimeType", {
        get: function () {
            return this._mimeType;
        },
        set: function (mimeType) {
            this._mimeType = mimeType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessagingAttachment.prototype, "caption", {
        get: function () {
            return this._caption;
        },
        set: function (caption) {
            this._caption = caption;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessagingAttachment.prototype, "stream", {
        get: function () {
            return this._stream;
        },
        set: function (stream) {
            this._stream = stream;
        },
        enumerable: true,
        configurable: true
    });
    MessagingAttachment.prototype.toString = function () {
        var s = "";
        s += "fileId -> '" + this._id + "'\n";
        s += "contentType -> '" + this._contentType + "'\n";
        s += "mimeType -> '" + this._mimeType + "'\n";
        s += "caption -> '" + this._caption + "'\n";
        s += "stream != null -> '" + (this._stream != null).toString() + "'\n";
        return s;
    };
    return MessagingAttachment;
}(SandboxObject_1.SandboxObject));
exports.MessagingAttachment = MessagingAttachment;
