export enum IdpTye {
    /**
     * Cognito Identity Provider
     */
     COGNITO = 0,

    /**
     * WSO2 Identity Provider
     */
    WSO2 = 1,

    /**
     * CUSTOM Identity Provider
     */
    CUSTOM=2
}

/**
 * Common claims for both id and access tokens
 */
export interface ClaimsBase {
    [name: string]: any;

    aud?: string;
    iss?: string;
    exp?: number;
    iat?: number;
    sub?: string;
    roles?: Set<string>;
    email?: string;
    email_verified?: string;
    auth_time?: string;
}

/**
 * Wso2 claims for both id and access tokens
 */
export interface Wso2Claims extends ClaimsBase {
    
    username?: string;
    groups?: string[];
}

/**
 * Cognito claims for both id and access tokens
 */
 export interface CognitoClaims extends ClaimsBase {
    
    "cognito:username": string;
    "cognito:groups"?: string[];
}

/**
 * combined type for Claims
 */
export type Claims = CognitoClaims | Wso2Claims;


/**
 * Returns the Cognito groups claim from either the id or access tokens as a Set
 * @param claims
 */
const getCognitoGroups = (claims: ClaimsBase): Set<string> => {
    const groups = claims["cognito:groups"];
    if (groups) {
        return new Set<string>(groups);
    }
    return new Set<string>();
};

/**
 * Returns the Wso2 groups claim from either the id or access tokens as a Set
 * @param claims
 */
 const getWso2Groups = (claims: ClaimsBase): Set<string> => {
    const groups = claims["groups"];
    if (groups) {
        
        return new Set<string>(groups?.split(',,') ?? []);
    }
    return new Set<string>();
};

/**
 * Retrieve Claims from Request Context
 * @param event - AWS Event Input Format
 * @param idp - Identity Provider Type 
 * @returns {Claims}
 */
export async function authorizerHandel(event: any, idp: IdpTye): Promise<Claims | null> {
    if (!event) {
        return null;
    }
    try {
        var claims = null
        switch (idp) {
            case IdpTye.COGNITO:
                claims = event?.requestContext?.authorizer?.claims as CognitoClaims;
                claims['roles'] = getCognitoGroups(claims);
                break;
            case IdpTye.WSO2:
                claims = event?.requestContext?.authorizer?.claims as Wso2Claims;
                claims['roles'] = getWso2Groups(claims);
                break;
            default:
                break;
        }
        return claims;
    } catch (e) {
        return null;
    }
}