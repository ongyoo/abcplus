"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var DataToStream = (function () {
    function DataToStream() {
    }
    DataToStream.prototype.getIdentifier = function () {
        return "stream.dataToStream";
    };
    DataToStream.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var buffer = environment.getVariable(parameters[1]);
        var stream = Helper_1.Helper.streamify(buffer);
        environment.setVariable(resultVar, stream);
    };
    return DataToStream;
}());
exports.DataToStream = DataToStream;
