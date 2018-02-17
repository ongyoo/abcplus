"use strict";
var crypto = require("crypto");
var Helper_1 = require("../../helpers/Helper");
var VarAddress_1 = require("../VarAddress");
var Hash = (function () {
    function Hash(identifier, hashMethod) {
        this.identifier = identifier;
        this.hashMethod = hashMethod;
    }
    Hash.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Hash.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var source = Helper_1.Helper.resolve(environment, parameters[1]);
        var hash = crypto.createHash(this.hashMethod);
        hash.update(source);
        var buf = hash.digest();
        var numberArray = Helper_1.Helper.bufferToUint8Array(buf);
        environment.setVariable(resultVar, numberArray);
    };
    return Hash;
}());
exports.Hash = Hash;
