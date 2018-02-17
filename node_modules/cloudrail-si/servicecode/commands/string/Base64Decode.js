"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var Base64Decode = (function () {
    function Base64Decode() {
    }
    Base64Decode.prototype.getIdentifier = function () {
        return "string.base64decode";
    };
    Base64Decode.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        var resultData = Helper_1.Helper.makeBuffer(sourceString, "base64");
        environment.setVariable(resultVar, resultData);
    };
    return Base64Decode;
}());
exports.Base64Decode = Base64Decode;
