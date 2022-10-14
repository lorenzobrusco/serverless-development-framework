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
    S3 = 'S3',

    /**
     * SQS Event
     */
    SQS = 'SQS',

    /**
     * SNS Event
     */
    SNS = 'SNS',

    /**
     *  Any other method
     */
    ANY = 'ANY'
}