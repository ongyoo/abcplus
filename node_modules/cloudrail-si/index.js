"use strict";
var Box_1 = require("./services/Box");
var Foursquare_1 = require("./services/Foursquare");
var Dropbox_1 = require("./services/Dropbox");
var Facebook_1 = require("./services/Facebook");
var GitHub_1 = require("./services/GitHub");
var GoogleDrive_1 = require("./services/GoogleDrive");
var GooglePlaces_1 = require("./services/GooglePlaces");
var GooglePlus_1 = require("./services/GooglePlus");
var Instagram_1 = require("./services/Instagram");
var LinkedIn_1 = require("./services/LinkedIn");
var MailJet_1 = require("./services/MailJet");
var MicrosoftLive_1 = require("./services/MicrosoftLive");
var Microsoft_1 = require("./services/Microsoft");
var Nexmo_1 = require("./services/Nexmo");
var OneDrive_1 = require("./services/OneDrive");
var PayPal_1 = require("./services/PayPal");
var SendGrid_1 = require("./services/SendGrid");
var Slack_1 = require("./services/Slack");
var Stripe_1 = require("./services/Stripe");
var Twilio_1 = require("./services/Twilio");
var Twitter_1 = require("./services/Twitter");
var Twizo_1 = require("./services/Twizo");
var Yahoo_1 = require("./services/Yahoo");
var Yelp_1 = require("./services/Yelp");
var Address_1 = require("./types/Address");
var Charge_1 = require("./types/Charge");
var CloudMetaData_1 = require("./types/CloudMetaData");
var CreditCard_1 = require("./types/CreditCard");
var DateOfBirth_1 = require("./types/DateOfBirth");
var Location_1 = require("./types/Location");
var POI_1 = require("./types/POI");
var Refund_1 = require("./types/Refund");
var Subscription_1 = require("./types/Subscription");
var SubscriptionPlan_1 = require("./types/SubscriptionPlan");
var SpaceAllocation_1 = require("./types/SpaceAllocation");
var Message_1 = require("./types/Message");
var MessagingAttachment_1 = require("./types/MessagingAttachment");
var MessageItem_1 = require("./types/MessageItem");
var MessageButton_1 = require("./types/MessageButton");
var Attachment_1 = require("./types/Attachment");
var Settings_1 = require("./Settings");
var RedirectReceivers_1 = require("./RedirectReceivers");
var ImageMetaData_1 = require("./types/ImageMetaData");
var Egnyte_1 = require("./services/Egnyte");
var BusinessFileMetaData_1 = require("./types/BusinessFileMetaData");
var Bucket_1 = require("./types/Bucket");
var Backblaze_1 = require("./services/Backblaze");
var Rackspace_1 = require("./services/Rackspace");
var MicrosoftAzure_1 = require("./services/MicrosoftAzure");
var AmazonS3_1 = require("./services/AmazonS3");
var Heroku_1 = require("./services/Heroku");
var OneDriveBusiness_1 = require("./services/OneDriveBusiness");
var GoogleCloudPlatform_1 = require("./services/GoogleCloudPlatform");
var AdvancedRequestSpecification_1 = require("./types/AdvancedRequestSpecification");
var AdvancedRequestResponse_1 = require("./types/AdvancedRequestResponse");
var FacebookPage_1 = require("./services/FacebookPage");
var ProductHunt_1 = require("./services/ProductHunt");
var GMail_1 = require("./services/GMail");
var FacebookMessenger_1 = require("./services/FacebookMessenger");
var Line_1 = require("./services/Line");
var Telegram_1 = require("./services/Telegram");
var Viber_1 = require("./services/Viber");
var SlackBot_1 = require("./services/SlackBot");
module.exports = {
    "services": {
        "AmazonS3": AmazonS3_1.AmazonS3,
        "Box": Box_1.Box,
        "Backblaze": Backblaze_1.Backblaze,
        "Dropbox": Dropbox_1.Dropbox,
        "Egnyte": Egnyte_1.Egnyte,
        "Facebook": Facebook_1.Facebook,
        "FacebookPage": FacebookPage_1.FacebookPage,
        "Foursquare": Foursquare_1.Foursquare,
        "GitHub": GitHub_1.GitHub,
        "GoogleCloudPlatform": GoogleCloudPlatform_1.GoogleCloudPlatform,
        "GoogleDrive": GoogleDrive_1.GoogleDrive,
        "GooglePlaces": GooglePlaces_1.GooglePlaces,
        "GooglePlus": GooglePlus_1.GooglePlus,
        "Heroku": Heroku_1.Heroku,
        "Instagram": Instagram_1.Instagram,
        "LinkedIn": LinkedIn_1.LinkedIn,
        "MailJet": MailJet_1.MailJet,
        "MicrosoftAzure": MicrosoftAzure_1.MicrosoftAzure,
        "MicrosoftLive": MicrosoftLive_1.MicrosoftLive,
        "Microsoft": Microsoft_1.Microsoft,
        "Nexmo": Nexmo_1.Nexmo,
        "OneDrive": OneDrive_1.OneDrive,
        "OneDriveBusiness": OneDriveBusiness_1.OneDriveBusiness,
        "PayPal": PayPal_1.PayPal,
        "ProductHunt": ProductHunt_1.ProductHunt,
        "Rackspace": Rackspace_1.Rackspace,
        "SendGrid": SendGrid_1.SendGrid,
        "Slack": Slack_1.Slack,
        "SlackBot": SlackBot_1.SlackBot,
        "Stripe": Stripe_1.Stripe,
        "Twilio": Twilio_1.Twilio,
        "Twitter": Twitter_1.Twitter,
        "Twizo": Twizo_1.Twizo,
        "Yahoo": Yahoo_1.Yahoo,
        "Yelp": Yelp_1.Yelp,
        "GMail": GMail_1.GMail,
        "FacebookMessenger": FacebookMessenger_1.FacebookMessenger,
        "Viber": Viber_1.Viber,
        "Line": Line_1.Line,
        "Telegram": Telegram_1.Telegram
    },
    "types": {
        "Address": Address_1.Address,
        "Charge": Charge_1.Charge,
        "CloudMetaData": CloudMetaData_1.CloudMetaData,
        "CreditCard": CreditCard_1.CreditCard,
        "DateOfBirth": DateOfBirth_1.DateOfBirth,
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
        "Message": Message_1.Message,
        "MessagingAttachment": MessagingAttachment_1.MessagingAttachment,
        "MessageItem": MessageItem_1.MessageItem,
        "MessageButton": MessageButton_1.MessageButton
    },
    "Settings": Settings_1.Settings,
    "RedirectReceivers": RedirectReceivers_1.RedirectReceivers
};
