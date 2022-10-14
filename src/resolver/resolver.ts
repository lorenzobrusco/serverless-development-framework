import * as pathMatching from "node-match-path";
import { EventType } from "./resolver.event";
import { ResolverError } from "./resolver.error";
import { authorizerHandel } from "./resolver.auth";
import { FailedResponse } from "./resolver.response";
import { Injector } from "./resolver.decotator";

/**
 * A list of routes
 * */
export const routes: object[] = [];

/**
 * According to the event and routes passed
 * as parameters this method find the right method to invoke
 * declared inside routes file
 * @param {Object} event - Event Input Format
 * @param {Object} context - Lambda context
 * @returns {*} object - API Gateway Lambda Proxy Output Format
 */
export async function handlerResolver(event: any, context: any): Promise<any> {
    try {
        let resolver: any;
        if (event.Records != null) {
            resolver = await resolveRouting(event, routes, EventType.AwsEvent);
            await resolver.handler(event);
        } else if (event['detail-type'] !== undefined) {
            resolver = await resolveRouting(event, routes, EventType.CustomEvent);
            await resolver.handler(event);
        } else {
            resolver = await resolveRouting(event, routes, EventType.Api);
            let userinfo: any = undefined;
            if (resolver.auth != null) {
                if (resolver.auth.handler == null) {
                    userinfo = await authorizerHandel(event);
                } else {
                    userinfo = await resolver.auth.handler(event);
                }
                const hasAuthorizations = resolver.auth.authorizations.every((val: any) => userinfo.roles.includes(val));
                if (!hasAuthorizations) {
                    return new FailedResponse(403, "Forbidden");
                }
            }
            const handler = Injector.get(resolver.class);
            const args = await extractApiArgs(event, context, handler, resolver.handler, userinfo);
            return await handler[`${resolver.handler}`](...args);
        }
    } catch (error) {
        return new FailedResponse(500, "Generic error");
    }
}


/**
 * Find to right handler according to event input and routing table
 * @param {Object} event - Event Input Format
 * @param {Object} routes - Routes Input Format
 * @param {EventType} eventType - Event type
 * @return {Function} - the service handler
 * @throws {ResolverError} - throws whether no service matched
 */
export async function resolveRouting(event: any, routes: any, eventType: EventType): Promise<any> {

    let resolver = null;

    for (const item of routes) {
        if (resolver != null) {
            break;
        }
        if (eventType === item.type && item.type === EventType.Api) {
            resolver = await apiRouting(event, item);
        } else if (eventType === item.type && item.type === EventType.AwsEvent) {
            resolver = await awsEventRouting(event, item);
        } else if (eventType === item.type && item.type === EventType.CustomEvent) {
            resolver = await customEventRouting(event, item);
        }
    }
    if (resolver == null) {
        throw new ResolverError("Method not implemented");
    }

    return resolver;
}

/**
 * Check whether api event match with route item
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} item - Route item
 * @returns {Object?} - item whether matching or null
 */
async function apiRouting(event: any, item: any): Promise<any> {
    let matched = pathMatching.match(item.path, event.path)
    let match = event.httpMethod === item.method && matched.matches;
    return (match) ? item : null;
}

/**
 * Check whether aws event match with route item
 * @param {Object} event - AWS Event Input Format
 * @param {Object} item - Route item
 * @returns {Object?} - item whether matching or null
 */
async function awsEventRouting(event: any, item: any): Promise<any> {
    return item;
}

/**
 * Check whether custom event match with route item
 * @param {Object} event - Custom Event Input Format
 * @param {Object} item - Route item
 * @returns {Object?} - item whether matching or null
 */
async function customEventRouting(event: any, item: any): Promise<any> {
    return item;
}

/**
 * Extract args from method using decorator
 * @param {Object} event - AWS Event Input Format
 * @param {Object} context - Lambda context
 * @param {Object} handler - handler function
 * @param {string} functionName - The handler function name
 * @param {Object} userInfo - Optional user info
 */
async function extractApiArgs(event: any, context: any, handler: any, functionName: string, userInfo?: any): Promise<any[]> {
    const args: any[] = [];
    for (const arg of Reflect.get(handler, 'args') ?? []) {
        if (arg.key === functionName) {
            if (arg.type === 'body') {
                args.unshift(JSON.parse(event.body) ?? undefined)
            } else if (arg.type === 'path') {
                args.unshift(event['pathParameters'][arg.value] ?? undefined);
            } else if (arg.type === 'query') {
                args.unshift(event['queryStringParameters'][arg.value] ?? undefined);
            } else if (arg.type === 'userInfo') {
                args.unshift(userInfo ?? undefined);
            } else if (arg.type === 'headers') {
                args.unshift(event['headers'] ?? undefined);
            } else if (arg.type === 'event') {
                args.unshift(event ?? undefined);
            } else if (arg.type === 'context') {
                args.unshift(context ?? undefined);
            }
        }
    }
    return args;
}