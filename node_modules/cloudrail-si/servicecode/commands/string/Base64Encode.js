"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var Base64Encode = (function () {
    function Base64Encode() {
    }
    Base64Encode.prototype.getIdentifier = function () {
        return "string.base64encode";
    };
    Base64Encode.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var source = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(source) || Helper_1.Helper.isData(source));
        var lineBreak = false;
        var webSafe = false;
        if (parameters.length >= 3) {
            lineBreak = !!Helper_1.Helper.resolve(environment, parameters[2]);
        }
        if (parameters.length >= 4) {
            webSafe = !!Helper_1.Helper.resolve(environment, parameters[3]);
        }
        var resultString = Base64Encode.encode(source, lineBreak, webSafe);
        environment.setVariable(resultVar, resultString);
    };
    Base64Encode.encode = function (s, lineBreak, webSafe) {
        var str = Helper_1.Helper.makeBuffer(s).toString("base64");
        if (lineBreak) {
            var newStr = str.match(/.{64}/g).join("\r\n");
            newStr += "\r\n" + str.slice(-(str.length % 64));
            str = newStr;
        }
        if (webSafe) {
            str = str.replace(/\+/g, "-");
            str = str.replace(/\//g, "_");
        }
        return str;
    };
    return Base64Encode;
}());
exports.Base64Encode = Base64Encode;
