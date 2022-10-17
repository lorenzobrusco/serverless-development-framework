import { UserService } from "../services/user.service";
import { NANOSERVICE } from "../configurations/configuration";
import { EventType, Method } from "serverless-development-framework";
import { Authorizer, BaseComponent, IdpTye } from "serverless-development-framework";
import { BaseResponse, SuccessResponse, FailedResponse } from "serverless-development-framework";
import { EventPattern, Injectable, RequestBody, PathParameter, UserInfo, QueryParameter } from "serverless-development-framework";


@Injectable
export class UserController extends BaseComponent {

    constructor(
        private readonly service: UserService) {
        super();
    }

    /**
     * Event Pattern to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @Authorizer(IdpTye.COGNITO, ['test'])
    @EventPattern(EventType.Api, Method.GET, `${NANOSERVICE}/`)
    public async getAllUser(@UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getAllUser] Starting to retrieve all users`);
            var res = await this.service.getAllUser(userInfo);
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
    @EventPattern(EventType.Api, Method.GET, `${NANOSERVICE}/:userId`)
    public async getUser(@PathParameter('userId') userId: string, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getUser] Starting to retrieve user with id ${userId}`);
            var res = await this.service.getUser(userId, userInfo);
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
    @EventPattern(EventType.Api, Method.GET, `${NANOSERVICE}/:userId/filter`)
    public async getUserFiltered(@PathParameter('userId') userId: string, @QueryParameter("region") region: string, @QueryParameter("culture") culture?: string, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getUserFiltered] Starting to retrieve user with id ${userId} with region ${region} and culture ${culture}`);
            var res = await this.service.getUserFiltered(userId, region, culture, userInfo);
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
    @EventPattern(EventType.Api, Method.DELETE, `${NANOSERVICE}/:userId`)
    public async deleteUser(@PathParameter('userId') userId: string, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[deleteUser] Starting to delete user with id ${userId}`);
            await this.service.deleteUser(userId, userInfo);
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
    @EventPattern(EventType.Api, Method.POST, `${NANOSERVICE}`)
    public async createUser(@RequestBody body: any, @UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[createUser] Starting to create user ${body}`);
            await this.service.createUser(body, userInfo);
            this.logger.info(`[createUser] Successfully created user`);
            return new SuccessResponse(201);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

}