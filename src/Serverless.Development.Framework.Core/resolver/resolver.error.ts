/**
 * Custom Error throw whether resolver will not find
 * the right service according the specified routing
 */
 export class ResolverError extends Error {

    public code: number;

    constructor(message?: string) {
        super(message);
        this.code = 500;
    }
}
