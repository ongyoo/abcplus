"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var ChunkSplit = (function () {
    function ChunkSplit() {
    }
    ChunkSplit.prototype.getIdentifier = function () {
        return "string.chunkSplit";
    };
    ChunkSplit.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        var chunkSize = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isNumber(chunkSize));
        var resultArray = sourceString.match(/(.|[\r\n]){1,chunkSize}/g);
        environment.setVariable(resultVar, resultArray);
    };
    return ChunkSplit;
}());
exports.ChunkSplit = ChunkSplit;
