export enum EventType {
    /**
     *  Event generated from HTTP invocation
     */
    Api,

    /**
     * Event generated from AWS service
     */
    AwsEvent,

    /**
     * Event generated from custom application
     */
    CustomEvent,
}

export enum Method {

    /**
     *  HTTP GET Method
     */
    GET = 'GET',

    /**
     * HTTP POST Method
     */
    POST = 'POST',

    /**
     * HTTP PUT Method
     */
    PUT = 'PUT',

    /**
     * HTTP PATCH Method
     */
    PATCH = 'PATCH',

    /**
     * HTTP DELETE Method
     */
    DELETE = 'DELETE',

    /**
     * S3 Event
     */
    S3 = 'aws:s3',

    /**
     * SQS Event
     */
    SQS = 'aws:sqs',

    /**
     * SNS Event
     */
    SNS = 'aws:sns',

    /**
     *  Any other method
     */
    ANY = 'ANY'
}

export enum CustomEventDetailType {

    /**
     *  Transaction detail type
     * */
    TRANSACTION = 'transaction'
}

/**
 * Generate Event to be compliant with eventbrdige
 * @param {string} source - the source of event, used to match which trigger should be invoke
 * @param {CustomEventDetailType} detailType - detail type
 * @param {TMessage} body - input of event
 */
export function generateEvent(source: string, detailType: CustomEventDetailType, body?: TMessage) {
    return {
        Entries: [
            {
                // Event envelope fields
                Source: source,
                EventBusName: process.env.EventBusName ?? 'default',
                DetailType: detailType,
                Time: new Date(),

                // Main event body
                Detail: JSON.stringify(body)
            }
        ]
    };
}

/**
 * T Message
 * */
export class TMessage {

    public __topic__: string;

    constructor(topic: string) {
        this.__topic__ = topic;
    }
}