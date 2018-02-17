"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["create", "$P0.crToYelp", "Object"],
        ["create", "$P0.yelpToCr", "Object"],
        ["callFunc", "addCategory", "$P0", "airport", "airports"],
        ["callFunc", "addCategory", "$P0", "atm", "bank"],
        ["callFunc", "addCategory", "$P0", "amusement_park", "amusementparks"],
        ["callFunc", "addCategory", "$P0", "aquarium", "aquariums"],
        ["callFunc", "addCategory", "$P0", "art_gallery", "galleries"],
        ["callFunc", "addCategory", "$P0", "bakery", "bakeries"],
        ["callFunc", "addCategory", "$P0", "bank", "banks"],
        ["callFunc", "addCategory", "$P0", "bar", "bars"],
        ["callFunc", "addCategory", "$P0", "beauty_salon", "beautysvc"],
        ["callFunc", "addCategory", "$P0", "bicycle_store", "bicycles"],
        ["callFunc", "addCategory", "$P0", "book_store", "bookstores"],
        ["callFunc", "addCategory", "$P0", "bowling_alley", "bowling"],
        ["callFunc", "addCategory", "$P0", "bus_station", "buses"],
        ["callFunc", "addCategory", "$P0", "cafe", "cafes"],
        ["callFunc", "addCategory", "$P0", "car_dealer", "car_dealers"],
        ["callFunc", "addCategory", "$P0", "car_rental", "carrental"],
        ["callFunc", "addCategory", "$P0", "car_repair", "autorepair"],
        ["callFunc", "addCategory", "$P0", "car_wash", "carwash"],
        ["callFunc", "addCategory", "$P0", "casino", "casinos"],
        ["callFunc", "addCategory", "$P0", "cemetery", "funeralservices"],
        ["callFunc", "addCategory", "$P0", "church", "churches"],
        ["callFunc", "addCategory", "$P0", "clothing_store", "fashion"],
        ["callFunc", "addCategory", "$P0", "convenience_store", "convenience"],
        ["callFunc", "addCategory", "$P0", "courthouse", "courthouses"],
        ["callFunc", "addCategory", "$P0", "dentist", "dentists"],
        ["callFunc", "addCategory", "$P0", "department_store", "deptstores"],
        ["callFunc", "addCategory", "$P0", "doctor", "physicians"],
        ["callFunc", "addCategory", "$P0", "electronics_store", "electronics"],
        ["callFunc", "addCategory", "$P0", "embassy", "embassy"],
        ["callFunc", "addCategory", "$P0", "finance", "financialservices"],
        ["callFunc", "addCategory", "$P0", "fire_station", "firedepartments"],
        ["callFunc", "addCategory", "$P0", "florist", "florists"],
        ["callFunc", "addCategory", "$P0", "food", "food"],
        ["callFunc", "addCategory", "$P0", "funeral_home", "funeralservices"],
        ["callFunc", "addCategory", "$P0", "furniture_store", "furniture"],
        ["callFunc", "addCategory", "$P0", "gas_station", "servicestations"],
        ["callFunc", "addCategory", "$P0", "grocery_or_supermarket", "grocery"],
        ["callFunc", "addCategory", "$P0", "gym", "gyms"],
        ["callFunc", "addCategory", "$P0", "hardware_store", "hardware"],
        ["callFunc", "addCategory", "$P0", "health", "health"],
        ["callFunc", "addCategory", "$P0", "hindu_temple", "hindu_temples"],
        ["callFunc", "addCategory", "$P0", "hospital", "hospitals"],
        ["callFunc", "addCategory", "$P0", "jewelry_store", "jewelry"],
        ["callFunc", "addCategory", "$P0", "laundry", "drycleaninglaundry"],
        ["callFunc", "addCategory", "$P0", "lawyer", "lawyers"],
        ["callFunc", "addCategory", "$P0", "library", "libraries"],
        ["callFunc", "addCategory", "$P0", "locksmith", "locksmiths"],
        ["callFunc", "addCategory", "$P0", "mosque", "mosques"],
        ["callFunc", "addCategory", "$P0", "movie_theater", "movietheaters"],
        ["callFunc", "addCategory", "$P0", "museum", "museums"],
        ["callFunc", "addCategory", "$P0", "night_club", "danceclubs"],
        ["callFunc", "addCategory", "$P0", "parks", "parks"],
        ["callFunc", "addCategory", "$P0", "parking", "parking"],
        ["callFunc", "addCategory", "$P0", "pet_store", "petstore"],
        ["callFunc", "addCategory", "$P0", "pharmacy", "pharmacy"],
        ["callFunc", "addCategory", "$P0", "physiotherapist", "physicaltherapy"],
        ["callFunc", "addCategory", "$P0", "police", "policedepartments"],
        ["callFunc", "addCategory", "$P0", "post_office", "postoffices"],
        ["callFunc", "addCategory", "$P0", "real_estate_agency", "realestateagents"],
        ["callFunc", "addCategory", "$P0", "restaurant", "restaurants"],
        ["callFunc", "addCategory", "$P0", "rv_park", "rvparks"],
        ["callFunc", "addCategory", "$P0", "school", "education"],
        ["callFunc", "addCategory", "$P0", "shoe_store", "shoes"],
        ["callFunc", "addCategory", "$P0", "shopping_mall", "shoppingcenters"],
        ["callFunc", "addCategory", "$P0", "spa", "spas"],
        ["callFunc", "addCategory", "$P0", "stadium", "stadiumsarenas"],
        ["callFunc", "addCategory", "$P0", "synagogue", "synagogues"],
        ["callFunc", "addCategory", "$P0", "taxi_stand", "taxis"],
        ["callFunc", "addCategory", "$P0", "train_station", "trainstations"],
        ["callFunc", "addCategory", "$P0", "travel_agency", "travelagents"],
        ["callFunc", "addCategory", "$P0", "university", "collegeuniv"],
        ["callFunc", "addCategory", "$P0", "veterinary_care", "vet"],
        ["callFunc", "addCategory", "$P0", "zoo", "zoos"]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["set", "$L0.url", "https://api.yelp.com/v3"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if!=than", "$P2.appendAuthorization", 0, 2],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "getNearbyPOIs": [
        ["callFunc", "checkNull", "$P0", "$P2", "Latitude"],
        ["callFunc", "checkNull", "$P0", "$P3", "Longitude"],
        ["callFunc", "checkNull", "$P0", "$P4", "Radius"],
        ["callFunc", "checkLessThan", "$P0", "$P2", -90, "Latitude"],
        ["callFunc", "checkLessThan", "$P0", "$P3", -180, "Longitude"],
        ["callFunc", "checkLessThan", "$P0", "$P4", 0, "Radius"],
        ["callFunc", "checkGreaterThan", "$P0", "$P2", 90, "Latitude"],
        ["callFunc", "checkGreaterThan", "$P0", "$P3", 180, "Longitude"],
        ["callFunc", "checkGreaterThan", "$P0", "$P4", 40000, "Radius"],
        ["if!=than", "$P6", null, 1],
        ["callFunc", "checkIsEmpty", "$P0", "$P6", "Categories"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["set", "$L0.url", "https://api.yelp.com/v3/businesses/search"],
        ["create", "$L1", "String", "?"],
        ["string.concat", "$L1", "$L1", "latitude=", "$P2"],
        ["string.concat", "$L1", "$L1", "&longitude=", "$P3"],
        ["string.concat", "$L1", "$L1", "&radius=", "$P4"],
        ["if!=than", "$P5", null, 2],
        ["string.urlEncode", "$L2", "$P5"],
        ["string.concat", "$L1", "$L1", "&term=", "$L2"],
        ["if!=than", "$P6", null, 3],
        ["callFunc", "getCategoriesString", "$P0", "$L2", "$P6"],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L1", "$L1", "&categories=", "$L2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.concat", "$L0.url", "$L0.url", "$L1"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpResponse", "$P0", "$L2"],
        ["json.parse", "$L3", "$L2.responseBody"],
        ["create", "$P1", "Array"],
        ["create", "$L4", "Number", 0],
        ["size", "$L5", "$L3.businesses"],
        ["if<than", "$L4", "$L5", 5],
        ["get", "$L6", "$L3.businesses", "$L4"],
        ["callFunc", "extractBusiness", "$P0", "$L7", "$L6"],
        ["push", "$P1", "$L7"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -6]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be null."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkLessThan": [
        ["if<than", "$P1", "$P2", 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be less than ", "$P2", "."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkGreaterThan": [
        ["if>than", "$P1", "$P2", 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be greater than ", "$P2", "."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkIsEmpty": [
        ["size", "$L0", "$P2"],
        ["if==than", "$L0", 0, 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be empty."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkAuthentication": [
        ["create", "$L0", "Date"],
        ["if==than", "$S0.accessToken", null, 2],
        ["callFunc", "authenticate", "$P0"],
        ["return"],
        ["create", "$L1", "Date"],
        ["set", "$L1.time", "$S0.expires_in"],
        ["if<than", "$L1", "$L0", 1],
        ["callFunc", "authenticate", "$P0"]
    ],
    "authenticate": [
        ["create", "$L8", "String", ""],
        ["string.concat", "$L8", "$L8", "grant_type=client_credentials", "&client_id=", "$P0.clientID", "&client_secret=", "$P0.clientSecret"],
        ["stream.stringToStream", "$L9", "$L8"],
        ["create", "$L10", "Object"],
        ["set", "$L10.Accept", "application/json"],
        ["set", "$L10", "application/x-www-form-urlencoded", "Content-Type"],
        ["create", "$L11", "Object"],
        ["set", "$L11.url", "https://api.yelp.com/oauth2/token"],
        ["set", "$L11.method", "POST"],
        ["set", "$L11.requestBody", "$L9"],
        ["set", "$L11.requestHeaders", "$L10"],
        ["http.requestCall", "$L12", "$L11"],
        ["callFunc", "checkHttpResponse", "$P0", "$L12"],
        ["create", "$L13", "String"],
        ["stream.streamToString", "$L13", "$L12.responseBody"],
        ["json.parse", "$L14", "$L13"],
        ["set", "$S0.accessToken", "$L14.access_token"]
    ],
    "checkHttpResponse": [
        ["if>=than", "$P1.code", 400, 9],
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L3", "Error", "Invalid credentials or access rights. Make sure that your application has read and write permission.", "Authentication"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 2],
        ["create", "$L3", "Error", "Service unavailable. Try again later.", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["create", "$L1", "Error", "$L0.error.description", "Http"],
        ["throwError", "$L1"]
    ],
    "getCategoriesString": [
        ["create", "$P1", "String"],
        ["create", "$L0", "Number", 0],
        ["size", "$L1", "$P2"],
        ["if<than", "$L0", "$L1", 10],
        ["get", "$L2", "$P2", "$L0"],
        ["get", "$L2", "$P0.crToYelp", "$L2"],
        ["if==than", "$L2", null, 2],
        ["create", "$L3", "Error", "Unknown category.", "IllegalArgument"],
        ["throwError", "$L3"],
        ["if!=than", "$L0", 0, 1],
        ["string.concat", "$P1", "$P1", ","],
        ["string.concat", "$P1", "$P1", "$L2"],
        ["math.add", "$L0", "$L0", 1],
        ["jumpRel", -11]
    ],
    "extractBusiness": [
        ["create", "$L0", "Location"],
        ["set", "$L0.latitude", "$P2.coordinates.latitude"],
        ["set", "$L0.longitude", "$P2.coordinates.longitude"],
        ["create", "$L1", "Array"],
        ["create", "$L2", "Number", 0],
        ["size", "$L3", "$P2.categories"],
        ["if<than", "$L2", "$L3", 7],
        ["get", "$L4", "$P2.categories", "$L2"],
        ["set", "$L5", "$L4.alias"],
        ["get", "$L6", "$P0.yelpToCr", "$L5"],
        ["if!=than", "$L6", null, 1],
        ["push", "$L1", "$L6"],
        ["math.add", "$L2", "$L2", 1],
        ["jumpRel", -8],
        ["create", "$P1", "POI", "$L1", "$P2.image_url", "$L0", "$P2.name", "$P2.phone"]
    ],
    "addCategory": [
        ["set", "$P0.crToYelp", "$P2", "$P1"],
        ["set", "$P0.yelpToCr", "$P1", "$P2"]
    ]
};
var Yelp = (function () {
    function Yelp(redirectReceiver, clientID, clientSecret) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Yelp");
        this.interpreterStorage["clientID"] = clientID;
        this.interpreterStorage["clientSecret"] = clientSecret;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Yelp.prototype.getNearbyPOIs = function (latitude, longitude, radius, searchTerm, categories, callback) {
        Statistics_1.Statistics.addCall("Yelp", "getNearbyPOIs");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getNearbyPOIs", this.interpreterStorage, null, latitude, longitude, radius, searchTerm, categories).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Yelp", "getNearbyPOIs");
        }).then(function () {
            var res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Yelp.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Yelp", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Yelp.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Yelp", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Yelp.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Yelp", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Yelp;
}());
exports.Yelp = Yelp;
