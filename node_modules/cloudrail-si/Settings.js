"use strict";
var Settings = (function () {
    function Settings() {
    }
    Settings.setKey = function (key) {
        Settings.licenseKey = key;
    };
    Settings.block = false;
    return Settings;
}());
exports.Settings = Settings;
