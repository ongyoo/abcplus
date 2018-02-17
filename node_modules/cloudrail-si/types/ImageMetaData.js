"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var ImageMetaData = (function (_super) {
    __extends(ImageMetaData, _super);
    function ImageMetaData(_height, _width) {
        _super.call(this);
        this._height = _height;
        this._width = _width;
    }
    Object.defineProperty(ImageMetaData.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageMetaData.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    return ImageMetaData;
}(SandboxObject_1.SandboxObject));
exports.ImageMetaData = ImageMetaData;
