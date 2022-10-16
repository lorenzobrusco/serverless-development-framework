import "reflect-metadata";
import { routes } from "./resolver";
import { EventType, Method } from "./resolver.event";
import { IdpTye } from "./resolver.auth";

interface Type<T> {
    new(...args: any[]): T;
}

/**
 * Injector class, used for dependency Injection
 */
export class Injector {
    private static registry = new Map<string, any>();

    /**
     * Register a new Injectable class
     * @param target
     */
    static register<T>(target: Type<T>): T {
        if (Injector.registry.has(target.name)) {
            return Injector.registry.get(target.name);
        }
        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const injections = tokens.map((token: Type<any>): any =>
            Injector.register(token)
        );
        const instance = new target(...injections);
        Injector.registry.set(target.name, instance);
        return instance;
    }

    /**
     * Retrieve a stored class
     * @param key
     */
    static get(key: string) {
        return Injector.registry.get(key)
    }
}

/**
 * Injectable Decorator
 * @constructor
 */
export function Injectable<T>(target: Type<T>) {
}

/**
 * Register a new route with different parameter
 * @param type {EventType} - event type
 * @param method {Method} - event method
 * @param path {string} - event path
 * @constructor
 */
export function EventPattern(type: EventType, method: Method, path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var key = `__${target.constructor.name}__${descriptor.value.name}__`;
        if (routes.has(key)) {
            routes.set(key, {
                ...routes.get(key),
                type: type,
                method: method,
                path: path,
                class: target.constructor.name,
                handler: descriptor.value.name
            });
        } else {
            routes.set(key, {
                type: type,
                method: method,
                path: path,
                class: target.constructor.name,
                handler: descriptor.value.name,
                auth: null
            });
        }
    };
}

/**
 * Set authorization  with different parameter
 * @param type {IdpTye} - Identity provider type
 * @param authorizations {string[]} - the set of authorizations
 * @param handler {any} - the handler custom funcition
 * @constructor
 */
 export function Authorizer(type: IdpTye, authorizations: string[], handler?: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var key = `__${target.constructor.name}__${descriptor.value.name}__`;
        if (routes.has(key)) {
            routes.set(key, {
                ...routes.get(key),
                auth: {
                    type: type,
                    authorizations: authorizations,
                    handler: handler
                }
            });
        } else {
            routes.set(key, {
                auth: {
                    type: type,
                    roles: authorizations,
                    handler: handler
                }
            });
        }
    };
}

/**
 * RequestBody Decorator
 * @param target {Object} - class
 * @param key {string} - method name
 * @param index {number} - args position
 * @constructor
 */
export function RequestBody(target: any, key: string, index: number) {
    const metadataKey = `args`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push({ key: key, index: index, type: 'body' });
    } else {
        target[metadataKey] = [{ key: key, index: index, type: 'body' }];
    }
}

/**
 * PathParameter Decorator
 * @param value {string} - path parameter name
 * @constructor
 */
export function PathParameter(value: string) {
    return function (target: any, key: string, index: number) {
        const metadataKey = `args`;
        if (Array.isArray(target[metadataKey])) {
            target[metadataKey].push({ key: key, index: index, value: value, type: 'path' });
        } else {
            target[metadataKey] = [{ key: key, index: index, value: value, type: 'path' }];
        }
    }
}

/**
 * QueryParameter Decorator
 * @param value {string} - query parameter name
 * @constructor
 */
export function QueryParameter(value: string) {
    return function (target: any, key: string, index: number) {
        const metadataKey = `args`;
        if (Array.isArray(target[metadataKey])) {
            target[metadataKey].push({ key: key, index: index, value: value, type: 'query' });
        } else {
            target[metadataKey] = [{ key: key, index: index, value: value, type: 'query' }];
        }
    }
}

/**
 * UserInfo Decorator
 * @param target {Object} - class
 * @param key {string} - method name
 * @param index {number} - args position
 * @constructor
 */
export function UserInfo(target: any, key: string, index: number) {
    const metadataKey = `args`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push({ key: key, index: index, type: 'userInfo' });
    } else {
        target[metadataKey] = [{ key: key, index: index, type: 'userInfo' }];
    }
}

/**
 * Request Headers Decorator
 * @param target {Object} - class
 * @param key {string} - method name
 * @param index {number} - args position
 * @constructor
 */
export function RequestHeaders(target: any, key: string, index: number) {
    const metadataKey = `args`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push({ key: key, index: index, type: 'headers' });
    } else {
        target[metadataKey] = [{ key: key, index: index, type: 'headers' }];
    }
}

/**
 * Request Event Decorator
 * @param target {Object} - class
 * @param key {string} - method name
 * @param index {number} - args position
 * @constructor
 */
export function RequestEvent(target: any, key: string, index: number) {
    const metadataKey = `args`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push({ key: key, index: index, type: 'event' });
    } else {
        target[metadataKey] = [{ key: key, index: index, type: 'event' }];
    }
}

/**
 * Request Context Decorator
 * @param target {Object} - class
 * @param key {string} - method name
 * @param index {number} - args position
 * @constructor
 */
export function RequestContext(target: any, key: string, index: number) {
    const metadataKey = `args`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push({ key: key, index: index, type: 'context' });
    } else {
        target[metadataKey] = [{ key: key, index: index, type: 'context' }];
    }
}