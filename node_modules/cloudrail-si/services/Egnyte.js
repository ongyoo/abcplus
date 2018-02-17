"use strict";
var Interpreter_1 = require("../servicecode/Interpreter");
var Sandbox_1 = require("../servicecode/Sandbox");
var Helper_1 = require("../helpers/Helper");
var InitSelfTest_1 = require("../servicecode/InitSelfTest");
var Statistics_1 = require("../statistics/Statistics");
var SERVICE_CODE = {
    "init": [
        ["if==than", "$P0.scopes", null, 2],
        ["set", "$P0.scope", "Egnyte.filesystem%20Egnyte.link"],
        ["jumpRel", 10],
        ["create", "$P0.scope", "String"],
        ["size", "$L0", "$P0.scopes"],
        ["create", "$L1", "Number", 0],
        ["if<than", "$L1", "$L0", 6],
        ["if!=than", "$L1", 0, 1],
        ["string.concat", "$P0.scope", "$P0.scope", "%20"],
        ["get", "$L2", "$P0.scopes", "$L1"],
        ["string.concat", "$P0.scope", "$P0.scope", "$L2"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -7]
    ],
    "CloudStorage:getUserLogin": [],
    "CloudStorage:getUserName": [
        ["callFunc", "User:about", "$P0"],
        ["set", "$P1", "$P0.userInfo.displayName"]
    ],
    "User:about": [
        ["if!=than", "$P0.userInfo", null, 4],
        ["create", "$L0", "Date"],
        ["math.add", "$L0", "$L0.Time", -1000],
        ["if>than", "$P0.userInfo.lastUpdate", "$L0", 1],
        ["return"],
        ["callFunc", "User:aboutRequest", "$P0"]
    ],
    "User:aboutRequest": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/userinfo"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["set", "$L0.method", "GET"],
        ["http.requestCall", "$L1", "$L0"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P0.userInfo", "Object"],
        ["create", "$L3", "Date"],
        ["set", "$P0.userInfo.lastUpdate", "$L3.Time"],
        ["set", "$P0.userInfo.displayName", "$L2.user.username"]
    ],
    "CloudStorage:download": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "encodePath", "$P0", "$L12", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs-content", "$L12"],
        ["set", "$L0.method", "GET"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"],
        ["set", "$P1", "$L5.responseBody"]
    ],
    "CloudStorage:upload": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "encodePath", "$P0", "$L11", "$P1"],
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkPositive", "$P0", "$P3"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["if==than", "$P4", 0, 1],
        ["callFunc", "checkFileNotExists", "$P0", "$P1"],
        ["callFunc", "checkParentPathExists", "$P0", "$P1"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs-content", "$L11"],
        ["set", "$L0.method", "POST"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["string.concat", "$L0.requestHeaders.Content-Length", "$P3", ""],
        ["set", "$L0.requestHeaders.Content-Type", "text/plain"],
        ["set", "$L0.requestBody", "$P2"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"]
    ],
    "CloudStorage:move": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "encodePath", "$P0", "$L11", "$P1"],
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "checkParentPathExists", "$P0", "$P2"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L11"],
        ["set", "$L0.method", "POST"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["create", "$L1", "Object"],
        ["set", "$L1.action", "move"],
        ["set", "$L1.destination", "$P2"],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"]
    ],
    "CloudStorage:delete": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "encodePath", "$P0", "$L11", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L11"],
        ["set", "$L0.method", "DELETE"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"]
    ],
    "CloudStorage:copy": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "encodePath", "$P0", "$L11", "$P1"],
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "checkParentPathExists", "$P0", "$P2"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L11"],
        ["set", "$L0.method", "POST"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["create", "$L1", "Object"],
        ["set", "$L1.action", "copy"],
        ["set", "$L1.destination", "$P2"],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"]
    ],
    "CloudStorage:createFolder": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "encodePath", "$P0", "$L11", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "checkParentPathExists", "$P0", "$P1"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L11"],
        ["set", "$L0.method", "POST"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["set", "$L0.requestHeaders.Content-Type", "application/json"],
        ["create", "$L1", "Object"],
        ["set", "$L1.action", "add_folder"],
        ["json.stringify", "$L1", "$L1"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"]
    ],
    "CloudStorage:getMetadata": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "encodePath", "$P0", "$L12", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L12", "?list_content=false"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L3"],
        ["json.parse", "$L4", "$L3.responseBody"],
        ["callFunc", "extractMeta", "$P0", "$P1", "$L4"]
    ],
    "CloudStorage:getChildren": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "encodePath", "$P0", "$L12", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L12"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L3"],
        ["json.parse", "$L4", "$L3.responseBody"],
        ["if==than", "$L4.is_folder", 0, 2],
        ["create", "$L5", "Error", "Only folders have children, the given path points to a file", "IllegalArgument"],
        ["throwError", "$L5"],
        ["create", "$P1", "Array"],
        ["if!=than", "$L4.folders", null, 8],
        ["size", "$L5", "$L4.folders"],
        ["set", "$L6", 0],
        ["if<than", "$L6", "$L5", 5],
        ["get", "$L7", "$L4.folders", "$L6"],
        ["callFunc", "extractMeta", "$P0", "$L8", "$L7"],
        ["push", "$P1", "$L8"],
        ["math.add", "$L6", "$L6", 1],
        ["jumpRel", -6],
        ["if!=than", "$L4.files", null, 8],
        ["size", "$L5", "$L4.files"],
        ["set", "$L6", 0],
        ["if<than", "$L6", "$L5", 5],
        ["get", "$L7", "$L4.files", "$L6"],
        ["callFunc", "extractMeta", "$P0", "$L8", "$L7"],
        ["push", "$P1", "$L8"],
        ["math.add", "$L6", "$L6", 1],
        ["jumpRel", -6]
    ],
    "getChildrenPage": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "encodePath", "$P0", "$L12", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L12", "?offset=", "$P3", "&count=", "$P4"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L3"],
        ["json.parse", "$L4", "$L3.responseBody"],
        ["if==than", "$L4.is_folder", 0, 2],
        ["create", "$L5", "Error", "Only folders have children, the given path points to a file", "IllegalArgument"],
        ["throwError", "$L5"],
        ["create", "$P1", "Array"],
        ["if!=than", "$L4.folders", null, 8],
        ["size", "$L5", "$L4.folders"],
        ["set", "$L6", 0],
        ["if<than", "$L6", "$L5", 5],
        ["get", "$L7", "$L4.folders", "$L6"],
        ["callFunc", "extractMeta", "$P0", "$L8", "$L7"],
        ["push", "$P1", "$L8"],
        ["math.add", "$L6", "$L6", 1],
        ["jumpRel", -6],
        ["if!=than", "$L4.files", null, 8],
        ["size", "$L5", "$L4.files"],
        ["set", "$L6", 0],
        ["if<than", "$L6", "$L5", 5],
        ["get", "$L7", "$L4.files", "$L6"],
        ["callFunc", "extractMeta", "$P0", "$L8", "$L7"],
        ["push", "$P1", "$L8"],
        ["math.add", "$L6", "$L6", 1],
        ["jumpRel", -6]
    ],
    "CloudStorage:exists": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "encodePath", "$P0", "$L12", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L12", "?list_content=false&list_custom_metadata=false"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L4", "$L2"],
        ["if==than", "$L4.code", 200, 2],
        ["set", "$P1", 1],
        ["return"],
        ["set", "$P1", 0]
    ],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["set", "$S0.access_token", null]
    ],
    "CloudStorage:getAllocation": [],
    "CloudStorage:createShareLink": [
        ["callFunc", "CloudStorage:getMetadata", "$P0", "$L0", "$P2"],
        ["if==than", "$L0.folder", 0, 1],
        ["set", "$L1", "file"],
        ["if!=than", "$L0.folder", 0, 1],
        ["set", "$L1", "folder"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/links"],
        ["set", "$L2.method", "POST"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["set", "$L2.requestHeaders.Content-Type", "application/json"],
        ["create", "$L3", "Object"],
        ["set", "$L3.path", "$P2"],
        ["set", "$L3.type", "$L1"],
        ["set", "$L3.accessibility", "anyone"],
        ["json.stringify", "$L3", "$L3"],
        ["stream.stringToStream", "$L2.requestBody", "$L3"],
        ["http.requestCall", "$L4", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["get", "$P1", "$L5", "links", 0, "url"]
    ],
    "CloudStorage:getThumbnail": [],
    "CloudStorage:searchFiles": [
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["if==than", "$P2", "", 2],
        ["create", "$L0", "Error", "The query is not allowed to be empty.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/search"],
        ["create", "$L1", "Object"],
        ["set", "$L0.requestHeaders", "$L1"],
        ["string.concat", "$L1.Authorization", "Bearer ", "$S0.access_token"],
        ["string.urlEncode", "$L2", "$P2"],
        ["string.concat", "$L0.url", "$L0.url", "?query=", "$L2", "&count=100"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["create", "$P1", "Array"],
        ["create", "$L3", "Number"],
        ["size", "$L4", "$L2.results"],
        ["if<than", "$L3", "$L4", 5],
        ["get", "$L5", "$L2.results", "$L3"],
        ["callFunc", "extractMeta", "$P0", "$L6", "$L5"],
        ["push", "$P1", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -6]
    ],
    "AdvancedRequestSupporter:advancedRequest": [
        ["create", "$L0", "Object"],
        ["create", "$L0.url", "String"],
        ["if!=than", "$P2.appendBaseUrl", 0, 1],
        ["string.concat", "$L0.url", "https://", "$P0.domain", ".egnyte.com"],
        ["string.concat", "$L0.url", "$L0.url", "$P2.url"],
        ["set", "$L0.requestHeaders", "$P2.headers"],
        ["set", "$L0.method", "$P2.method"],
        ["set", "$L0.requestBody", "$P2.body"],
        ["if!=than", "$P2.appendAuthorization", 0, 2],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$P2.checkErrors", 0, 1],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P1", "AdvancedRequestResponse"],
        ["set", "$P1.status", "$L1.code"],
        ["set", "$P1.headers", "$L1.responseHeaders"],
        ["set", "$P1.body", "$L1.responseBody"]
    ],
    "checkAuthentication": [
        ["if!=than", null, "$S0.access_token", 1],
        ["return"],
        ["string.concat", "$L0", "https://", "$P0.domain", ".egnyte.com/puboauth/token?response_type=code&scope=", "$P0.scope", "&redirect_uri=", "$P0.redirectUri", "&client_id=", "$P0.clientId", "&state=", "$P0.state"],
        ["awaitCodeRedirect", "$L1", "$L0", null, "$P0.redirectUri"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/puboauth/token"],
        ["set", "$L2.method", "POST"],
        ["create", "$L7", "Object"],
        ["set", "$L7.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L2.requestHeaders", "$L7"],
        ["string.concat", "$L3", "code=", "$L1", "&grant_type=authorization_code", "&redirect_uri=", "$P0.redirectUri", "&client_id=", "$P0.clientId", "&client_secret=", "$P0.clientSecret"],
        ["stream.stringToStream", "$L4", "$L3"],
        ["set", "$L2.requestBody", "$L4"],
        ["http.requestCall", "$L5", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L5"],
        ["json.parse", "$L6", "$L5.responseBody"],
        ["set", "$S0.access_token", "$L6.access_token"]
    ],
    "encodePath": [
        ["string.split", "$L0", "$P2", "/"],
        ["set", "$L1", 1],
        ["size", "$L2", "$L0"],
        ["set", "$P1", ""],
        ["if<than", "$L1", "$L2", 6],
        ["get", "$L4", "$L0", "$L1"],
        ["string.urlEncode", "$L4", "$L4"],
        ["callFunc", "replacePluses", "$P0", "$L4"],
        ["string.concat", "$P1", "$P1", "/", "$L4"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -7]
    ],
    "replacePluses": [
        ["string.split", "$L0", "$P1", "\\+"],
        ["set", "$L1", 1],
        ["size", "$L2", "$L0"],
        ["get", "$P1", "$L0", 0],
        ["if<than", "$L1", "$L2", 4],
        ["get", "$L3", "$L0", "$L1"],
        ["string.concat", "$P1", "$P1", "%20", "$L3"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -5]
    ],
    "validatePath": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "Path shouldn't be null", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P1", "", 2],
        ["create", "$L0", "Error", "Path should start with '/'.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["create", "$L0", "String"],
        ["string.substr", "$L0", "$P1", 0, 1],
        ["if!=than", "$L0", "/", 2],
        ["create", "$L0", "Error", "Path should start with '/'.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["create", "$L1", "Number"],
        ["size", "$L1", "$P1"],
        ["math.add", "$L1", "$L1", -1],
        ["if!=than", "$L1", 0, 5],
        ["create", "$L2", "String"],
        ["string.substr", "$L2", "$P1", "$L1", 1],
        ["if==than", "$L2", "/", 2],
        ["create", "$L3", "Error", "Path should not end with '/'.", "IllegalArgument"],
        ["throwError", "$L3"]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "Passed argument is null.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "checkPositive": [
        ["if<than", "$P1", 0, 2],
        ["create", "$L0", "Error", "Passed argument should be bigger than 0.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "validateResponse": [
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L0", "Error", "Authentication failed", "Authentication"],
        ["throwError", "$L0"],
        ["if==than", "$P1.code", 403, 2],
        ["create", "$L0", "Error", "Not enough permissions or rate limit exceeded", "Authentication"],
        ["throwError", "$L0"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L0", "Error", "Resource not found", "NotFound"],
        ["throwError", "$L0"],
        ["if==than", "$P1.code", 409, 2],
        ["create", "$L0", "Error", "Conflicting location", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if>=than", "$P1.code", 400, 3],
        ["stream.streamToString", "$L1", "$P1.responseBody"],
        ["create", "$L0", "Error", "$L1", "Http"],
        ["throwError", "$L0"]
    ],
    "checkParentPathExists": [
        ["string.lastIndexOf", "$L0", "$P1", "/"],
        ["string.substring", "$L1", "$P1", 0, "$L0"],
        ["if==than", "$L1", "", 1],
        ["return"],
        ["callFunc", "encodePath", "$P0", "$L11", "$L1"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L11", "?list_content=false&list_custom_metadata=false"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L4", "$L2"],
        ["if!=than", "$L4.code", 200, 2],
        ["create", "$L5", "Error", "Target folder not found.", "NotFound"],
        ["throwError", "$L5"]
    ],
    "checkFileNotExists": [
        ["callFunc", "encodePath", "$P0", "$L11", "$P1"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L2.url", "https://", "$P0.domain", ".egnyte.com/pubapi/v1/fs", "$L11", "?list_content=false&list_custom_metadata=false"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L4", "$L2"],
        ["if==than", "$L4.code", 200, 2],
        ["create", "$L5", "Error", "File already exists.", "Http"],
        ["throwError", "$L5"]
    ],
    "extractMeta": [
        ["create", "$P1", "CloudMetaData"],
        ["set", "$P1.name", "$P2.name"],
        ["set", "$P1.path", "$P2.path"],
        ["if==than", "$P2.is_folder", 0, 4],
        ["set", "$P1.size", "$P2.size"],
        ["set", "$P1.folder", 0],
        ["callFunc", "parseDate", "$P0", "$P1.modifiedAt", "$P2.last_modified"],
        ["return"],
        ["set", "$P1.folder", 1],
        ["set", "$P1.modifiedAt", "$P2.lastModified"]
    ],
    "parseDate": [
        ["string.substr", "$L0", "$P2", 5, 2],
        ["string.substr", "$L1", "$P2", 8, 3],
        ["callFunc", "getMonthNumber", "$P0", "$L6", "$L1"],
        ["string.substr", "$L2", "$P2", 12, 4],
        ["string.substr", "$L3", "$P2", 17, 8],
        ["string.concat", "$L4", "$L2", "-", "$L6", "-", "$L0", "T", "$L3", "Z"],
        ["create", "$L5", "Date", "$L4"],
        ["set", "$P1", "$L5.time"]
    ],
    "getMonthNumber": [
        ["if==than", "$P2", "Jan", 2],
        ["set", "$P1", "01"],
        ["return"],
        ["if==than", "$P2", "Feb", 2],
        ["set", "$P1", "02"],
        ["return"],
        ["if==than", "$P2", "Mar", 2],
        ["set", "$P1", "03"],
        ["return"],
        ["if==than", "$P2", "Apr", 2],
        ["set", "$P1", "04"],
        ["return"],
        ["if==than", "$P2", "May", 2],
        ["set", "$P1", "05"],
        ["return"],
        ["if==than", "$P2", "Jun", 2],
        ["set", "$P1", "06"],
        ["return"],
        ["if==than", "$P2", "Jul", 2],
        ["set", "$P1", "07"],
        ["return"],
        ["if==than", "$P2", "Aug", 2],
        ["set", "$P1", "08"],
        ["return"],
        ["if==than", "$P2", "Sep", 2],
        ["set", "$P1", "09"],
        ["return"],
        ["if==than", "$P2", "Oct", 2],
        ["set", "$P1", "10"],
        ["return"],
        ["if==than", "$P2", "Nov", 2],
        ["set", "$P1", "11"],
        ["return"],
        ["if==than", "$P2", "Dec", 2],
        ["set", "$P1", "12"],
        ["return"],
        ["create", "$L0", "Error", "Could not recognize month in Date"],
        ["throwError", "$L0"]
    ]
};
var Egnyte = (function () {
    function Egnyte(redirectReceiver, domain, clientId, clientSecret, redirectUri, state, scopes) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Egnyte");
        this.interpreterStorage["domain"] = domain;
        this.interpreterStorage["clientId"] = clientId;
        this.interpreterStorage["clientSecret"] = clientSecret;
        this.interpreterStorage["redirectUri"] = redirectUri;
        this.interpreterStorage["state"] = state;
        this.interpreterStorage["scopes"] = scopes;
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    Egnyte.prototype.download = function (filePath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "download");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:download", this.interpreterStorage, null, filePath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "download");
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
    Egnyte.prototype.upload = function (filePath, stream, size, overwrite, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "upload");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:upload", this.interpreterStorage, filePath, stream, size, overwrite ? 1 : 0).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "upload");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.move = function (sourcePath, destinationPath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "move");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:move", this.interpreterStorage, sourcePath, destinationPath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "move");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.delete = function (filePath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "delete");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:delete", this.interpreterStorage, filePath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "delete");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.copy = function (sourcePath, destinationPath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "copy");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:copy", this.interpreterStorage, sourcePath, destinationPath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "copy");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.createFolder = function (folderPath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "createFolder");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:createFolder", this.interpreterStorage, folderPath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "createFolder");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.getMetadata = function (filePath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getMetadata");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getMetadata", this.interpreterStorage, null, filePath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getMetadata");
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
    Egnyte.prototype.getChildren = function (folderPath, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getChildren");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getChildren", this.interpreterStorage, null, folderPath).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getChildren");
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
    Egnyte.prototype.getChildrenPage = function (path, offset, limit, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getChildrenPage");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getChildrenPage", this.interpreterStorage, null, path, offset, limit).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getChildrenPage");
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
    Egnyte.prototype.getUserLogin = function (callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getUserLogin");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getUserLogin", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getUserLogin");
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
    Egnyte.prototype.getUserName = function (callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getUserName");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getUserName", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getUserName");
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
    Egnyte.prototype.createShareLink = function (path, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "createShareLink");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:createShareLink", this.interpreterStorage, null, path).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "createShareLink");
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
    Egnyte.prototype.getAllocation = function (callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getAllocation");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getAllocation", this.interpreterStorage, null).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getAllocation");
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
    Egnyte.prototype.exists = function (path, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "exists");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:exists", this.interpreterStorage, null, path).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "exists");
        }).then(function () {
            var res;
            res = !!ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.getThumbnail = function (path, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "getThumbnail");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getThumbnail", this.interpreterStorage, null, path).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "getThumbnail");
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
    Egnyte.prototype.search = function (query, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "search");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:searchFiles", this.interpreterStorage, null, query).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "search");
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
    Egnyte.prototype.login = function (callback) {
        Statistics_1.Statistics.addCall("Egnyte", "login");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:login", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "login");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.logout = function (callback) {
        Statistics_1.Statistics.addCall("Egnyte", "logout");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:logout", this.interpreterStorage).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "logout");
        }).then(function () {
            var res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, function (err) {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    };
    Egnyte.prototype.advancedRequest = function (specification, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "advancedRequest");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("AdvancedRequestSupporter:advancedRequest", this.interpreterStorage, null, specification).then(function () {
            Helper_1.Helper.checkSandboxError(ip, "Egnyte", "advancedRequest");
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
    Egnyte.prototype.saveAsString = function () {
        Statistics_1.Statistics.addCall("Egnyte", "saveAsString");
        var ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    };
    Egnyte.prototype.loadAsString = function (savedState) {
        Statistics_1.Statistics.addCall("Egnyte", "loadAsString");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    };
    Egnyte.prototype.resumeLogin = function (executionState, callback) {
        Statistics_1.Statistics.addCall("Egnyte", "resumeLogin");
        var sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        var ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(function () { return callback(undefined); }, function (err) { return callback(err); });
    };
    return Egnyte;
}());
exports.Egnyte = Egnyte;
