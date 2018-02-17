"use strict";
var DateOfBirth_1 = require("./DateOfBirth");
var CloudMetaData_1 = require("./CloudMetaData");
var Error_1 = require("./Error");
var Date_1 = require("./Date");
var Address_1 = require("./Address");
var Charge_1 = require("./Charge");
var CreditCard_1 = require("./CreditCard");
var Location_1 = require("./Location");
var POI_1 = require("./POI");
var Refund_1 = require("./Refund");
var Subscription_1 = require("./Subscription");
var SubscriptionPlan_1 = require("./SubscriptionPlan");
var SpaceAllocation_1 = require("./SpaceAllocation");
var ImageMetaData_1 = require("./ImageMetaData");
var Bucket_1 = require("./Bucket");
var BusinessFileMetaData_1 = require("./BusinessFileMetaData");
var AdvancedRequestSpecification_1 = require("./AdvancedRequestSpecification");
var AdvancedRequestResponse_1 = require("./AdvancedRequestResponse");
var Attachment_1 = require("./Attachment");
var ChannelMetaData_1 = require("./ChannelMetaData");
var VideoMetaData_1 = require("./VideoMetaData");
var Message_1 = require("./Message");
var MessagingAttachment_1 = require("./MessagingAttachment");
var Types = (function () {
    function Types() {
    }
    Types.typeMap = {
        "DateOfBirth": DateOfBirth_1.DateOfBirth,
        "CloudMetaData": CloudMetaData_1.CloudMetaData,
        "Error": Error_1.Error,
        "Date": Date_1.CustomDate,
        "CustomDate": Date_1.CustomDate,
        "Address": Address_1.Address,
        "Charge": Charge_1.Charge,
        "CreditCard": CreditCard_1.CreditCard,
        "Location": Location_1.Location,
        "POI": POI_1.POI,
        "Refund": Refund_1.Refund,
        "Subscription": Subscription_1.Subscription,
        "SubscriptionPlan": SubscriptionPlan_1.SubscriptionPlan,
        "SpaceAllocation": SpaceAllocation_1.SpaceAllocation,
        "ImageMetaData": ImageMetaData_1.ImageMetaData,
        "Bucket": Bucket_1.Bucket,
        "BusinessFileMetaData": BusinessFileMetaData_1.BusinessFileMetaData,
        "AdvancedRequestSpecification": AdvancedRequestSpecification_1.AdvancedRequestSpecification,
        "AdvancedRequestResponse": AdvancedRequestResponse_1.AdvancedRequestResponse,
        "Attachment": Attachment_1.Attachment,
        "ChannelMetaData": ChannelMetaData_1.ChannelMetaData,
        "VideoMetaData": VideoMetaData_1.VideoMetaData,
        "Message": Message_1.Message,
        "MessagingAttachment": MessagingAttachment_1.MessagingAttachment
    };
    return Types;
}());
exports.Types = Types;
