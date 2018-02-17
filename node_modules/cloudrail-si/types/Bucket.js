"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var Bucket = (function (_super) {
    __extends(Bucket, _super);
    function Bucket(name, identifier) {
        _super.call(this);
        this.name = name;
        this.identifier = identifier;
    }
    return Bucket;
}(SandboxObject_1.SandboxObject));
exports.Bucket = Bucket;
