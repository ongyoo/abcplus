"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var xmldoc = require("xmldoc");
var Parse = (function () {
    function Parse() {
    }
    Parse.prototype.getIdentifier = function () {
        return "xml.parse";
    };
    Parse.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var input = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isStream(input) || Helper_1.Helper.isString(input));
        if (Helper_1.Helper.isStream(input)) {
            return Helper_1.Helper.dumpStream(input).then(function (stringInput) {
                Helper_1.Helper.assert(Helper_1.Helper.isString(stringInput));
                var parsed = Parse.parse(stringInput);
                environment.setVariable(resultVar, parsed);
            });
        }
        else {
            var parsed = Parse.parse(input);
            environment.setVariable(resultVar, parsed);
        }
    };
    Parse.parse = function (input) {
        var element = new xmldoc.XmlDocument(input);
        return parseElement(element);
    };
    return Parse;
}());
exports.Parse = Parse;
function parseElement(element) {
    return {
        attributes: element.attr,
        text: element.val,
        name: element.name,
        children: element.children.map(function (child) { return parseElement(child); })
    };
}
