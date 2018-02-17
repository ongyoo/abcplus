"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var Uint8ToData = (function () {
    function Uint8ToData() {
    }
    Uint8ToData.prototype.getIdentifier = function () {
        return "array.arrayToData";
    };
    Uint8ToData.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var source = Helper_1.Helper.resolve(environment, parameters[1]);
        var resultData = Helper_1.Helper.makeBuffer(source);
        environment.setVariable(resultVar, resultData);
    };
    return Uint8ToData;
}());
exports.Uint8ToData = Uint8ToData;
