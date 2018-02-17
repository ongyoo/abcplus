declare module 'cloudrail-si/interfaces/platformSpecific/Persistable' {
	/**
	 * An interface for services that keep persistent data
	 */
	export interface Persistable {
	    /**
	     * A method to retrieve the data from a service that is intended for persistent storage
	     * @return The data of the service that should be stored persistently, e.g. access credentials
	     */
	    saveAsString: () => string;
	    /**
	     * Loads/restores data saved by {@link #saveAsString() saveAsString} into the service
	     * @param savedState The persistent data that was stored
	     */
	    loadAsString: (savedState: string) => void;
	}

}
declare module 'cloudrail-si/errors/InternalError' {
	export class InternalError extends Error {
	    message: string;
	    constructor(message: string);
	}

}
declare module 'cloudrail-si/servicecode/Command' {
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	export interface Command {
	    getIdentifier: () => string;
	    execute: (environment: Sandbox, ...parameters: any[]) => Promise<void> | void;
	}

}
declare module 'cloudrail-si/servicecode/VarAddress' {
	export class VarAddress {
	    addressString: string;
	    constructor(addressString: string);
	}

}
declare module 'cloudrail-si/servicecode/commands/CallFunc' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class CallFunc implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/types/SandboxObject' {
	export class SandboxObject {
	    get(key: string): any;
	    set(key: string, value: any): void;
	}

}
declare module 'cloudrail-si/types/DateOfBirth' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class DateOfBirth extends SandboxObject {
	    day: number;
	    month: number;
	    year: number;
	    constructor(day?: number, month?: number, year?: number);
	}

}
declare module 'cloudrail-si/types/ImageMetaData' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	/**
	 * This class contains metadata about an image such as height and width. It is used as an optional
	 * property in {@link CloudMetaData}. It is immutable since it is received from the cloud service and
	 * should thus not be modified.
	 */
	export class ImageMetaData extends SandboxObject {
	    private _height;
	    private _width;
	    constructor(_height: number, _width: number);
	    height: number;
	    width: number;
	}

}
declare module 'cloudrail-si/types/CloudMetaData' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { ImageMetaData } from 'cloudrail-si/types/ImageMetaData';
	export class CloudMetaData extends SandboxObject {
	    path: string;
	    name: string;
	    size: number;
	    private _folder;
	    modifiedAt: number;
	    imageMetaData: ImageMetaData;
	    folder: boolean;
	    toString(): string;
	}

}
declare module 'cloudrail-si/types/ErrorType' {
	export enum ErrorType {
	    ILLEGAL_ARGUMENT = 0,
	    AUTHENTICATION = 1,
	    NOT_FOUND = 2,
	    HTTP = 3,
	    SERVICE_UNAVAILABLE = 4,
	    NONE = 5,
	}
	export namespace ErrorType {
	    function getValueOf(value: string): ErrorType;
	}

}
declare module 'cloudrail-si/types/Error' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { ErrorType } from 'cloudrail-si/types/ErrorType';
	export class Error extends SandboxObject {
	    private message;
	    private type;
	    constructor(message?: string, type?: string);
	    getMessage(): string;
	    setMessage(message: string): void;
	    getType(): string;
	    setType(type: string): void;
	    toString(): string;
	    getErrorType(): ErrorType;
	}

}
declare module 'cloudrail-si/types/Date' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { Comparable, JSONAware } from 'cloudrail-si/types/Types';
	export class CustomDate extends SandboxObject implements Comparable, JSONAware {
	    private date;
	    private _time;
	    constructor(date?: string);
	    getDate(): Date;
	    time: number;
	    rfcTime: string;
	    rfcTime1123: string;
	    rfcTime2822: string;
	    toJSONString(): string;
	    fromJSONString(jsonString: string): CustomDate;
	    compareTo(obj: any): number;
	}

}
declare module 'cloudrail-si/types/Address' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class Address extends SandboxObject {
	    country: string;
	    city: string;
	    state: string;
	    line1: string;
	    line2: string;
	    postalCode: string;
	}

}
declare module 'cloudrail-si/errors/DetailErrors' {
	export class AuthenticationError extends Error {
	    message: string;
	    constructor(message: string);
	}
	export class HttpError extends Error {
	    message: string;
	    constructor(message: string);
	}
	export class NotFoundError extends Error {
	    message: string;
	    constructor(message: string);
	}
	export class ServiceUnavailableError extends Error {
	    message: string;
	    constructor(message: string);
	}
	export class IllegalArgumentError extends Error {
	    message: string;
	    constructor(message: string);
	}

}
declare module 'cloudrail-si/types/CreditCard' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { Address } from 'cloudrail-si/types/Address';
	import { Comparable } from 'cloudrail-si/types/Types';
	export class CreditCard extends SandboxObject implements Comparable {
	    private cvc;
	    private _expire_month;
	    private _expire_year;
	    private _number;
	    private _type;
	    private firstName;
	    private lastName;
	    private address;
	    constructor(cvc: string, expire_month: number, expire_year: number, number: string, type: string, firstName: string, lastName: string, address: Address);
	    expire_month: number;
	    expire_year: number;
	    number: string;
	    type: string;
	    compareTo(obj: any): number;
	}

}
declare module 'cloudrail-si/types/Charge' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { CreditCard } from 'cloudrail-si/types/CreditCard';
	export class Charge extends SandboxObject {
	    private _amount;
	    private _created;
	    private _currency;
	    private _id;
	    private _refunded;
	    private _source;
	    private _status;
	    constructor(_amount: number, _created: number, _currency: string, _id: string, _refunded: boolean, _source: CreditCard, _status: string);
	    id: string;
	    amount: number;
	    currency: string;
	    source: CreditCard;
	    created: number;
	    status: string;
	    refunded: boolean;
	}

}
declare module 'cloudrail-si/types/Location' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class Location extends SandboxObject {
	    longitude: number;
	    latitude: number;
	}

}
declare module 'cloudrail-si/types/POI' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { Location } from 'cloudrail-si/types/Location';
	export class POI extends SandboxObject {
	    categories: string[];
	    imageURL: string;
	    location: Location;
	    name: string;
	    phone: string;
	    constructor(categories: string[], imageURL: string, location: Location, name: string, phone: string);
	}

}
declare module 'cloudrail-si/types/Refund' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class Refund extends SandboxObject {
	    private _amount;
	    private _chargeID;
	    private _created;
	    private _id;
	    private _state;
	    private _currency;
	    constructor(_amount: number, _chargeID: string, _created: number, _id: string, _state: string, _currency: string);
	    id: string;
	    amount: number;
	    created: number;
	    currency: string;
	    chargeID: string;
	    state: string;
	}

}
declare module 'cloudrail-si/types/Subscription' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { CreditCard } from 'cloudrail-si/types/CreditCard';
	export class Subscription extends SandboxObject {
	    private _created;
	    private _description;
	    private _id;
	    private _lastCharge;
	    private _name;
	    private _nextCharge;
	    private _creditCard;
	    private _state;
	    private _subscriptionPlanID;
	    constructor(_created: number, _description: string, _id: string, _lastCharge: number, _name: string, _nextCharge: number, _creditCard: CreditCard, _state: string, _subscriptionPlanID: string);
	    created: number;
	    description: string;
	    id: string;
	    lastCharge: number;
	    name: string;
	    nextCharge: number;
	    creditCard: CreditCard;
	    state: string;
	    subscriptionPlanID: string;
	}

}
declare module 'cloudrail-si/types/SubscriptionPlan' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class SubscriptionPlan extends SandboxObject {
	    private _amount;
	    private _created;
	    private _currency;
	    private _description;
	    private _id;
	    private _interval;
	    private _interval_count;
	    private _name;
	    constructor(_amount: number, _created: number, _currency: string, _description: string, _id: string, _interval: string, _interval_count: number, _name: string);
	    amount: number;
	    created: number;
	    currency: string;
	    description: string;
	    id: string;
	    interval: string;
	    interval_count: number;
	    name: string;
	}

}
declare module 'cloudrail-si/types/SpaceAllocation' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class SpaceAllocation extends SandboxObject {
	    used: number;
	    total: number;
	}

}
declare module 'cloudrail-si/types/Bucket' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class Bucket extends SandboxObject {
	    name: string;
	    identifier: string;
	    constructor(name: string, identifier: string);
	}

}
declare module 'cloudrail-si/types/BusinessFileMetaData' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class BusinessFileMetaData extends SandboxObject {
	    fileName: string;
	    fileID: string;
	    size: number;
	    lastModified: number;
	    constructor(fileName: string, fileID: string, size: number, lastModified: number);
	}

}
declare module 'cloudrail-si/servicecode/commands/xml/Stringify' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import { XMLElement } from 'cloudrail-si/helpers/Helper';
	import * as Promise from "bluebird";
	export class Stringify implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void> | void;
	    static stringify(input: XMLElement): string;
	}

}
declare module 'cloudrail-si/types/AdvancedRequestSpecification' {
	import { ObjectMap, HttpMethod, XMLElement } from 'cloudrail-si/helpers/Helper';
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import stream = require("stream");
	export class AdvancedRequestSpecification extends SandboxObject {
	    private url;
	    private method;
	    private body;
	    private headers;
	    private appendAuthorization;
	    private checkErrors;
	    private appendBaseUrl;
	    /**
	     * Constructs a new advanced request specification
	     *
	     * @param url The request's URL
	     */
	    constructor(url: string);
	    /**
	     * Specify the request's method, default is GET
	     *
	     * @param method The HTTP method
	     */
	    setMethod(method: HttpMethod): void;
	    /**
	     * Specify the body to sent with this request providing a readable stream
	     *
	     * @param body The request's body
	     */
	    setBodyAsStream(body: stream.Readable): void;
	    /**
	     * Specify the body to sent with this request providing a string
	     *
	     * @param body The request's body
	     */
	    setBodyAsString(body: string): void;
	    /**
	     * Specify the body to sent with this request providing an object that will be converted to JSON.
	     *
	     * @param body The request's body
	     */
	    setBodyStringifyJson(body: any): void;
	    /**
	     * Specify the body to sent with this request providing an object that will be converted to XML.
	     * The object has to have the following structure:
	     *
	     * type XMLElement = {
	     *      attributes: Object<string, string>,
	     *      text: string,
	     *      name: string,
	     *      children: XMLElement[]
	     * };
	     *
	     * @param body The request's body
	     */
	    setBodyStringifyXml(body: XMLElement): void;
	    /**
	     * Specify the request's (additional) headers
	     *
	     * @param headers An object specifying headers
	     */
	    setHeaders(headers: ObjectMap<string>): void;
	    /**
	     * Disable appending authorization information to the request
	     */
	    disableAuthorization(): void;
	    /**
	     * Disable checking the request's response for errors
	     */
	    disableErrorChecking(): void;
	    /**
	     * Disable appending the base URL
	     */
	    disableBaseUrl(): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/xml/Parse' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import { XMLElement } from 'cloudrail-si/helpers/Helper';
	import * as Promise from "bluebird";
	export class Parse implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void> | void;
	    static parse(input: string): XMLElement;
	}

}
declare module 'cloudrail-si/types/AdvancedRequestResponse' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import stream = require("stream");
	import { ObjectMap, NodeCallback, XMLElement } from 'cloudrail-si/helpers/Helper';
	export class AdvancedRequestResponse extends SandboxObject {
	    private body;
	    private headers;
	    private status;
	    private _stringBody;
	    /**
	     * Returns the response's body as a readable stream
	     *
	     * @return {stream.Readable} The response's body
	     */
	    getBodyAsStream(): stream.Readable;
	    /**
	     * Returns the response's body as a string
	     *
	     * @return {string} The response's body
	     */
	    getBodyAsString(callback: NodeCallback<string>): void;
	    /**
	     * Returns the response's body as an object resulting from JSON parsing it.
	     *
	     * @return The response's body
	     */
	    getBodyJsonParsed(callback: NodeCallback<any>): void;
	    /**
	     * Returns the response's body as an object resulting from XML parsing it.
	     * The object has the following structure:
	     *
	     * type XMLElement = {
	     *      attributes: Object<string, string>,
	     *      text: string,
	     *      name: string,
	     *      children: XMLElement[]
	     * };
	     *
	     * @return The response's body
	     */
	    getBodyXmlParsed(callback: NodeCallback<XMLElement>): void;
	    /**
	     * Returns the response headers as an object
	     *
	     * @return {ObjectMap<string>} The response's headers
	     */
	    getHeaders(): ObjectMap<string>;
	    /**
	     * Returns the response status code as a number
	     *
	     * @return {number} The response's status code
	     */
	    getStatus(): number;
	}

}
declare module 'cloudrail-si/types/Attachment' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import stream = require("stream");
	export class Attachment extends SandboxObject {
	    content: stream.Readable;
	    type: string;
	    filename: string;
	}

}
declare module 'cloudrail-si/types/ChannelMetaData' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class ChannelMetaData extends SandboxObject {
	    private _id;
	    private _name;
	    private _followers;
	    private _url;
	    private _logoUrl;
	    private _bannerUrl;
	    constructor(_id: string, _name: string, _followers: number, _url: string, _logoUrl: string, _bannerUrl: string);
	    id: string;
	    name: string;
	    followers: number;
	    url: string;
	    logoUrl: string;
	    bannerUrl: string;
	}

}
declare module 'cloudrail-si/types/VideoMetaData' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class VideoMetaData extends SandboxObject {
	    private _id;
	    private _title;
	    private _description;
	    private _publishedAt;
	    private _channelId;
	    private _duration;
	    private _thumbnailUrl;
	    private _embedHtml;
	    private _viewCount;
	    private _likeCount;
	    private _dislikeCount;
	    constructor(_id: string, _title: string, _description: string, _publishedAt: number, _channelId: string, _duration: number, _thumbnailUrl: string, _embedHtml: string, _viewCount: number, _likeCount: number, _dislikeCount: number);
	    id: string;
	    title: string;
	    description: string;
	    publishedAt: number;
	    channelId: string;
	    duration: number;
	    thumbnailUrl: string;
	    embedHtml: string;
	    viewCount: number;
	    likeCount: number;
	    dislikeCount: number;
	}

}
declare module 'cloudrail-si/types/MessagingAttachment' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import stream = require("stream");
	export class MessagingAttachment extends SandboxObject {
	    _id: string;
	    _contentType: string;
	    _mimeType: string;
	    _caption: string;
	    _stream: stream.Readable;
	    constructor(_id: string, _contentType: string, _mimeType: string, _caption: string, _stream: stream.Readable);
	    id: string;
	    contentType: string;
	    mimeType: string;
	    caption: string;
	    stream: stream.Readable;
	    toString(): string;
	}

}
declare module 'cloudrail-si/types/Message' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { Location } from 'cloudrail-si/types/Location';
	export class Message extends SandboxObject {
	    private _messageId;
	    private _senderId;
	    private _chatId;
	    private _replyTo;
	    private _editOf;
	    private _sendAt;
	    private _messageText;
	    private _location;
	    private _attachments;
	    constructor(_messageId: string, _senderId: string, _chatId: string, _replyTo: string, _editOf: string, _sendAt: number, _messageText: string, _location: Location, _attachments: MessagingAttachment[]);
	    messageId: string;
	    senderId: string;
	    chatId: string;
	    replyTo: string;
	    editOf: string;
	    sendAt: number;
	    messageText: string;
	    location: Location;
	    attachments: MessagingAttachment[];
	    toString(): string;
	}

}
declare module 'cloudrail-si/types/Types' {
	import { ObjectMap } from 'cloudrail-si/helpers/Helper';
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export interface JSONAware {
	    toJSONString: () => string;
	    fromJSONString: (jsonString: string) => JSONAware;
	}
	export interface Comparable {
	    compareTo: (object: any) => number;
	}
	export class Types {
	    static typeMap: ObjectMap<new (...arg: any[]) => SandboxObject>;
	}

}
declare module 'cloudrail-si/servicecode/commands/Create' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Create implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Clone' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Clone implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Delete' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Delete implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Get' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Get implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/array/Uint8ToBase64' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Uint8ToBase64 implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Base64Encode' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import { Buffer } from "buffer";
	export class Base64Encode implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	    static encode(s: string | Buffer, lineBreak: boolean, webSafe: boolean): string;
	}

}
declare module 'cloudrail-si/servicecode/commands/stream/StreamToString' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	export class StreamToString implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void>;
	}

}
declare module 'cloudrail-si/servicecode/commands/stream/StringToStream' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class StringToStream implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/helpers/SequenceReadableStream' {
	import stream = require("stream");
	export class SequenceReadableStream extends stream.Readable {
	    private stream1;
	    private stream2;
	    private first;
	    private shouldPush;
	    private info1;
	    private info2;
	    constructor(stream1: stream.Readable, stream2: stream.Readable);
	    _read(): void;
	    private process();
	}

}
declare module 'cloudrail-si/servicecode/commands/stream/MakeJoinedStream' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class MakeJoinedStream implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/helpers/LimitedReadableStream' {
	import stream = require("stream");
	export class LimitedReadableStream extends stream.Readable {
	    private source;
	    private limit;
	    private shouldPush;
	    private sourceReadable;
	    constructor(source: stream.Readable, limit: number);
	    _read(): void;
	    private process();
	}

}
declare module 'cloudrail-si/servicecode/commands/stream/MakeLimitedStream' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class MakeLimitedStream implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/http/RequestCall' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	export class RequestCall implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void>;
	}

}
declare module 'cloudrail-si/servicecode/commands/debug/Out' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Out implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/errors/UserError' {
	export class UserError extends Error {
	    message: string;
	    constructor(message: string);
	}

}
declare module 'cloudrail-si/Settings' {
	export class Settings {
	    static licenseKey: string;
	    static block: boolean;
	    static setKey(key: string): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/AwaitCodeRedirect' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	export type RedirectReceiver = (url: string, currentState: string, callback: (error: Error, redirectedUrl?: string) => void) => void;
	export class AwaitCodeRedirect implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void>;
	}

}
declare module 'cloudrail-si/servicecode/commands/GetMimeType' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class GetMimeType implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/ThrowError' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class ThrowError implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/json/Parse' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	export class Parse implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void> | void;
	}

}
declare module 'cloudrail-si/servicecode/commands/json/Stringify' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Stringify implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/math/Floor' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Floor implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Conditional' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Conditional implements Command {
	    private identifier;
	    private compareFunction;
	    private typeCheck;
	    constructor(identifier: string, compareFunction: (compare: number) => boolean, typeCheck: boolean);
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/math/MathCombine' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class MathCombine implements Command {
	    private identifier;
	    private combineFunction;
	    constructor(identifier: string, combineFunction: (elements: number[]) => number);
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/object/GetKeyArray' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class GetKeyArray implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/object/GetKeyValueArrays' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class GetKeyValueArrays implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Concat' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Concat implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/IndexOf' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class IndexOf implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/LastIndexOf' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class LastIndexOf implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Split' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Split implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Substr' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Substr implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Substring' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Substring implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/StringTransform' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class StringTransform implements Command {
	    private identifier;
	    private transform;
	    constructor(identifier: string, transform: (source: string) => string);
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/ChunkSplit' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class ChunkSplit implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/JumpRel' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class JumpRel implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Pull' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Pull implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Push' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Push implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Return' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Return implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Set' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Set implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Size' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Size implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Format' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Format implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/TypeOf' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class TypeOf implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/stream/StreamToData' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class StreamToData implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): Promise<void>;
	}

}
declare module 'cloudrail-si/servicecode/commands/stream/DataToStream' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class DataToStream implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/string/Base64Decode' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Base64Decode implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/Hash' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Hash implements Command {
	    private identifier;
	    private hashMethod;
	    constructor(identifier: string, hashMethod: string);
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/crypt/Hmac' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Hmac implements Command {
	    private identifier;
	    private hashMethod;
	    constructor(identifier: string, hashMethod: string);
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/array/Uint8ToData' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Uint8ToData implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/array/DataToUint8' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class DataToUint8 implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/crypt/Sign' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Sign implements Command {
	    private identifier;
	    private signMethod;
	    constructor(identifier: string, signMethod: string);
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/commands/array/Sort' {
	import { Command } from 'cloudrail-si/servicecode/Command';
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	export class Sort implements Command {
	    getIdentifier(): string;
	    execute(environment: Sandbox, parameters: any[]): void;
	}

}
declare module 'cloudrail-si/servicecode/Interpreter' {
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	export class Interpreter {
	    sandbox: Sandbox;
	    constructor(sandbox: Sandbox);
	    callFunction(functionName: string, ...parameters: any[]): Promise<void>;
	    callFunctionSync(functionName: string, ...parameters: any[]): void;
	    private run();
	    private runSync();
	    static decodeCommandParameters(command: any[]): any[];
	    getParameter(idx: number): any;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeFunction(functionName: string, ...parameters: any[]): Promise<void>;
	}

}
declare module 'cloudrail-si/servicecode/Sandbox' {
	import { VarAddress } from 'cloudrail-si/servicecode/VarAddress';
	import { ObjectMap } from 'cloudrail-si/helpers/Helper';
	export class Sandbox {
	    serviceCode: ObjectMap<any[][]>;
	    localVariablesStack: any[][];
	    parametersStack: any[][];
	    persistentStorage: any[];
	    codeFunctionNameStack: string[];
	    codeLineStack: number[];
	    thrownError: any;
	    instanceDependencyStorage: ObjectMap<any>;
	    constructor(serviceCode: ObjectMap<any[][]>, persistentStorage: any[], instanceDependencyStorage: ObjectMap<any>);
	    createNewStackLevel(functionName: string, codeLine: number): void;
	    currentParameters(): any[];
	    currentFunctionName(): string;
	    currentFunctionCode(): any[][];
	    currentServiceCodeLine(): number;
	    incrementCurrentServiceCodeLine(amount: number): void;
	    returnFromFunction(): void;
	    setVariable(varAddress: VarAddress | any[], value: any, stacklevel?: number): boolean;
	    getVariable(varAddress: VarAddress | any[], stacklevel?: number, emptyIsNull?: boolean): any;
	    deleteVariable(varAddressParts: any[], stacklevel?: number): boolean;
	    private getStackForAddressPart(part, stacklevel);
	    static decodeVariableAddress(varAddress: VarAddress): any[];
	    private setEntry(baseContainer, varAddress, value);
	    private getEntry(container, varAddress, emptyIsNull);
	    private deleteEntry(container, varAddress);
	    callFunction(functionName: string, parameters: any[]): void;
	    compareVariables(aObj: any, bObj: any, commandID: string, typeCheck: boolean): number;
	    saveStateToString(): string;
	    loadStateFromString(savedState: string): void;
	    getParameter(idx: number, stacklevel: number): any;
	}

}
declare module 'cloudrail-si/servicecode/InitSelfTest' {
	import * as Promise from "bluebird";
	export class InitSelfTest {
	    private static testedServices;
	    static initTest(servicename: string): boolean;
	    static execute(servicename: string): boolean;
	    static getMac(): Promise<string>;
	    static getNameVersion(): {
	        name: string;
	        version: string;
	    };
	    static getOS(): string;
	}

}
declare module 'cloudrail-si/statistics/Statistics' {
	export class Statistics {
	    private static CR_VERSION;
	    private static PLATFORM;
	    private static SERVER_URL;
	    private static DELAY;
	    private static timer;
	    private static data;
	    private static next;
	    private static count;
	    private static entryID;
	    private static callSyncPromise;
	    private static sendStatSyncPromise;
	    static addCall(service: string, method: string): void;
	    static addError(service: string, method: string): void;
	    private static sendStatistics();
	    private static getMethodCalls(service, method);
	    private static hashString(str);
	    private static getCRVer();
	}

}
declare module 'cloudrail-si/helpers/Helper' {
	import { Sandbox } from 'cloudrail-si/servicecode/Sandbox';
	import * as Promise from "bluebird";
	import stream = require("stream");
	import { Buffer } from "buffer";
	import http = require("http");
	import { Interpreter } from 'cloudrail-si/servicecode/Interpreter';
	/**
	 * Valid Http methods
	 */
	export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "TRACE";
	export const httpMethods: string[];
	/**
	 * A typed object
	 */
	export type ObjectMap<T> = {
	    [key: string]: T;
	};
	/**
	 * Signature of a Node.js style callback
	 */
	export type NodeCallback<T> = (err: Error, data?: T) => void;
	/**
	 * Structure of XML elements in service code
	 */
	export type XMLElement = {
	    attributes: ObjectMap<string>;
	    text: string;
	    name: string;
	    children: XMLElement[];
	};
	/**
	 * A wrapper for objects that can be accessed in a case-insensitive way
	 */
	export class CaseProxy {
	    private obj;
	    constructor(obj: ObjectMap<string>);
	    get(key: string): string;
	}
	/**
	 * Diverse helper functions used in many places in the code
	 */
	export class Helper {
	    static addAll<T>(target: T[], source: T[]): void;
	    static putAll<T>(target: ObjectMap<T>, source: ObjectMap<T>): void;
	    static clear(target: ObjectMap<any>): void;
	    static remove<T>(target: T[], element: T): void;
	    static isString(object: any): boolean;
	    static isArray: (arg: any) => arg is any[];
	    static isObject(object: any): boolean;
	    static isNumber(object: any): boolean;
	    static isBoolean(object: any): boolean;
	    static isNumberString(obj: any): boolean;
	    static isStream(obj: any): boolean;
	    static isData(obj: any): boolean;
	    static assert(expression: boolean): void;
	    static resolve(environment: Sandbox, value: any, checkExistence?: boolean): any;
	    static compare<T>(aObj: T, bObj: T): number;
	    static dumpStream(stream: stream.Readable, targetEncoding?: string, toBuffer?: boolean): Promise<string | Buffer>;
	    static streamify(val: any, sourceEncoding?: string): stream.Readable;
	    static safeAscii(str: string): string;
	    static makeRequest(urlString: string, headers: ObjectMap<string>, body: stream.Readable, method: HttpMethod, timeout?: number): Promise<http.IncomingMessage>;
	    static lowerCaseFirstLetter(str: string): string;
	    static upperCaseFirstLetter(str: string): string;
	    static checkSandboxError(ip: Interpreter, serviceName: string, methodName: string): void;
	    static makeBuffer(data: any, encoding?: string): Buffer;
	    static bufferToUint8Array(buf: Buffer): number[];
	}

}
declare module 'cloudrail-si/interfaces/basic/Authenticating' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	/**
	 * A common interface for services that allow logging in and out actions
	 */
	export interface Authenticating {
	    /**
	     * Optional! Explicitly triggers user authentication.
	     * Allows better control over the authentication process.
	     * Optional because all methods that require prior authentication will trigger it automatically,
	     * unless this method has been called before.
	     */
	    login: (callback?: NodeCallback<void>) => void;
	    /**
	     * Optional! Revokes the current authentication.
	     */
	    logout: (callback?: NodeCallback<void>) => void;
	    /**
	     * Loads/restores execution state from RedirectReceiver's second argument and continues the login. Main use case are server applications with multiple instances.
	     * @param executionState The saved execution state now to be restored
	     */
	    resumeLogin: (executionState: string, callback?: NodeCallback<void>) => void;
	}

}
declare module 'cloudrail-si/interfaces/CloudStorage' {
	import { Persistable } from 'cloudrail-si/interfaces/platformSpecific/Persistable';
	import { Authenticating } from 'cloudrail-si/interfaces/basic/Authenticating';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import stream = require("stream");
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	/**
	 * A common interface for cloud storage services, abstracts to the level of paths consistently for all services.
	 */
	export interface CloudStorage extends Persistable, Authenticating {
	    /**
	     * Downloads a file from a cloud storage, throws an exception if the file is not found or the path invalid
	     * @param filePath The path to the file from the root folder and including the name, e.g /myFolder/myFile.jpg
	     * @return A stream from which the file can be read
	     */
	    download: (filePath: string, callback: NodeCallback<stream.Readable>) => void;
	    /**
	     * Uploads a file to a cloud storage, throws an exception if the path is invalid, the parent path does not exist, the stream is null or the size negative
	     * @param filePath The path where to store the file from the root folder and including the name, e.g /myFolder/myFile.jpg
	     * @param stream A stream from which the file can be read
	     * @param size The size in bytes of the data that can be read from the stream
	     * @param overwrite If true, an existing file with the same path will be overwritten (its contents updated), if false the presence of a file with the same name will cause an exception
	     */
	    upload: (filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback?: NodeCallback<void>) => void;
	    /**
	     * Moves a file or a folder in the cloud storage, throws an exception if one of the paths is invalid, the source path or the parent destination path does not exist
	     * @param sourcePath The path to the file which should be moved from the root folder and including the name
	     * @param destinationPath The path to move the file to from the root folder and including the name
	     */
	    move: (sourcePath: string, destinationPath: string, callback?: NodeCallback<void>) => void;
	    /**
	     * Deletes a file or folder from the cloud storage, throws an exception if the path is invalid or does not exist
	     * @param filePath The path to the file to be deleted from the root folder and including the name
	     */
	    delete: (filePath: string, callback?: NodeCallback<void>) => void;
	    /**
	     * Copies a file from one path in the cloud storage to another, throws an exception if one of the paths is invalid, the source path or the parent destination path does not exist
	     * @param sourcePath The path of the origin file from the root folder and including the name
	     * @param destinationPath The path of the destination file from the root folder and including the name
	     */
	    copy: (sourcePath: string, destinationPath: string, callback?: NodeCallback<void>) => void;
	    /**
	     * Creates a folder at the given path, throws an exception if the path is invalid or the parent path does not exist
	     * @param folderPath The path to the folder from the root folder and including the name, e.g. /myNewFolder
	     */
	    createFolder: (folderPath: string, callback?: NodeCallback<void>) => void;
	    /**
	     * Gets metadata about the file/folder, throws an exception if the path is invalid or does not exist. Also throws if getting metadata from root ("/") is attempted!
	     * @param filePath The path to the file from the root folder and including the name
	     * @return A container for metadata
	     */
	    getMetadata: (filePath: string, callback: NodeCallback<CloudMetaData>) => void;
	    /**
	     * Gets the metadata of this folder's children, throws an exception if the path is invalid or does not exist
	     * @param folderPath The path to the file from the root folder and including the name
	     * @return A list of containers for metadata
	     */
	    getChildren: (folderPath: string, callback: NodeCallback<CloudMetaData[]>) => void;
	    /**
	     * Gets the metadata of this folder's children in chunks, throws an exception if the path is invalid or does not exist
	     * Returns an empty array if offset or limit get out of bounds of existing children
	     * @param folderPath The path to the file from the root folder and including the name
	     * @param offset The offset for the children
	     * @param limit The amount of children returned
	     * @return A list of containers for metadata
	     */
	    getChildrenPage: (folderPath: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>) => void;
	    /**
	     * @return The currently logged in user's login identifier (name/email/...)
	     */
	    getUserLogin: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The currently logged in user's (full) name
	     */
	    getUserName: (callback: NodeCallback<string>) => void;
	    /**
	     * Creates a share link, the permission is only to 'view' and download the file/folder
	     *
	     * @param path the path to the file/folder which the link to will be created
	     *
	     * @return The url as a String
	     */
	    createShareLink: (path: string, callback: NodeCallback<string>) => void;
	    /**
	     *
	     * @return The total space in bytes and the used space
	     */
	    getAllocation: (callback: NodeCallback<SpaceAllocation>) => void;
	    /**
	     * @return True if the file/folder exists, else false
	     */
	    exists: (path: string, callback: NodeCallback<boolean>) => void;
	    /**
	     * @param path The path to the image
	     *
	     * @return The thumbnail as a stream
	     */
	    getThumbnail: (path: string, callback: NodeCallback<stream.Readable>) => void;
	    /**
	     * Searches the users storage for files and folders matching the query.
	     *
	     * @param query The query to search with
	     * @return List of files and folders that were found
	     * @throws IllegalArgumentException Null or empty query
	     */
	    search: (query: string, callback: NodeCallback<CloudMetaData[]>) => void;
	}

}
declare module 'cloudrail-si/interfaces/AdvancedRequestSupporter' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	export interface AdvancedRequestSupporter {
	    advancedRequest: (specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>) => void;
	}

}
declare module 'cloudrail-si/types/MessageButton' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	export class MessageButton extends SandboxObject {
	    _text: string;
	    _type: string;
	    _url: string;
	    _payload: string;
	    constructor(_text: string, _type: string, _url: string, _payload: string);
	    text: string;
	    type: string;
	    payload: string;
	    url: string;
	    toString(): string;
	}

}
declare module 'cloudrail-si/types/MessageItem' {
	import { SandboxObject } from 'cloudrail-si/types/SandboxObject';
	import { MessageButton } from 'cloudrail-si/types/MessageButton';
	export class MessageItem extends SandboxObject {
	    _title: string;
	    _subTitle: string;
	    _mediaUrl: string;
	    _buttons: MessageButton[];
	    constructor(_title: string, _subTitle: string, _mediaUrl: string, _buttons: MessageButton[]);
	    title: string;
	    subTitle: string;
	    mediaUrl: string;
	    buttons: MessageButton[];
	    toString(): string;
	}

}
declare module 'cloudrail-si/services/Box' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Box implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/PointsOfInterest' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { POI } from 'cloudrail-si/types/POI';
	/**
	 * An interface that provides data about points of interest for a specified location. Results can be
	 * filtered by categories or an individual search term.
	 */
	export interface PointsOfInterest {
	    /**
	     * Returns a list of POIs that are close to the passed location and filters them by certain criteria.
	     *
	     * @param latitude   The latitude of the target location.
	     * @param longitude  The longitude of the target location.
	     * @param radius     The search radius in metres.
	     * @param searchTerm Optional search term that has to be matched.
	     * @param categories Optional list of categories. Available categories can be found in the main documentation.
	     * @return A list of POIs for the target location.
	     * @throws IllegalArgumentException Is thrown if latitude, longitude or radius is null, latitude or
	     *                                  longitude is invalid, radius is greater than 40,000 metres or
	     *                                  one of the passed categories is unknown.
	     * @throws AuthenticationException  Is thrown if the passed credentials are invalid or authorization
	     *                                  fails for whatever reason.
	     * @throws HttpException            Is thrown if the communication with a services fails.
	     *                                  More detail is provided in the error message.
	     */
	    getNearbyPOIs: (latitude: number, longtitude: number, radius: number, searchTerm: string, categories: string[], callback: NodeCallback<POI[]>) => void;
	}

}
declare module 'cloudrail-si/services/Foursquare' {
	import { PointsOfInterest } from 'cloudrail-si/interfaces/PointsOfInterest';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { POI } from 'cloudrail-si/types/POI';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Foursquare implements PointsOfInterest, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string);
	    getNearbyPOIs(latitude: number, longitude: number, radius: number, searchTerm: string, categories: string[], callback: NodeCallback<POI[]>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Dropbox' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Dropbox implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/Profile' {
	import { Authenticating } from 'cloudrail-si/interfaces/basic/Authenticating';
	import { Persistable } from 'cloudrail-si/interfaces/platformSpecific/Persistable';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	/**
	 * An interface that provides access to a diverse range of services that provide user data.
	 * They all have in common, that they allow you to get a unique identifier for a logged in user,
	 * so it can be used for "Login with ..." scenarios.
	 * All the other information might be present or not, depending on the service and how much
	 * information the user has filled out with the respective service.
	 * To avoid unnecessary requests, information is cached up to one minute.
	 */
	export interface Profile extends Authenticating, Persistable {
	    /**
	     * @return A unique identifier for the authenticated user. All services provide this value. Useful for "Login with ...". Prefixed with the lowercased service name and a minus.
	     */
	    getIdentifier: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The user's full name or null if not present
	     */
	    getFullName: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The user's email address or null if not present
	     */
	    getEmail: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The user's gender, normalized to be one of "female", "male", "other" or null if not present
	     */
	    getGender: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The description the user has given themselves or null if not present
	     */
	    getDescription: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The date of birth in a special format, see {@link DateOfBirth}
	     */
	    getDateOfBirth: (callback: NodeCallback<DateOfBirth>) => void;
	    /**
	     * @return The locale/language setting of the user, e.g. "en", "de" or null if not present
	     */
	    getLocale: (callback: NodeCallback<string>) => void;
	    /**
	     * @return The URL of the user's profile picture or null if not present
	     */
	    getPictureURL: (callback: NodeCallback<string>) => void;
	}

}
declare module 'cloudrail-si/interfaces/Social' {
	import { Authenticating } from 'cloudrail-si/interfaces/basic/Authenticating';
	import { Persistable } from 'cloudrail-si/interfaces/platformSpecific/Persistable';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	/**
	 * Interface for interaction with social networks
	 */
	export interface Social extends Authenticating, Persistable {
	    /**
	     * Creates a new post/update to the currently logged in user's wall/stream/etc.
	     * Throws an exception if the content is too long for the service instance.
	     * @param content The post's content
	     */
	    postUpdate: (content: string, callback?: NodeCallback<void>) => void;
	    /**
	     * Retrieves a list of connection/friend/etc. IDs.
	     * The IDs are compatible with those returned by Profile.getIdentifier().
	     * @return A (possibly empty) list of IDs
	     */
	    getConnections: (callback: NodeCallback<string[]>) => void;
	    /**
	     * Creates a new post/update to the currently logged in user's wall/stream/etc posting an
	     * image and a message.
	     * Error is set if the message is too long for the service instance.
	     *
	     * @param message The message that shall be posted together with the image.
	     * @param image Stream containing the image content.
	     */
	    postImage: (message: string, image: stream.Readable, callback: NodeCallback<void>) => void;
	    /**
	     * Creates a new post/update to the currently logged in user's wall/stream/etc posting a
	     * video and a message.
	     * Error is set if the message is too long for the service instance.
	     *
	     * @param message The message that shall be posted together with the video.
	     * @param video Stream containing the video content.
	     * @param size The size of the video in bytes.
	     * @param mimeType The mime type of the video, for instance video/mp4.
	     */
	    postVideo: (message: string, video: stream.Readable, size: number, mimeType: string, callback: NodeCallback<void>) => void;
	}

}
declare module 'cloudrail-si/services/Facebook' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { Social } from 'cloudrail-si/interfaces/Social';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Facebook implements Profile, Social, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    postUpdate(content: string, callback: NodeCallback<void>): void;
	    postImage(message: string, image: stream.Readable, callback: NodeCallback<void>): void;
	    postVideo(message: string, video: stream.Readable, size: number, mimeType: string, callback: NodeCallback<void>): void;
	    getConnections(callback: NodeCallback<string[]>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/GitHub' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class GitHub implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/GoogleDrive' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class GoogleDrive implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/GooglePlaces' {
	import { PointsOfInterest } from 'cloudrail-si/interfaces/PointsOfInterest';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { POI } from 'cloudrail-si/types/POI';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class GooglePlaces implements PointsOfInterest, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, apiKey: string);
	    getNearbyPOIs(latitude: number, longitude: number, radius: number, searchTerm: string, categories: string[], callback: NodeCallback<POI[]>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/GooglePlus' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class GooglePlus implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Instagram' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Instagram implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/LinkedIn' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class LinkedIn implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/Email' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { Attachment } from 'cloudrail-si/types/Attachment';
	/**
	 * An interface whose implementations allow sending emails
	 */
	export interface Email {
	    /**
	     * Sends an email. Used like sendEmail("info@cloudrail.com", "CloudRail", Arrays.asList("foo@bar.com", "bar@foo.com"), "Welcome", "Hello from CloudRail", null, null, null).
	     * Throws if an error occurs.
	     *
	     * @param fromAddress Mandatory. The sender email address. Must normally be registered with the corresponding service.
	     * @param fromName Mandatory. The from name to be displayed to the recipient(s).
	     * @param toAddresses Mandatory. A list of recipient email addresses.
	     * @param subject Mandatory. The email's subject line.
	     * @param textBody The email's body plain text part. Either this and/or the htmlBody must be specified.
	     * @param htmlBody The email's body HTML part. Either this and/or the textBody must be specified.
	     * @param ccAddresses Optional. A list of CC recipient email addresses.
	     * @param bccAddresses Optional. A list of BCC recipient email addresses.
	     * @param attachments Optional. A list of attachments.
	     */
	    sendEmail: (fromAddress: string, fromName: string, toAddresses: string[], subject: string, textBody: string, htmlBody: string, ccAddresses: string[], bccAddresses: string[], attachments: Attachment[], callback?: NodeCallback<void>) => void;
	}

}
declare module 'cloudrail-si/services/MailJet' {
	import { Email } from 'cloudrail-si/interfaces/Email';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Attachment } from 'cloudrail-si/types/Attachment';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class MailJet implements Email, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string);
	    sendEmail(fromAddress: string, fromName: string, toAddresses: string[], subject: string, textBody: string, htmlBody: string, ccAddresses: string[], bccAddresses: string[], attachments: Attachment[], callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/MicrosoftLive' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class MicrosoftLive implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Microsoft' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Microsoft implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/SMS' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	/**
	 * An interface whose implementations allow sending SMS
	 */
	export interface SMS {
	    /**
	     * Sends an SMS message, used like sendSMS("CloudRail", "+4912345678", "Hello from CloudRail").
	     * Throws if an error occurs.
	     *
	     * @param fromName A alphanumeric sender id to identify/brand the sender. Only works in some countries.
	     * @param toNumber The recipients phone number in E.164 format, e.g. +4912345678.
	     * @param content The message content. Limited to 1600 characters, messages > 160 characters are sent and charged as multiple messages.
	     */
	    sendSMS: (fromName: string, toNumber: string, content: string, callback?: NodeCallback<void>) => void;
	}

}
declare module 'cloudrail-si/services/Nexmo' {
	import { SMS } from 'cloudrail-si/interfaces/SMS';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Nexmo implements SMS, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string);
	    sendSMS(fromName: string, toNumber: string, content: string, callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/OneDrive' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class OneDrive implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/Payment' {
	import { CreditCard } from 'cloudrail-si/types/CreditCard';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { Charge } from 'cloudrail-si/types/Charge';
	import { Refund } from 'cloudrail-si/types/Refund';
	import { SubscriptionPlan } from 'cloudrail-si/types/SubscriptionPlan';
	import { Subscription } from 'cloudrail-si/types/Subscription';
	/**
	 * A simple interface for managing payment tasks.
	 */
	export interface Payment {
	    /**
	     * Charges a credit card and returns a charge resource.
	     *
	     * @param amount A positive integer in the smallest currency unit (e.g. cents)
	     *      representing how much to charge the credit card.
	     * @param currency A three-letter ISO code for currency.
	     * @param source The credit card to be charged.
	     * @return A charge resource representing the newly created payment.
	     * @throws IllegalArgumentException Is thrown if any of the parameters is null, amount is
	     *      less than 0 or currency is not a valid three-letter currency code.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    createCharge: (amount: number, currency: string, source: CreditCard, callback: NodeCallback<Charge>) => void;
	    /**
	     * Returns information about an existing charge. Mostly used to get an update
	     * on the status of the charge.
	     *
	     * @param id The ID of the charge.
	     * @return A charge resource for the provided ID.
	     * @throws IllegalArgumentException Is thrown if id is null.
	     * @throws NotFoundException Is thrown if there is now charge with that ID.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    getCharge: (id: string, callback: NodeCallback<Charge>) => void;
	    /**
	     * Receive a list of charges within a specified timeframe.
	     *
	     * @param from Timestamp representing the start date for the list.
	     * @param to Timestamp representing the end date for the list.
	     * @param creditCard Optionally the credit card information so it can be listed all the charges of this specific credit card.
	     * @return List of charge resources.
	     * @throws IllegalArgumentException Is thrown if from or to is null, from or to is less than 0, from
	     *      is greater than to or to is greater than the current date.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    listCharges: (from: number, to: number, creditCard: CreditCard, callback: NodeCallback<Charge[]>) => void;
	    /**
	     * Refund a previously made charge.
	     *
	     * @param id The ID of the charge to be refunded.
	     * @return A refund resource.
	     * @throws IllegalArgumentException Is thrown if id is null.
	     * @throws NotFoundException Is thrown if there is now charge with that ID.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    refundCharge: (id: string, callback: NodeCallback<Refund>) => void;
	    /**
	     * Refund a specified amount from a previously made charge.
	     *
	     * @param id The ID of the charge to be refunded.
	     * @param amount The amount that shall be refunded.
	     * @return A refund resource.
	     * @throws IllegalArgumentException Is thrown if any of the parameters is null or lower/equals than 0.
	     * @throws NotFoundException Is thrown if there is now charge with that ID.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    partiallyRefundCharge: (id: string, amount: number, callback: NodeCallback<Refund>) => void;
	    /**
	     * Returns information about an existing refund. Mostly used to get an update
	     * on the status of the refund.
	     *
	     * @param id The ID of the refund.
	     * @return A refund resource for the provided ID.
	     * @throws IllegalArgumentException Is thrown if id is null.
	     * @throws NotFoundException Is thrown if there is now refund with that ID.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    getRefund: (id: string, callback: NodeCallback<Refund>) => void;
	    /**
	     * Returns information about the refunds for a specific charge.
	     *
	     * @param id The ID of the charge.
	     * @return A refund resource for the provided charge.
	     * @throws IllegalArgumentException Is thrown if id is null.
	     * @throws NotFoundException Is thrown if there is now charge with that ID or the charge has not
	     *      been refunded.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    getRefundsForCharge: (id: string, callback: NodeCallback<Refund[]>) => void;
	    /**
	     * Creates a subscription plan which is required to use subscription based payments.
	     * The result of this method can be used together with 'createSubscription' in
	     * order to subscribe someone to your subscription plan.
	     *
	     * @param name The name for the subscription plan.
	     * @param amount The amount that is charged on a regular basis. A positive integer
	     *      in the smallest currency unit (e.g. cents).
	     * @param currency A three-letter ISO code for currency.
	     * @param description A description for this subscription plan.
	     * @param interval Specifies the billing frequency together with interval_count.
	     *      Allowed values are: day, week, month or year.
	     * @param interval_count Specifies the billing frequency together with interval.
	     *      For example: interval_count = 2 and interval = "week" -> Billed every
	     *      two weeks.
	     * @return Returns the newly created subscription plan resource.
	     * @throws IllegalArgumentException Is thrown if any of the parameters is null
	     *      or lower/equal than 0, currency is not a three-letter
	     *      currency code, interval is not one of the allowed values or amount is
	     *      less/equal than 0.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    createSubscriptionPlan: (name: string, amount: number, currency: string, description: string, interval: string, interval_count: number, callback: NodeCallback<SubscriptionPlan>) => void;
	    /**
	     * Returns a list of all existing subscription plans.
	     *
	     * @return List of subscription plans.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    listSubscriptionPlans: (callback: NodeCallback<SubscriptionPlan[]>) => void;
	    /**
	     * Subscribes a new customer to an existing subscription plan.
	     *
	     * @param planID The ID of the subscription plan.
	     * @param name A name for the subscription.
	     * @param description A description for the subscription.
	     * @param creditCard The customer that shall be subscribed.
	     * @return The newly created subscription resource.
	     * @throws IllegalArgumentException Is thrown if planID, name, description or
	     *      payer is null.
	     * @throws NotFoundException Is thrown if there is no subscription plan with
	     *      the passed ID.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    createSubscription: (planID: string, name: string, description: string, creditCard: CreditCard, callback: NodeCallback<Subscription>) => void;
	    /**
	     * Cancel an active subscription.
	     *
	     * @param id ID of the subscription that should be canceled.
	     * @throws IllegalArgumentException Is thrown if id is null.
	     * @throws NotFoundException Is thrown if there is no subscription with the
	     *      provided ID.
	     * @throws AuthenticationException Is thrown if the provided credentials are invalid.
	     * @throws HttpException Is thrown if the communication with a services fails.
	     *      More detail is provided in the error message.
	     */
	    cancelSubscription: (id: string, callback?: NodeCallback<void>) => void;
	}

}
declare module 'cloudrail-si/services/PayPal' {
	import { Payment } from 'cloudrail-si/interfaces/Payment';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { CreditCard } from 'cloudrail-si/types/CreditCard';
	import { Charge } from 'cloudrail-si/types/Charge';
	import { Refund } from 'cloudrail-si/types/Refund';
	import { Subscription } from 'cloudrail-si/types/Subscription';
	import { SubscriptionPlan } from 'cloudrail-si/types/SubscriptionPlan';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class PayPal implements Payment, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, useSandbox: boolean, clientId: string, clientSecret: string);
	    createCharge(amount: number, currency: string, source: CreditCard, callback: NodeCallback<Charge>): void;
	    getCharge(id: string, callback: NodeCallback<Charge>): void;
	    listCharges(from: number, to: number, creditCard: CreditCard, callback: NodeCallback<Charge[]>): void;
	    refundCharge(id: string, callback: NodeCallback<Refund>): void;
	    partiallyRefundCharge(id: string, amount: number, callback: NodeCallback<Refund>): void;
	    getRefund(id: string, callback: NodeCallback<Refund>): void;
	    getRefundsForCharge(id: string, callback: NodeCallback<Refund[]>): void;
	    createSubscriptionPlan(name: string, amount: number, currency: string, description: string, interval: string, intervalCount: number, callback: NodeCallback<SubscriptionPlan>): void;
	    listSubscriptionPlans(callback: NodeCallback<SubscriptionPlan[]>): void;
	    createSubscription(planID: string, name: string, description: string, source: CreditCard, callback: NodeCallback<Subscription>): void;
	    cancelSubscription(id: string, callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/SendGrid' {
	import { Email } from 'cloudrail-si/interfaces/Email';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Attachment } from 'cloudrail-si/types/Attachment';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class SendGrid implements Email, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, apiKey: string);
	    sendEmail(fromAddress: string, fromName: string, toAddresses: string[], subject: string, textBody: string, htmlBody: string, ccAddresses: string[], bccAddresses: string[], attachments: Attachment[], callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Slack' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Slack implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Stripe' {
	import { Payment } from 'cloudrail-si/interfaces/Payment';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { CreditCard } from 'cloudrail-si/types/CreditCard';
	import { Charge } from 'cloudrail-si/types/Charge';
	import { Refund } from 'cloudrail-si/types/Refund';
	import { Subscription } from 'cloudrail-si/types/Subscription';
	import { SubscriptionPlan } from 'cloudrail-si/types/SubscriptionPlan';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Stripe implements Payment, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, secretKey: string);
	    createCharge(amount: number, currency: string, source: CreditCard, callback: NodeCallback<Charge>): void;
	    getCharge(id: string, callback: NodeCallback<Charge>): void;
	    listCharges(from: number, to: number, creditCard: CreditCard, callback: NodeCallback<Charge[]>): void;
	    refundCharge(id: string, callback: NodeCallback<Refund>): void;
	    partiallyRefundCharge(id: string, amount: number, callback: NodeCallback<Refund>): void;
	    getRefund(id: string, callback: NodeCallback<Refund>): void;
	    getRefundsForCharge(id: string, callback: NodeCallback<Refund[]>): void;
	    createSubscriptionPlan(name: string, amount: number, currency: string, description: string, interval: string, intervalCount: number, callback: NodeCallback<SubscriptionPlan>): void;
	    listSubscriptionPlans(callback: NodeCallback<SubscriptionPlan[]>): void;
	    createSubscription(planID: string, name: string, description: string, source: CreditCard, callback: NodeCallback<Subscription>): void;
	    cancelSubscription(id: string, callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Twilio' {
	import { SMS } from 'cloudrail-si/interfaces/SMS';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Twilio implements SMS, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, accountSid: string, authToken: string);
	    sendSMS(fromName: string, toNumber: string, content: string, callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Twitter' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { Social } from 'cloudrail-si/interfaces/Social';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Twitter implements Profile, Social, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    postUpdate(content: string, callback: NodeCallback<void>): void;
	    postImage(message: string, image: stream.Readable, callback: NodeCallback<void>): void;
	    postVideo(message: string, video: stream.Readable, size: number, mimeType: string, callback: NodeCallback<void>): void;
	    getConnections(callback: NodeCallback<string[]>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Twizo' {
	import { SMS } from 'cloudrail-si/interfaces/SMS';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Twizo implements SMS {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, key: string);
	    sendSMS(fromName: string, toNumber: string, content: string, callback: NodeCallback<void>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Yahoo' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Yahoo implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Yelp' {
	import { PointsOfInterest } from 'cloudrail-si/interfaces/PointsOfInterest';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { POI } from 'cloudrail-si/types/POI';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Yelp implements PointsOfInterest {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientID: string, clientSecret: string);
	    getNearbyPOIs(latitude: number, longitude: number, radius: number, searchTerm: string, categories: string[], callback: NodeCallback<POI[]>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/RedirectReceivers' {
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class RedirectReceivers {
	    static getLocalAuthenticator(port?: number, respHtml?: string): RedirectReceiver;
	    /**
	     * A RedirectReceiver implementation for users of the "electron" framework using a BrowserWindow
	     *
	     * @param BrowserWindow The BrowserWindow constructor
	     * @param redirectUrl The redirect URL that will receive the code(s)
	     * @return The RedirectReceiver
	     */
	    static getElectronAuthenticator(BrowserWindow: any, redirectUrl: string): RedirectReceiver;
	}

}
declare module 'cloudrail-si/services/Egnyte' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Egnyte implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, domain: string, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/BusinessCloudStorage' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	/**
	 * This interface provides methods for backend storage services. Unlike the {@link CloudStorage}
	 * interface this interface does not require a user to authenticate since it is intended for the
	 * use in a backend where only the owner of the backend wants to store data to his own account.
	 */
	export interface BusinessCloudStorage {
	    /**
	     * Get a list of all buckets within your account.
	     *
	     * @return List of buckets. This might be an empty list if there are no buckets.
	     */
	    listBuckets: (callback: NodeCallback<Bucket[]>) => void;
	    /**
	     * Creates a new empty bucket.
	     *
	     * @param name The name of the new bucket.
	     * @return The newly created bucket.
	     * @error IllegalArgumentError Is set if a bucket with the same name already exists.
	     */
	    createBucket: (name: string, callback?: NodeCallback<Bucket>) => void;
	    /**
	     * Deletes the specified bucket with all its content.
	     *
	     * @param bucket The bucket which will be deleted.
	     * @error NotFoundError Is set if the bucket does not exist.
	     */
	    deleteBucket: (bucket: Bucket, callback?: NodeCallback<void>) => void;
	    /**
	     * Get a list of files contained in the specified bucket.
	     *
	     * @param bucket The bucket containing the files.
	     * @error NotFoundError Is set if the specified bucket does not exist.
	     */
	    listFiles: (bucket: Bucket, callback: NodeCallback<BusinessFileMetaData[]>) => void;
	    /**
	     * Uploads a new file into a bucket or replaces the file if it is already present.
	     *
	     * @param bucket  The bucket into which the file shall be put.
	     * @param name    The name of the file.
	     * @param content The file content as a readable stream.
	     * @param size    The amount of bytes that the file contains.
	     */
	    uploadFile: (bucket: Bucket, name: string, content: stream.Readable, size: number, callback?: NodeCallback<void>) => void;
	    /**
	     * Deletes a file within a bucket.
	     *
	     * @param bucket   The bucket that contains the file.
	     * @param fileName The name of the file.
	     * @error NotFoundError Is set if there is no file with the given
	     *                      name inside the bucket.
	     */
	    deleteFile: (fileName: string, bucket: Bucket, callback?: NodeCallback<void>) => void;
	    /**
	     * Downloads a file from a bucket.
	     *
	     * @param bucket   The bucket which contains the file.
	     * @param fileName The name of the file.
	     * @return The content of the file as a readable stream.
	     * @error NotFoundError Is set if there is no file with the given
	     *                      name inside the bucket.
	     */
	    downloadFile: (fileName: string, bucket: Bucket, callback: NodeCallback<stream.Readable>) => void;
	    /**
	     * Get metadata of a file containing the name, the size and the last
	     * modified date.
	     *
	     * @param bucket   The bucket where the file is located.
	     * @param fileName The name of the file.
	     */
	    getFileMetadata: (bucket: Bucket, fileName: string, callback: NodeCallback<BusinessFileMetaData>) => void;
	}

}
declare module 'cloudrail-si/services/Backblaze' {
	import { BusinessCloudStorage } from 'cloudrail-si/interfaces/BusinessCloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Backblaze implements BusinessCloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, accountID: string, appKey: string);
	    createBucket(bucketName: string, callback: NodeCallback<Bucket>): void;
	    listBuckets(callback: NodeCallback<Bucket[]>): void;
	    deleteBucket(bucket: Bucket, callback: NodeCallback<void>): void;
	    deleteFile(fileName: string, bucket: Bucket, callback: NodeCallback<void>): void;
	    getFileMetadata(bucket: Bucket, fileName: string, callback: NodeCallback<BusinessFileMetaData>): void;
	    listFiles(bucket: Bucket, callback: NodeCallback<BusinessFileMetaData[]>): void;
	    uploadFile(bucket: Bucket, name: string, stream: stream.Readable, size: number, callback: NodeCallback<void>): void;
	    downloadFile(fileName: string, bucket: Bucket, callback: NodeCallback<stream.Readable>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Rackspace' {
	import { BusinessCloudStorage } from 'cloudrail-si/interfaces/BusinessCloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Rackspace implements BusinessCloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, username: string, apiKey: string, region: string);
	    createBucket(bucketName: string, callback: NodeCallback<Bucket>): void;
	    listBuckets(callback: NodeCallback<Bucket[]>): void;
	    deleteBucket(bucket: Bucket, callback: NodeCallback<void>): void;
	    deleteFile(fileName: string, bucket: Bucket, callback: NodeCallback<void>): void;
	    getFileMetadata(bucket: Bucket, fileName: string, callback: NodeCallback<BusinessFileMetaData>): void;
	    listFiles(bucket: Bucket, callback: NodeCallback<BusinessFileMetaData[]>): void;
	    uploadFile(bucket: Bucket, name: string, stream: stream.Readable, size: number, callback: NodeCallback<void>): void;
	    downloadFile(fileName: string, bucket: Bucket, callback: NodeCallback<stream.Readable>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/MicrosoftAzure' {
	import { BusinessCloudStorage } from 'cloudrail-si/interfaces/BusinessCloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class MicrosoftAzure implements BusinessCloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, accountName: string, accessKey: string);
	    createBucket(bucketName: string, callback: NodeCallback<Bucket>): void;
	    listBuckets(callback: NodeCallback<Bucket[]>): void;
	    deleteBucket(bucket: Bucket, callback: NodeCallback<void>): void;
	    deleteFile(fileName: string, bucket: Bucket, callback: NodeCallback<void>): void;
	    getFileMetadata(bucket: Bucket, fileName: string, callback: NodeCallback<BusinessFileMetaData>): void;
	    listFiles(bucket: Bucket, callback: NodeCallback<BusinessFileMetaData[]>): void;
	    uploadFile(bucket: Bucket, name: string, stream: stream.Readable, size: number, callback: NodeCallback<void>): void;
	    downloadFile(fileName: string, bucket: Bucket, callback: NodeCallback<stream.Readable>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/AmazonS3' {
	import { BusinessCloudStorage } from 'cloudrail-si/interfaces/BusinessCloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class AmazonS3 implements BusinessCloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, accessKeyId: string, secretAccessKey: string, region: string);
	    createBucket(bucketName: string, callback: NodeCallback<Bucket>): void;
	    listBuckets(callback: NodeCallback<Bucket[]>): void;
	    deleteBucket(bucket: Bucket, callback: NodeCallback<void>): void;
	    deleteFile(fileName: string, bucket: Bucket, callback: NodeCallback<void>): void;
	    getFileMetadata(bucket: Bucket, fileName: string, callback: NodeCallback<BusinessFileMetaData>): void;
	    listFiles(bucket: Bucket, callback: NodeCallback<BusinessFileMetaData[]>): void;
	    uploadFile(bucket: Bucket, name: string, stream: stream.Readable, size: number, callback: NodeCallback<void>): void;
	    downloadFile(fileName: string, bucket: Bucket, callback: NodeCallback<stream.Readable>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Heroku' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Heroku implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/OneDriveBusiness' {
	import { CloudStorage } from 'cloudrail-si/interfaces/CloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class OneDriveBusiness implements CloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string);
	    download(filePath: string, callback: NodeCallback<stream.Readable>): void;
	    upload(filePath: string, stream: stream.Readable, size: number, overwrite: boolean, callback: NodeCallback<void>): void;
	    move(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    delete(filePath: string, callback: NodeCallback<void>): void;
	    copy(sourcePath: string, destinationPath: string, callback: NodeCallback<void>): void;
	    createFolder(folderPath: string, callback: NodeCallback<void>): void;
	    getMetadata(filePath: string, callback: NodeCallback<CloudMetaData>): void;
	    getChildren(folderPath: string, callback: NodeCallback<CloudMetaData[]>): void;
	    getChildrenPage(path: string, offset: number, limit: number, callback: NodeCallback<CloudMetaData[]>): void;
	    getUserLogin(callback: NodeCallback<string>): void;
	    getUserName(callback: NodeCallback<string>): void;
	    createShareLink(path: string, callback: NodeCallback<string>): void;
	    getAllocation(callback: NodeCallback<SpaceAllocation>): void;
	    exists(path: string, callback: NodeCallback<boolean>): void;
	    getThumbnail(path: string, callback: NodeCallback<stream.Readable>): void;
	    search(query: string, callback: NodeCallback<CloudMetaData[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/GoogleCloudPlatform' {
	import { BusinessCloudStorage } from 'cloudrail-si/interfaces/BusinessCloudStorage';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class GoogleCloudPlatform implements BusinessCloudStorage, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientEmail: string, privateKey: string, projectId: string);
	    createBucket(bucketName: string, callback: NodeCallback<Bucket>): void;
	    listBuckets(callback: NodeCallback<Bucket[]>): void;
	    deleteBucket(bucket: Bucket, callback: NodeCallback<void>): void;
	    deleteFile(fileName: string, bucket: Bucket, callback: NodeCallback<void>): void;
	    getFileMetadata(bucket: Bucket, fileName: string, callback: NodeCallback<BusinessFileMetaData>): void;
	    listFiles(bucket: Bucket, callback: NodeCallback<BusinessFileMetaData[]>): void;
	    uploadFile(bucket: Bucket, name: string, stream: stream.Readable, size: number, callback: NodeCallback<void>): void;
	    downloadFile(fileName: string, bucket: Bucket, callback: NodeCallback<stream.Readable>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/FacebookPage' {
	import { Social } from 'cloudrail-si/interfaces/Social';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class FacebookPage implements Social, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, pageName: string, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    postUpdate(content: string, callback: NodeCallback<void>): void;
	    postImage(message: string, image: stream.Readable, callback: NodeCallback<void>): void;
	    postVideo(message: string, video: stream.Readable, size: number, mimeType: string, callback: NodeCallback<void>): void;
	    getConnections(callback: NodeCallback<string[]>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/ProductHunt' {
	import { Profile } from 'cloudrail-si/interfaces/Profile';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class ProductHunt implements Profile, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientId: string, clientSecret: string, redirectUri: string, state: string, scopes?: string[]);
	    getIdentifier(callback: NodeCallback<string>): void;
	    getFullName(callback: NodeCallback<string>): void;
	    getEmail(callback: NodeCallback<string>): void;
	    getGender(callback: NodeCallback<string>): void;
	    getDescription(callback: NodeCallback<string>): void;
	    getDateOfBirth(callback: NodeCallback<DateOfBirth>): void;
	    getLocale(callback: NodeCallback<string>): void;
	    getPictureURL(callback: NodeCallback<string>): void;
	    login(callback: NodeCallback<void>): void;
	    logout(callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/GMail' {
	import { Email } from 'cloudrail-si/interfaces/Email';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { Attachment } from 'cloudrail-si/types/Attachment';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class GMail implements Email, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, clientID: string, clientSecret: string, redirectUri: string, state: string);
	    sendEmail(fromAddress: string, fromName: string, toAddresses: string[], subject: string, textBody: string, htmlBody: string, ccAddresses: string[], bccAddresses: string[], attachments: Attachment[], callback: NodeCallback<void>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/interfaces/Messaging' {
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import stream = require("stream");
	export interface Messaging {
	    sendMessage: (receiverId: string, message: string, callback: NodeCallback<Message>) => void;
	    sendImage: (receiverId: string, message: string, identifier: string, imageStream: stream.Readable, previewUrl: string, fileName: string, callback: NodeCallback<Message>) => void;
	    sendVideo: (receiverId: string, message: string, identifier: string, videoStream: stream.Readable, previewUrl: string, size: number, callback: NodeCallback<Message>) => void;
	    sendAudio: (receiverId: string, message: string, identifier: string, audioStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>) => void;
	    sendFile: (receiverId: string, message: string, identifier: string, fileStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>) => void;
	    parseReceivedMessages: (httpRequest: stream.Readable, callback: NodeCallback<Message[]>) => void;
	    downloadContent: (attachment: MessagingAttachment, callback: NodeCallback<MessagingAttachment>) => void;
	    sendCarousel: (receiverId: string, messageItems: MessageItem[], callback: NodeCallback<Message>) => void;
	}

}
declare module 'cloudrail-si/services/FacebookMessenger' {
	import { Messaging } from 'cloudrail-si/interfaces/Messaging';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class FacebookMessenger implements Messaging, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, botToken: string);
	    sendMessage(receiverId: string, message: string, callback: NodeCallback<Message>): void;
	    sendImage(receiverId: string, message: string, imageId: string, imageStream: stream.Readable, previewUrl: string, mimeType: string, callback: NodeCallback<Message>): void;
	    sendVideo(receiverId: string, message: string, videoId: string, videoStream: stream.Readable, previewUrl: string, size: number, callback: NodeCallback<Message>): void;
	    sendAudio(receiverId: string, message: string, audioId: string, audioStream: stream.Readable, previewUrl: string, audioName: string, size: number, callback: NodeCallback<Message>): void;
	    sendFile(receiverId: string, message: string, fileId: string, fileStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>): void;
	    sendCarousel(receiverId: string, messageItem: MessageItem[], callback: NodeCallback<Message>): void;
	    parseReceivedMessages(httpRequest: stream.Readable, callback: NodeCallback<Message[]>): void;
	    downloadContent(attachment: MessagingAttachment, callback: NodeCallback<MessagingAttachment>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Line' {
	import { Messaging } from 'cloudrail-si/interfaces/Messaging';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Line implements Messaging, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, botToken: string);
	    sendMessage(receiverId: string, message: string, callback: NodeCallback<Message>): void;
	    sendImage(receiverId: string, message: string, imageId: string, imageStream: stream.Readable, previewUrl: string, mimeType: string, callback: NodeCallback<Message>): void;
	    sendVideo(receiverId: string, message: string, videoId: string, videoStream: stream.Readable, previewUrl: string, size: number, callback: NodeCallback<Message>): void;
	    sendAudio(receiverId: string, message: string, audioId: string, audioStream: stream.Readable, previewUrl: string, audioName: string, size: number, callback: NodeCallback<Message>): void;
	    sendFile(receiverId: string, message: string, fileId: string, fileStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>): void;
	    sendCarousel(receiverId: string, messageItem: MessageItem[], callback: NodeCallback<Message>): void;
	    parseReceivedMessages(httpRequest: stream.Readable, callback: NodeCallback<Message[]>): void;
	    downloadContent(attachment: MessagingAttachment, callback: NodeCallback<MessagingAttachment>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Telegram' {
	import { Messaging } from 'cloudrail-si/interfaces/Messaging';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Telegram implements Messaging, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, botToken: string, webhook: string);
	    sendMessage(receiverId: string, message: string, callback: NodeCallback<Message>): void;
	    sendImage(receiverId: string, message: string, imageId: string, imageStream: stream.Readable, previewUrl: string, mimeType: string, callback: NodeCallback<Message>): void;
	    sendVideo(receiverId: string, message: string, videoId: string, videoStream: stream.Readable, previewUrl: string, size: number, callback: NodeCallback<Message>): void;
	    sendAudio(receiverId: string, message: string, audioId: string, audioStream: stream.Readable, previewUrl: string, audioName: string, size: number, callback: NodeCallback<Message>): void;
	    sendFile(receiverId: string, message: string, fileId: string, fileStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>): void;
	    sendCarousel(receiverId: string, messageItem: MessageItem[], callback: NodeCallback<Message>): void;
	    parseReceivedMessages(httpRequest: stream.Readable, callback: NodeCallback<Message[]>): void;
	    downloadContent(attachment: MessagingAttachment, callback: NodeCallback<MessagingAttachment>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/Viber' {
	import { Messaging } from 'cloudrail-si/interfaces/Messaging';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class Viber implements Messaging, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, botToken: string, webhook: string, botName: string);
	    sendMessage(receiverId: string, message: string, callback: NodeCallback<Message>): void;
	    sendImage(receiverId: string, message: string, imageId: string, imageStream: stream.Readable, previewUrl: string, mimeType: string, callback: NodeCallback<Message>): void;
	    sendVideo(receiverId: string, message: string, videoId: string, videoStream: stream.Readable, previewUrl: string, size: number, callback: NodeCallback<Message>): void;
	    sendAudio(receiverId: string, message: string, audioId: string, audioStream: stream.Readable, previewUrl: string, audioName: string, size: number, callback: NodeCallback<Message>): void;
	    sendFile(receiverId: string, message: string, fileId: string, fileStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>): void;
	    sendCarousel(receiverId: string, messageItem: MessageItem[], callback: NodeCallback<Message>): void;
	    parseReceivedMessages(httpRequest: stream.Readable, callback: NodeCallback<Message[]>): void;
	    downloadContent(attachment: MessagingAttachment, callback: NodeCallback<MessagingAttachment>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/services/SlackBot' {
	import { Messaging } from 'cloudrail-si/interfaces/Messaging';
	import { AdvancedRequestSupporter } from 'cloudrail-si/interfaces/AdvancedRequestSupporter';
	import { NodeCallback } from 'cloudrail-si/helpers/Helper';
	import stream = require("stream");
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import { RedirectReceiver } from 'cloudrail-si/servicecode/commands/AwaitCodeRedirect';
	export class SlackBot implements Messaging, AdvancedRequestSupporter {
	    private interpreterStorage;
	    private instanceDependencyStorage;
	    private persistentStorage;
	    constructor(redirectReceiver: RedirectReceiver, botToken: string);
	    sendMessage(receiverId: string, message: string, callback: NodeCallback<Message>): void;
	    sendImage(receiverId: string, message: string, imageId: string, imageStream: stream.Readable, previewUrl: string, mimeType: string, callback: NodeCallback<Message>): void;
	    sendVideo(receiverId: string, message: string, videoId: string, videoStream: stream.Readable, previewUrl: string, size: number, callback: NodeCallback<Message>): void;
	    sendAudio(receiverId: string, message: string, audioId: string, audioStream: stream.Readable, previewUrl: string, audioName: string, size: number, callback: NodeCallback<Message>): void;
	    sendFile(receiverId: string, message: string, fileId: string, fileStream: stream.Readable, previewUrl: string, fileName: string, size: number, callback: NodeCallback<Message>): void;
	    sendCarousel(receiverId: string, messageItem: MessageItem[], callback: NodeCallback<Message>): void;
	    parseReceivedMessages(httpRequest: stream.Readable, callback: NodeCallback<Message[]>): void;
	    downloadContent(attachment: MessagingAttachment, callback: NodeCallback<MessagingAttachment>): void;
	    advancedRequest(specification: AdvancedRequestSpecification, callback: NodeCallback<AdvancedRequestResponse>): void;
	    saveAsString(): string;
	    loadAsString(savedState: string): void;
	    resumeLogin(executionState: string, callback: NodeCallback<void>): void;
	}

}
declare module 'cloudrail-si/index' {
	import { Box } from 'cloudrail-si/services/Box';
	import { Foursquare } from 'cloudrail-si/services/Foursquare';
	import { Dropbox } from 'cloudrail-si/services/Dropbox';
	import { Facebook } from 'cloudrail-si/services/Facebook';
	import { GitHub } from 'cloudrail-si/services/GitHub';
	import { GoogleDrive } from 'cloudrail-si/services/GoogleDrive';
	import { GooglePlaces } from 'cloudrail-si/services/GooglePlaces';
	import { GooglePlus } from 'cloudrail-si/services/GooglePlus';
	import { Instagram } from 'cloudrail-si/services/Instagram';
	import { LinkedIn } from 'cloudrail-si/services/LinkedIn';
	import { MailJet } from 'cloudrail-si/services/MailJet';
	import { MicrosoftLive } from 'cloudrail-si/services/MicrosoftLive';
	import { Microsoft } from 'cloudrail-si/services/Microsoft';
	import { Nexmo } from 'cloudrail-si/services/Nexmo';
	import { OneDrive } from 'cloudrail-si/services/OneDrive';
	import { PayPal } from 'cloudrail-si/services/PayPal';
	import { SendGrid } from 'cloudrail-si/services/SendGrid';
	import { Slack } from 'cloudrail-si/services/Slack';
	import { Stripe } from 'cloudrail-si/services/Stripe';
	import { Twilio } from 'cloudrail-si/services/Twilio';
	import { Twitter } from 'cloudrail-si/services/Twitter';
	import { Twizo } from 'cloudrail-si/services/Twizo';
	import { Yahoo } from 'cloudrail-si/services/Yahoo';
	import { Yelp } from 'cloudrail-si/services/Yelp';
	import { Address } from 'cloudrail-si/types/Address';
	import { Charge } from 'cloudrail-si/types/Charge';
	import { CloudMetaData } from 'cloudrail-si/types/CloudMetaData';
	import { CreditCard } from 'cloudrail-si/types/CreditCard';
	import { DateOfBirth } from 'cloudrail-si/types/DateOfBirth';
	import { Location } from 'cloudrail-si/types/Location';
	import { POI } from 'cloudrail-si/types/POI';
	import { Refund } from 'cloudrail-si/types/Refund';
	import { Subscription } from 'cloudrail-si/types/Subscription';
	import { SubscriptionPlan } from 'cloudrail-si/types/SubscriptionPlan';
	import { SpaceAllocation } from 'cloudrail-si/types/SpaceAllocation';
	import { Message } from 'cloudrail-si/types/Message';
	import { MessagingAttachment } from 'cloudrail-si/types/MessagingAttachment';
	import { MessageItem } from 'cloudrail-si/types/MessageItem';
	import { MessageButton } from 'cloudrail-si/types/MessageButton';
	import { Attachment } from 'cloudrail-si/types/Attachment';
	import { Settings } from 'cloudrail-si/Settings';
	import { RedirectReceivers } from 'cloudrail-si/RedirectReceivers';
	import { ImageMetaData } from 'cloudrail-si/types/ImageMetaData';
	import { Egnyte } from 'cloudrail-si/services/Egnyte';
	import { BusinessFileMetaData } from 'cloudrail-si/types/BusinessFileMetaData';
	import { Bucket } from 'cloudrail-si/types/Bucket';
	import { Backblaze } from 'cloudrail-si/services/Backblaze';
	import { Rackspace } from 'cloudrail-si/services/Rackspace';
	import { MicrosoftAzure } from 'cloudrail-si/services/MicrosoftAzure';
	import { AmazonS3 } from 'cloudrail-si/services/AmazonS3';
	import { Heroku } from 'cloudrail-si/services/Heroku';
	import { OneDriveBusiness } from 'cloudrail-si/services/OneDriveBusiness';
	import { GoogleCloudPlatform } from 'cloudrail-si/services/GoogleCloudPlatform';
	import { AdvancedRequestSpecification } from 'cloudrail-si/types/AdvancedRequestSpecification';
	import { AdvancedRequestResponse } from 'cloudrail-si/types/AdvancedRequestResponse';
	import { FacebookPage } from 'cloudrail-si/services/FacebookPage';
	import { ProductHunt } from 'cloudrail-si/services/ProductHunt';
	import { GMail } from 'cloudrail-si/services/GMail';
	import { FacebookMessenger } from 'cloudrail-si/services/FacebookMessenger';
	import { Line } from 'cloudrail-si/services/Line';
	import { Telegram } from 'cloudrail-si/services/Telegram';
	import { Viber } from 'cloudrail-si/services/Viber';
	import { SlackBot } from 'cloudrail-si/services/SlackBot'; var _default: {
	    "services": {
	        "AmazonS3": typeof AmazonS3;
	        "Box": typeof Box;
	        "Backblaze": typeof Backblaze;
	        "Dropbox": typeof Dropbox;
	        "Egnyte": typeof Egnyte;
	        "Facebook": typeof Facebook;
	        "FacebookPage": typeof FacebookPage;
	        "Foursquare": typeof Foursquare;
	        "GitHub": typeof GitHub;
	        "GoogleCloudPlatform": typeof GoogleCloudPlatform;
	        "GoogleDrive": typeof GoogleDrive;
	        "GooglePlaces": typeof GooglePlaces;
	        "GooglePlus": typeof GooglePlus;
	        "Heroku": typeof Heroku;
	        "Instagram": typeof Instagram;
	        "LinkedIn": typeof LinkedIn;
	        "MailJet": typeof MailJet;
	        "MicrosoftAzure": typeof MicrosoftAzure;
	        "MicrosoftLive": typeof MicrosoftLive;
	        "Microsoft": typeof Microsoft;
	        "Nexmo": typeof Nexmo;
	        "OneDrive": typeof OneDrive;
	        "OneDriveBusiness": typeof OneDriveBusiness;
	        "PayPal": typeof PayPal;
	        "ProductHunt": typeof ProductHunt;
	        "Rackspace": typeof Rackspace;
	        "SendGrid": typeof SendGrid;
	        "Slack": typeof Slack;
	        "SlackBot": typeof SlackBot;
	        "Stripe": typeof Stripe;
	        "Twilio": typeof Twilio;
	        "Twitter": typeof Twitter;
	        "Twizo": typeof Twizo;
	        "Yahoo": typeof Yahoo;
	        "Yelp": typeof Yelp;
	        "GMail": typeof GMail;
	        "FacebookMessenger": typeof FacebookMessenger;
	        "Viber": typeof Viber;
	        "Line": typeof Line;
	        "Telegram": typeof Telegram;
	    };
	    "types": {
	        "Address": typeof Address;
	        "Charge": typeof Charge;
	        "CloudMetaData": typeof CloudMetaData;
	        "CreditCard": typeof CreditCard;
	        "DateOfBirth": typeof DateOfBirth;
	        "Location": typeof Location;
	        "POI": typeof POI;
	        "Refund": typeof Refund;
	        "Subscription": typeof Subscription;
	        "SubscriptionPlan": typeof SubscriptionPlan;
	        "SpaceAllocation": typeof SpaceAllocation;
	        "ImageMetaData": typeof ImageMetaData;
	        "Bucket": typeof Bucket;
	        "BusinessFileMetaData": typeof BusinessFileMetaData;
	        "AdvancedRequestSpecification": typeof AdvancedRequestSpecification;
	        "AdvancedRequestResponse": typeof AdvancedRequestResponse;
	        "Attachment": typeof Attachment;
	        "Message": typeof Message;
	        "MessagingAttachment": typeof MessagingAttachment;
	        "MessageItem": typeof MessageItem;
	        "MessageButton": typeof MessageButton;
	    };
	    "Settings": typeof Settings;
	    "RedirectReceivers": typeof RedirectReceivers;
	};
	export = _default;

}
