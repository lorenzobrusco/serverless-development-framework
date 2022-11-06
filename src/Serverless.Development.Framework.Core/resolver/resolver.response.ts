/**
 * Base Response class
 */
 export class BaseResponse {

    public statusCode: any;
    public headers: any;

    constructor(statusCode: number) {
        this.statusCode = statusCode;
        this.headers = { "content-type": "application/json", "access-control-allow-origin": "*" }
    }
}

/**
 * Success Response class
 */
export class SuccessResponse extends BaseResponse {

    public body: any | null;

    constructor(statusCode: number = 200, body: any = null) {
        super(statusCode);
        this.body = body != null ? JSON.stringify(body) : null;
    }
}

/**
 * Failed Response class
 */
export class FailedResponse extends BaseResponse {

    public body: any | null;

    constructor(statusCode: number = 500, message: string = "generic error", description: string | null = null) {
        super(statusCode);
        this.body = JSON.stringify({
            fault: {
                code: statusCode,
                message: message,
                description: description
            }
        })
    }
}