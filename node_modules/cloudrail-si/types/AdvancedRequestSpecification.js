"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Helper_1 = require("../helpers/Helper");
var SandboxObject_1 = require("./SandboxObject");
var DetailErrors_1 = require("../errors/DetailErrors");
var Stringify_1 = require("../servicecode/commands/xml/Stringify");
var AdvancedRequestSpecification = (function (_super) {
    __extends(AdvancedRequestSpecification, _super);
    function AdvancedRequestSpecification(url) {
        _super.call(this);
        this.method = "GET";
        this.headers = {};
        this.appendAuthorization = true;
        this.checkErrors = true;
        this.appendBaseUrl = true;
        if (!Helper_1.Helper.isString(url)) {
            throw new DetailErrors_1.IllegalArgumentError("URL must be a string");
        }
        this.url = url;
    }
    AdvancedRequestSpecification.prototype.setMethod = function (method) {
        if (Helper_1.httpMethods.indexOf(method) === -1) {
            throw new DetailErrors_1.IllegalArgumentError("Request method must be one of " + Helper_1.httpMethods.join(", "));
        }
        this.method = method;
    };
    AdvancedRequestSpecification.prototype.setBodyAsStream = function (body) {
        if (!Helper_1.Helper.isStream(body)) {
            throw new DetailErrors_1.IllegalArgumentError("Request body must be a readable stream");
        }
        this.body = body;
    };
    AdvancedRequestSpecification.prototype.setBodyAsString = function (body) {
        if (!Helper_1.Helper.isString(body)) {
            throw new DetailErrors_1.IllegalArgumentError("Request body must be a string");
        }
        this.body = Helper_1.Helper.streamify(body);
    };
    AdvancedRequestSpecification.prototype.setBodyStringifyJson = function (body) {
        if (body == null) {
            throw new DetailErrors_1.IllegalArgumentError("Request body may not be null/undefined if set");
        }
        this.setBodyAsString(JSON.stringify(body));
    };
    AdvancedRequestSpecification.prototype.setBodyStringifyXml = function (body) {
        if (body == null) {
            throw new DetailErrors_1.IllegalArgumentError("Request body may not be null/undefined if set");
        }
        this.setBodyAsString(Stringify_1.Stringify.stringify(body));
    };
    AdvancedRequestSpecification.prototype.setHeaders = function (headers) {
        if (!Helper_1.Helper.isObject(headers)) {
            throw new DetailErrors_1.IllegalArgumentError("The headers must be an object");
        }
        this.headers = headers;
    };
    AdvancedRequestSpecification.prototype.disableAuthorization = function () {
        this.appendAuthorization = false;
    };
    AdvancedRequestSpecification.prototype.disableErrorChecking = function () {
        this.checkErrors = false;
    };
    AdvancedRequestSpecification.prototype.disableBaseUrl = function () {
        this.appendBaseUrl = false;
    };
    return AdvancedRequestSpecification;
}(SandboxObject_1.SandboxObject));
exports.AdvancedRequestSpecification = AdvancedRequestSpecification;
