import { Injector } from "../../../src/Serverless.Development.Framework.Core";
import { handlerResolver } from "../../../src/Serverless.Development.Framework.Core";
import { EventType, Method } from "../../../src/Serverless.Development.Framework.Core";
import { Authorizer, BaseComponent, IdpTye } from "../../../src/Serverless.Development.Framework.Core";
import { BaseResponse, SuccessResponse, FailedResponse } from "../../../src/Serverless.Development.Framework.Core";
import { EventPattern, Injectable, RequestBody, PathParameter, UserInfo, QueryParameter } from "../../../src/Serverless.Development.Framework.Core";


@Injectable
export class ApiControllerTest extends BaseComponent {

    constructor() {
        super();
    }

    /**
     * Event Pattern to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @Authorizer(IdpTye.COGNITO, ['test'])
    @EventPattern(EventType.Api, Method.GET, `/v1/api/user/`)
    public async getAllUser(@UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getAllUser] Starting to retrieve all users`);
            var res = {};
            this.logger.info(`[getAllUser] Successfully retrieved ${2} users`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

    /**
     * Event Pattern to retrieve User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @Authorizer(IdpTye.COGNITO, ['test'])
    @EventPattern(EventType.Api, Method.GET, `/v1/api/user/:userId`)
    public async getUser(@PathParameter('userId') userId: string, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getUser] Starting to retrieve user with id ${userId}`);
            var res = {};
            this.logger.info(`[getUser] Successfully retrieved user`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

    /**
     * Event Pattern to retrieve User with a specific id and filters
     * @param userId {string} - user id
     * @param region {string} - user region
     * @param culture {string} - user region
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @Authorizer(IdpTye.COGNITO, ['test'])
    @EventPattern(EventType.Api, Method.GET, `/v1/api/user/:userId/filter`)
    public async getUserFiltered(@PathParameter('userId') userId: string, @QueryParameter("region") region: string, @QueryParameter("culture") culture?: string, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getUserFiltered] Starting to retrieve user with id ${userId} with region ${region} and culture ${culture}`);
            var res = {};
            this.logger.info(`[getUserFiltered] Successfully retrieved user`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

    /**
     * Event Pattern to delete User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @Authorizer(IdpTye.COGNITO, ['test'])
    @EventPattern(EventType.Api, Method.DELETE, `/v1/api/user/:userId`)
    public async deleteUser(@PathParameter('userId') userId: string, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[deleteUser] Starting to delete user with id ${userId}`);
            this.logger.info(`[deleteUser] Successfully delete user`);
            return new SuccessResponse(200);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

    /**
     * Event Pattern to create a new user
     * @param body {any} - user body
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @Authorizer(IdpTye.COGNITO, ['test'])
    @EventPattern(EventType.Api, Method.POST, `/v1/api/user`)
    public async createUser(@RequestBody body: any, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[createUser] Starting to create user ${body}`);
            this.logger.info(`[createUser] Successfully created user`);
            return new SuccessResponse(201);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

}


Injector.register(ApiControllerTest);

/**
 * Product Handler
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
export async function handler(event: any, context: any): Promise<any> {
    return await handlerResolver(event, context);
}