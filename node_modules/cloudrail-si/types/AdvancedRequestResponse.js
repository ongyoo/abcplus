"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SandboxObject_1 = require("./SandboxObject");
var Helper_1 = require("../helpers/Helper");
var Parse_1 = require("../servicecode/commands/xml/Parse");
var AdvancedRequestResponse = (function (_super) {
    __extends(AdvancedRequestResponse, _super);
    function AdvancedRequestResponse() {
        _super.apply(this, arguments);
    }
    AdvancedRequestResponse.prototype.getBodyAsStream = function () {
        if (!this._stringBody) {
            return this.body;
        }
        else {
            throw new Error("Response stream was already read");
        }
    };
    AdvancedRequestResponse.prototype.getBodyAsString = function (callback) {
        var _this = this;
        if (!this._stringBody) {
            Helper_1.Helper.dumpStream(this.body).then(function (str) {
                _this._stringBody = str;
                callback(undefined, _this._stringBody);
            }, function (err) {
                callback(err);
            });
        }
        else {
            callback(undefined, this._stringBody);
        }
    };
    AdvancedRequestResponse.prototype.getBodyJsonParsed = function (callback) {
        this.getBodyAsString(function (err, stringBody) {
            if (err) {
                callback(err);
            }
            else {
                callback(undefined, JSON.parse(stringBody));
            }
        });
    };
    AdvancedRequestResponse.prototype.getBodyXmlParsed = function (callback) {
        this.getBodyAsString(function (err, stringBody) {
            if (err) {
                callback(err);
            }
            else {
                callback(undefined, Parse_1.Parse.parse(stringBody));
            }
        });
    };
    AdvancedRequestResponse.prototype.getHeaders = function () {
        return this.headers;
    };
    AdvancedRequestResponse.prototype.getStatus = function () {
        return this.status;
    };
    return AdvancedRequestResponse;
}(SandboxObject_1.SandboxObject));
exports.AdvancedRequestResponse = AdvancedRequestResponse;
