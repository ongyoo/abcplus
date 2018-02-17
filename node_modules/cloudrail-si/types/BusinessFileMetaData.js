"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var BusinessFileMetaData = (function (_super) {
    __extends(BusinessFileMetaData, _super);
    function BusinessFileMetaData(fileName, fileID, size, lastModified) {
        _super.call(this);
        this.fileName = fileName;
        this.fileID = fileID;
        this.size = size;
        this.lastModified = lastModified;
    }
    return BusinessFileMetaData;
}(SandboxObject_1.SandboxObject));
exports.BusinessFileMetaData = BusinessFileMetaData;
