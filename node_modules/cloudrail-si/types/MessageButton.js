"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var MessageButton = (function (_super) {
    __extends(MessageButton, _super);
    function MessageButton(_text, _type, _url, _payload) {
        _super.call(this);
        this._text = _text;
        this._type = _type;
        this._url = _url;
        this._payload = _payload;
    }
    Object.defineProperty(MessageButton.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageButton.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageButton.prototype, "payload", {
        get: function () {
            return this._payload;
        },
        set: function (payload) {
            this._payload = payload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageButton.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (url) {
            this._url = url;
        },
        enumerable: true,
        configurable: true
    });
    MessageButton.prototype.toString = function () {
        var s = "";
        s += "text -> '" + this._text + "'\n";
        s += "type -> '" + this._type + "'\n";
        s += "payload -> '" + this._payload + "'\n";
        s += "url -> '" + this._url + "'\n";
        return s;
    };
    return MessageButton;
}(SandboxObject_1.SandboxObject));
exports.MessageButton = MessageButton;
