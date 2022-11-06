import { CustomEventDetailType, generateEvent, Injector, RequestEvent, TMessage } from "../../../src/Serverless.Development.Framework.Core";
import { handlerResolver } from "../../../src/Serverless.Development.Framework.Core";
import { EventType, Method } from "../../../src/Serverless.Development.Framework.Core";
import { Authorizer, BaseComponent, IdpTye } from "../../../src/Serverless.Development.Framework.Core";
import { BaseResponse, SuccessResponse, FailedResponse } from "../../../src/Serverless.Development.Framework.Core";
import { EventPattern, Injectable, RequestBody, PathParameter, UserInfo, QueryParameter } from "../../../src/Serverless.Development.Framework.Core";


@Injectable
export class EventControllerTest extends BaseComponent {

    constructor() {
        super();
    }

    /**
     * Event Pattern to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @EventPattern(EventType.AwsEvent, Method.SQS, 'consumer')
    public async consumer(@RequestBody body?: any, @RequestEvent event?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[consumer] Starting to retrieve message from queue`);
            var res = {};
            this.logger.info(`[consumer] Successfully retrieved message from queue`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

    /**
     * Event Pattern to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @EventPattern(EventType.CustomEvent, Method.ANY, 'test')
    public async consumerCustomEvent(@RequestEvent event?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[consumerCustomEvent] Starting to retrieve message from eventbridge`);
            var res = {};
            this.logger.info(`[consumerCustomEvent] Successfully retrieved message from eventbridge`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

    @EventPattern(EventType.Api, Method.POST, '/producer')
    public async produceCustomEvent(@RequestEvent event?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[consumerCustomEvent] Starting to retrieve message from eventbridge`);
            var message = new Message('test');
            var res = generateEvent('user.lambda', CustomEventDetailType.TRANSACTION, message);
            this.logger.info(`[consumerCustomEvent] Successfully retrieved message from eventbridge`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

}

class Message extends TMessage {

    constructor(topic: string) {
        super(topic);
    }
}

Injector.register(EventControllerTest);

/**
 * Product Handler
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
export async function handler(event: any, context: any): Promise<any> {
    return await handlerResolver(event, context);
}