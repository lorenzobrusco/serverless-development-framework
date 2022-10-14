import "reflect-metadata";
import { routes } from "./resolver";
import { EventType, Method } from "./resolver.event";

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
 * @param auth {Object} - userinfo, optionally
 * @constructor
 */
export function EventPattern(type: EventType, method: Method, path: string, auth?: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        routes.push({
            type: type,
            method: method,
            path: path,
            class: target.constructor.name,
            handler: descriptor.value.name,
            auth: auth
        })
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