"use strict";
var Helper_1 = require("../../helpers/Helper");
var VarAddress_1 = require("../VarAddress");
var TypeOf = (function () {
    function TypeOf() {
    }
    TypeOf.prototype.getIdentifier = function () {
        return "typeOf";
    };
    TypeOf.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        var targetVar = parameters[0];
        var obj = environment.getVariable(parameters[1]);
        var type = null;
        if (Helper_1.Helper.isArray(obj)) {
            type = "Array";
        }
        else if (Helper_1.Helper.isObject(obj)) {
            type = "Object";
        }
        else if (Helper_1.Helper.isString(obj)) {
            type = "String";
        }
        else if (Helper_1.Helper.isNumber(obj)) {
            type = "Number";
        }
        else if (Helper_1.Helper.isStream(obj)) {
            type = "Stream";
        }
        else if (Helper_1.Helper.isData(obj)) {
            type = "Data";
        }
        environment.setVariable(targetVar, type);
    };
    return TypeOf;
}());
exports.TypeOf = TypeOf;
