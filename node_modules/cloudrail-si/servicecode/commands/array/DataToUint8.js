"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var DataToUint8 = (function () {
    function DataToUint8() {
    }
    DataToUint8.prototype.getIdentifier = function () {
        return "array.dataToArray";
    };
    DataToUint8.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var buf = Helper_1.Helper.resolve(environment, parameters[1]);
        var numberArray = Helper_1.Helper.bufferToUint8Array(buf);
        environment.setVariable(resultVar, numberArray);
    };
    return DataToUint8;
}());
exports.DataToUint8 = DataToUint8;
