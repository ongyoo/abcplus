"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var Sort = (function () {
    function Sort() {
    }
    Sort.prototype.getIdentifier = function () {
        return "array.sort";
    };
    Sort.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var array = Helper_1.Helper.resolve(environment, parameters[1]);
        var sortedArray = array.slice().sort();
        environment.setVariable(resultVar, sortedArray);
    };
    return Sort;
}());
exports.Sort = Sort;
