import { UserService } from "../services/user.service";
import { BaseComponent } from "serverless-development-framework";
import { BaseResponse } from "serverless-development-framework";
export declare class UserController extends BaseComponent {
    private readonly service;
    constructor(service: UserService);
    /**
     * Event Pattern to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse}
     */
    getAllUser(userInfo?: any): Promise<BaseResponse>;
    /**
     * Event Pattern to retrieve User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse}
     */
    getUser(userId: string, userInfo?: any): Promise<BaseResponse>;
    /**
     * Event Pattern to retrieve User with a specific id and filters
     * @param userId {string} - user id
     * @param region {string} - user region
     * @param culture {string} - user region
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse}
     */
    getUserFiltered(userId: string, region: string, culture?: string, userInfo?: any): Promise<BaseResponse>;
    /**
     * Event Pattern to delete User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse}
     */
    deleteUser(userId: string, userInfo?: any): Promise<BaseResponse>;
    /**
     * Event Pattern to create a new user
     * @param body {any} - user body
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse}
     */
    createUser(body: any, userInfo?: any): Promise<BaseResponse>;
}
//# sourceMappingURL=user.controller.d.ts.map