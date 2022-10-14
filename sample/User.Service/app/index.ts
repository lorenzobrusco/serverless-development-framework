import { Injector } from "serverless-development-framework";
import { UserController } from "./controllers/user.controller";
import { handlerResolver } from "serverless-development-framework";

Injector.register(UserController);

/**
 * Product Handler
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
export async function handler(event: any, context: any): Promise<any> {
    return await handlerResolver(event, context);
}