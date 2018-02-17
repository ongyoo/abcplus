"use strict";
var Helper_1 = require("../../../helpers/Helper");
var VarAddress_1 = require("../../VarAddress");
var crypto = require("crypto");
var Base64Encode_1 = require("../string/Base64Encode");
var Sign = (function () {
    function Sign(identifier, signMethod) {
        this.identifier = identifier;
        this.signMethod = signMethod;
    }
    Sign.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Sign.prototype.execute = function (environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        var resultVar = parameters[0];
        var key = Helper_1.Helper.resolve(environment, parameters[2]);
        var message = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isData(key) && Helper_1.Helper.isData(message));
        var keyString = '-----BEGIN PRIVATE KEY-----\n' + Base64Encode_1.Base64Encode.encode(key, true, false) + '\n-----END PRIVATE KEY-----\n';
        var sign = crypto.createSign(this.signMethod);
        sign.update(message);
        var buf = sign.sign(keyString);
        environment.setVariable(resultVar, buf);
    };
    return Sign;
}());
exports.Sign = Sign;
