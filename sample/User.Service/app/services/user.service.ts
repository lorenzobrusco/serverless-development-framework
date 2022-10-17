import { BaseComponent } from "serverless-development-framework";
import { Injectable } from "serverless-development-framework";

@Injectable
export class UserService extends BaseComponent {

    constructor() {
        super();
    }

    /**
     * Service to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {any} 
     */
    public async getAllUser(userInfo?: any): Promise<any> {
        this.logger.info(`Starting to retrieve all users`);
        //TODO  get all users 
        this.logger.info(`Successfully retrieved users`);
        return {};
    }


    /**
     * Service to retrieve User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {any} 
     */
    public async getUser(userId: string, userInfo?: any): Promise<any> {
        this.logger.info(`Starting to retrieve user with id ${userId}`);
        //TODO  get user
        this.logger.info(`Successfully retrieved user`);
        return {};
    }

    /**
     * Service to retrieve User with a specific id and filters
     * @param userId {string} - user id
     * @param region {string} - user region
     * @param culture {string} - user region
     * @param userInfo {any} - user info from token
     * @returns {any} 
     */
    public async getUserFiltered(userId: string, region: string, culture?: string, userInfo?: any): Promise<any> {
        this.logger.info(`Starting to retrieve user with id ${userId} with region ${region} and culture ${culture}`);
        //TODO  get user filtered
        this.logger.info(`Successfully retrieved user`);
        return {};
    }

    /**
     * Service to delete User with a specific id
     * @param userId {string} - user id
     * @param userInfo {any} - user info from token
     * @returns {any} 
     */
    public async deleteUser(userId: string, userInfo?: any): Promise<any> {
        this.logger.info(`Starting to delete user with id ${userId}`);
        //TODO  delete user
        this.logger.info(`Successfully delete user`);
    }

    /**
     * Service to create a new user
     * @param body {any} - user body
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    public async createUser(body: any, userInfo?: any): Promise<any> {
        this.logger.info(`Starting to create user ${body}`);
        //TODO create user
        this.logger.info(`Successfully created user`);
    }
}