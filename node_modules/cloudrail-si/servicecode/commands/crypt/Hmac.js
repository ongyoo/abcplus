"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var crypto = require("crypto");
var Hmac = (function () {
    function Hmac(identifier, hashMethod) {
        this.identifier = identifier;
        this.hashMethod = hashMethod;
    }
    Hmac.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Hmac.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var key = Helper_1.Helper.resolve(environment, parameters[1]);
        var message = Helper_1.Helper.resolve(environment, parameters[2]);
        if (Helper_1.Helper.isArray(key)) {
            key = Helper_1.Helper.makeBuffer(key);
        }
        var hmac = crypto.createHmac(this.hashMethod, key);
        hmac.update(message);
        var buf = hmac.digest();
        var numberArray = Helper_1.Helper.bufferToUint8Array(buf);
        environment.setVariable(resultVar, numberArray);
    };
    return Hmac;
}());
exports.Hmac = Hmac;
