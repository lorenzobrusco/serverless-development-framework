import { EventType } from "./resolver.event";
import * as pathMatching from "node-match-path";
import { Injector } from "./resolver.decorator";
import { ResolverError } from "./resolver.error";
import { FailedResponse } from "./resolver.response";
import { authorizerHandel, IdpTye } from "./resolver.auth";

/**
 * A list of routes
 * */
export const routes = new Map<string, object>();

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
            const record = event.Records[0] ?? {};
            resolver = await resolveRouting(record, routes, EventType.AwsEvent);
            const handler = Injector.get(resolver.class);
            const args = await extractApiArgs(record, context, handler, resolver.handler);
            return await handler[`${resolver.handler}`](...args);
        } else if (event['detail-type'] !== undefined) {
            resolver = await resolveRouting(event, routes, EventType.CustomEvent);
            const handler = Injector.get(resolver.class);
            const args = await extractApiArgs(event, context, handler, resolver.handler);
            return await handler[`${resolver.handler}`](...args);
        } else {
            resolver = await resolveRouting(event, routes, EventType.Api);
            let userinfo: any = undefined;
            if (resolver.auth != null) {
                const authType = resolver.auth.type ?? IdpTye.COGNITO;
                if (authType == IdpTye.CUSTOM) {
                    if (resolver.auth.handler != null) {
                        userinfo = await resolver.auth.handler(event);
                    } else {
                        console.log('Defined custom idp but not handle provided');
                        return new FailedResponse(500, "Generic error");
                    }
                } else {
                    userinfo = await authorizerHandel(event, authType);
                }
                if (!userinfo && resolver.auth.authorizations.length > 0) {
                    return new FailedResponse(401, "Unauthorized");
                }
                const hasAuthorizations = resolver.auth.authorizations.every((val: any) => userinfo.roles.has(val));
                if (!hasAuthorizations) {
                    return new FailedResponse(403, "Forbidden");
                }
            }
            const handler = Injector.get(resolver.class);
            const args = await extractApiArgs(event, context, handler, resolver.handler, userinfo);
            return await handler[`${resolver.handler}`](...args);
        }
    } catch (error) {
        console.log('No resolved found');
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

    for (const item of routes.values()) {
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
    var path = item.path.replace('\/\/', '\/');
    let matched = pathMatching.match(path, event.path)
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
    let match = event.eventSource == item.method;
    return (match) ? item : null;
}

/**
 * Check whether custom event match with route item
 * @param {Object} event - Custom Event Input Format
 * @param {Object} item - Route item
 * @returns {Object?} - item whether matching or null
 */
async function customEventRouting(event: any, item: any): Promise<any> {
    var path = item.path.replace('\/\/', '\/');
    var detail = null;
    if (event.detail instanceof Array) {
        detail = event.detail[0];
    }
    else {
        detail = event.detail;
    }
    let matched = pathMatching.match(path, detail.__topic__);
    return (matched.matches) ? item : null;
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
                let body = event.body ?? undefined;
                try {
                    body = JSON.parse(event.body)
                } catch { }
                args.unshift(body ?? undefined);
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