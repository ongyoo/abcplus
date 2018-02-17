"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var StreamToData = (function () {
    function StreamToData() {
    }
    StreamToData.prototype.getIdentifier = function () {
        return "stream.streamToData";
    };
    StreamToData.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var stream = environment.getVariable(parameters[1]);
        return Helper_1.Helper.dumpStream(stream, undefined, true).then(function (data) {
            environment.setVariable(resultVar, data);
        });
    };
    return StreamToData;
}());
exports.StreamToData = StreamToData;
