"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var Stringify = (function () {
    function Stringify() {
    }
    Stringify.prototype.getIdentifier = function () {
        return "xml.stringify";
    };
    Stringify.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var input = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isObject(input));
        var xmlString = Stringify.stringify(input);
        environment.setVariable(resultVar, xmlString);
    };
    Stringify.stringify = function (input) {
        if (!input.name) {
            throw new Error("XML to be stringified has no tag name!");
        }
        var res = "<" + input.name;
        if (input.attributes) {
            for (var _i = 0, _a = Object.keys(input.attributes); _i < _a.length; _i++) {
                var attrName = _a[_i];
                var attrVal = input.attributes[attrName];
                res += " " + attrName + "=\"" + attrVal + "\"";
            }
        }
        res += ">";
        if (input.text) {
            res += input.text;
        }
        if (input.children) {
            for (var _b = 0, _c = input.children; _b < _c.length; _b++) {
                var child = _c[_b];
                res += Stringify.stringify(child);
            }
        }
        res += "</" + input.name + ">";
        return res;
    };
    return Stringify;
}());
exports.Stringify = Stringify;
