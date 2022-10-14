export enum AuthTypeEnum {
    /**
     *  JWT token format
     */
    Jwt,

    /**
     * Access Token token format
     */
    AccessToken
}

/**
 * Retrieve userinfo inside from claims
 * @param {*} event
 * @returns {any} - user info
 */
export async function authorizerHandel(event: any): Promise<any> {
    return {
        email: event.requestContext?.authorizer?.claims?.email ?? null,
        roles: event.requestContext?.authorizer?.claims?.groups?.split(',,') ?? []
    }
}