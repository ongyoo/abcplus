"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var VideoMetaData = (function (_super) {
    __extends(VideoMetaData, _super);
    function VideoMetaData(_id, _title, _description, _publishedAt, _channelId, _duration, _thumbnailUrl, _embedHtml, _viewCount, _likeCount, _dislikeCount) {
        _super.call(this);
        this._id = _id;
        this._title = _title;
        this._description = _description;
        this._publishedAt = _publishedAt;
        this._channelId = _channelId;
        this._duration = _duration;
        this._thumbnailUrl = _thumbnailUrl;
        this._embedHtml = _embedHtml;
        this._viewCount = _viewCount;
        this._likeCount = _likeCount;
        this._dislikeCount = _dislikeCount;
    }
    Object.defineProperty(VideoMetaData.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "publishedAt", {
        get: function () {
            return this._publishedAt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "channelId", {
        get: function () {
            return this._channelId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "thumbnailUrl", {
        get: function () {
            return this._thumbnailUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "embedHtml", {
        get: function () {
            return this._embedHtml;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "viewCount", {
        get: function () {
            return this._viewCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "likeCount", {
        get: function () {
            return this._likeCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMetaData.prototype, "dislikeCount", {
        get: function () {
            return this._dislikeCount;
        },
        enumerable: true,
        configurable: true
    });
    return VideoMetaData;
}(SandboxObject_1.SandboxObject));
exports.VideoMetaData = VideoMetaData;
