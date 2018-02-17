"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var MessageItem = (function (_super) {
    __extends(MessageItem, _super);
    function MessageItem(_title, _subTitle, _mediaUrl, _buttons) {
        _super.call(this);
        this._title = _title;
        this._subTitle = _subTitle;
        this._mediaUrl = _mediaUrl;
        this._buttons = _buttons;
    }
    Object.defineProperty(MessageItem.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageItem.prototype, "subTitle", {
        get: function () {
            return this._subTitle;
        },
        set: function (subTitle) {
            this._subTitle = subTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageItem.prototype, "mediaUrl", {
        get: function () {
            return this._mediaUrl;
        },
        set: function (mediaUrl) {
            this._mediaUrl = mediaUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageItem.prototype, "buttons", {
        get: function () {
            return this._buttons;
        },
        set: function (buttons) {
            this._buttons = buttons;
        },
        enumerable: true,
        configurable: true
    });
    MessageItem.prototype.toString = function () {
        var s = "";
        s += "title -> '" + this._title + "'\n";
        s += "subTitle -> '" + this._subTitle + "'\n";
        s += "mediaUrl -> '" + this._mediaUrl + "'\n";
        s += "buttons -> '" + this._buttons + "'\n";
        return s;
    };
    return MessageItem;
}(SandboxObject_1.SandboxObject));
exports.MessageItem = MessageItem;
