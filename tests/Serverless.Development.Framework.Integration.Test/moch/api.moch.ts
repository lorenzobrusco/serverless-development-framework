export const successGetAllUser = {
    "body": null,
    "resource": null,
    "path": "/v1/api/user",
    "httpMethod": "GET",
    "pathParameters": null,
    "isBase64Encoded": true,
    "requestContext": {
        "authorizer": {
            "claims": {
                "email": "l.brusco@crif.com",
                "cognito:groups": ["role", "test"]
            }
        }
    }
}

export const successGetUser = {
    resource: '/v1/api/user',
    path: '/v1/api/user',
    httpMethod: 'GET',
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-ASN': '8884',
        'CloudFront-Viewer-Country': 'IT',
        Host: 'hghmj2ryug.execute-api.eu-central-1.amazonaws.com',
        'Postman-Token': '9f0b5557-6ff8-4f14-bc33-e84cec37ba6b',
        'User-Agent': 'PostmanRuntime/7.29.2',
        Via: '1.1 fbc8210d21f6d43d0666226a15960b78.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': 'UWmUa_E7kfSJ70Q4_AzXnyJAl0Q2psQSsXaA5l5PX7c3kDqad3OxyA==',
        'X-Amzn-Trace-Id': 'Root=1-634813e9-712c95b402343854155447b5',
        'X-Forwarded-For': '212.7.92.65, 130.176.221.173',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
        Accept: ['*/*'],
        'Accept-Encoding': ['gzip, deflate, br'],
        'CloudFront-Forwarded-Proto': ['https'],
        'CloudFront-Is-Desktop-Viewer': ['true'],
        'CloudFront-Is-Mobile-Viewer': ['false'],
        'CloudFront-Is-SmartTV-Viewer': ['false'],
        'CloudFront-Is-Tablet-Viewer': ['false'],
        'CloudFront-Viewer-ASN': ['8884'],
        'CloudFront-Viewer-Country': ['IT'],
        Host: ['hghmj2ryug.execute-api.eu-central-1.amazonaws.com'],
        'Postman-Token': ['9f0b5557-6ff8-4f14-bc33-e84cec37ba6b'],
        'User-Agent': ['PostmanRuntime/7.29.2'],
        Via: [
            '1.1 fbc8210d21f6d43d0666226a15960b78.cloudfront.net (CloudFront)'
        ],
        'X-Amz-Cf-Id': ['UWmUa_E7kfSJ70Q4_AzXnyJAl0Q2psQSsXaA5l5PX7c3kDqad3OxyA=='],
        'X-Amzn-Trace-Id': ['Root=1-634813e9-712c95b402343854155447b5'],
        'X-Forwarded-For': ['212.7.92.65, 130.176.221.173'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https']
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
        "authorizer": {
            "claims": {
                "email": "l.brusco@crif.com",
                "cognito:groups": ["role", "test"]
            }
        },
        resourceId: '5hrbpn',
        resourcePath: '/v1/api/user',
        httpMethod: 'GET',
        extendedRequestId: 'Z8gMcGXnliAFeVQ=',
        requestTime: '13/Oct/2022:13:34:33 +0000',
        path: '/uat/v1/api/user',
        accountId: '602260775887',
        protocol: 'HTTP/1.1',
        stage: 'uat',
        domainPrefix: 'hghmj2ryug',
        requestTimeEpoch: 1665668073026,
        requestId: '3a28a7a5-4a96-468f-b703-31c5feaab4e7',
        identity: {
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: '212.7.92.65',
            principalOrgId: null,
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'PostmanRuntime/7.29.2',
            user: null
        },
        domainName: 'hghmj2ryug.execute-api.eu-central-1.amazonaws.com',
        apiId: 'hghmj2ryug'
    },
    body: null,
    isBase64Encoded: false
}


export const successDeleteUser = {
    "body": null,
    "resource": null,
    "path": "/v1/api/user/lorenzo",
    "httpMethod": "DELETE",
    "pathParameters": {
        "userId": "lorenzo"
    },
    "isBase64Encoded": true,
    "requestContext": {
        "authorizer": {
            "claims": {
                "email": "l.brusco@crif.com",
                "cognito:groups": ["role", "test"]
            }
        }
    }
}

export const successGetUserFilter = {
    "body": null,
    "resource": null,
    "path": "/v1/api/user/lorenzo/filter",
    "httpMethod": "GET",
    "pathParameters": {
        "userId": "lorenzo"
    },
    "queryStringParameters": {
        "region": "eu-central-1",
        "culture": "it-IT"
    },
    "isBase64Encoded": true,
    "requestContext": {
        "authorizer": {
            "claims": {
                "email": "l.brusco@crif.com",
                "cognito:groups": ["role", "test"]
            }
        }
    }
}

export const successCreateUser = {
    "body": "{\"name\":\"lorenzo\",\"surname\":\"brusco\"}",
    "resource": null,
    "path": "/v1/api/user",
    "httpMethod": "POST",
    "isBase64Encoded": true,
    "requestContext": {
        "authorizer": {
            "claims": {
                "email": "l.brusco@crif.com",
                "cognito:groups": ["role", "test"]
            }
        }
    }
}

export const successProduceCustomEvent= {
    "body": null,
    "resource": null,
    "path": "/producer",
    "httpMethod": "POST",
    "pathParameters": null,
    "isBase64Encoded": true,
    "requestContext": {
        "authorizer": {
            "claims": {
                "email": "l.brusco@crif.com",
                "cognito:groups": ["role", "test"]
            }
        }
    }
}
