import { BaseComponent } from "serverless-development-framework";
export declare class UserService extends BaseComponent {
    constructor();
    /**
     * Service to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {any}
     */
    getAllUser(userInfo?: any): Promise<any>;
    /**
     * Service to retrieve User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {any}
     */
    getUser(userId: string, userInfo?: any): Promise<any>;
    /**
     * Service to retrieve User with a specific id and filters
     * @param userId {string} - user id
     * @param region {string} - user region
     * @param culture {string} - user region
     * @param userInfo {any} - user info from token
     * @returns {any}
     */
    getUserFiltered(userId: string, region: string, culture?: string, userInfo?: any): Promise<any>;
    /**
     * Service to delete User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {any}
     */
    deleteUser(userId: string, userInfo?: any): Promise<any>;
    /**
     * Service to create a new user
     * @param body {any} - user body
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse}
     */
    createUser(body: any, userInfo?: any): Promise<any>;
}
//# sourceMappingURL=user.service.d.ts.map