"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var ChannelMetaData = (function (_super) {
    __extends(ChannelMetaData, _super);
    function ChannelMetaData(_id, _name, _followers, _url, _logoUrl, _bannerUrl) {
        _super.call(this);
        this._id = _id;
        this._name = _name;
        this._followers = _followers;
        this._url = _url;
        this._logoUrl = _logoUrl;
        this._bannerUrl = _bannerUrl;
    }
    Object.defineProperty(ChannelMetaData.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMetaData.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMetaData.prototype, "followers", {
        get: function () {
            return this._followers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMetaData.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMetaData.prototype, "logoUrl", {
        get: function () {
            return this._logoUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelMetaData.prototype, "bannerUrl", {
        get: function () {
            return this._bannerUrl;
        },
        enumerable: true,
        configurable: true
    });
    return ChannelMetaData;
}(SandboxObject_1.SandboxObject));
exports.ChannelMetaData = ChannelMetaData;
