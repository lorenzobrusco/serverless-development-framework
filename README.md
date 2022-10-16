# Serverless Development Framework

![Build Status](https://github.com/lorenzobrusco/serverless-development-framework/blob/main/imgs//github-badge.svg)
![Build Status](https://github.com/lorenzobrusco/serverless-development-framework/blob/main/imgs//license.svg)

**The Serverless Development Framework** – Build applications on [AWS](https://aws.amazon.com/) using Lambda Api Gateway and other next-gen cloud services, that auto-scale and only charge you when they run. This lowers the total cost of running and operating your apps, enabling you to build more and manage less.

The Serverless Development Framework is used to transform your lambda functions in **Application Development Framework** style.

**Nano Service** should be a very atomic service.
The mainly benefits is to limit the [cold start](https://aws.amazon.com/it/blogs/compute/operating-lambda-performance-optimization-part-1/) for each lambda.

<p align="center">
  <img alt="Cold Start Time per language" src="https://github.com/lorenzobrusco/serverless-development-framework/blob/main/imgs//cold_start_runtime.jpg" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Cold Start Time per size" src="https://github.com/lorenzobrusco/serverless-development-framework/blob/main/imgs//cold_start_size.jpg" width="45%">
</p>

#### Webpack
A very important library that you cloud integrate with **SDF** is [webpack](https://webpack.js.org/) that allow us to reduce drastically the zip size. This reduce the time of could start because trasform all your code in just one file.
Launch the following command to install it:
```bash
npm install -g webpack webpack-cli
```
An example of webpack configuration that works with AWS lambda.

**webpack.config.js**


```javascript
const path = require('path');
const glob = require('glob');
const TerserPlugin = require("terser-webpack-plugin");

const entryArray = glob.sync('./app/index.ts');

const entryObject = entryArray.reduce((acc, item) => {
    let name = path.dirname(item.replace("app", ""))
    acc[name] = item
    return acc;
}, {});

module.exports = {
    entry: entryObject,
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader',
                exclude: ['/node_modules/', '/tests/']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: ['/node_modules/', '/tests/']
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true
                }
              })
            ]
      },
    externals: process.env.NODE_ENV === "development" ? [] : ["aws-sdk"],
    mode: process.env.NODE_ENV || "production",
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    }
};
```


#### AWS Powertools

**SDF**  integrate AWS Lambda Powertools for TypeScript provides a suite of utilities for AWS Lambda functions running on the Node.js runtime, to ease the adoption of best practices such as tracing, structured logging, custom metrics, and more.
For more details see [aws powertools](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/).


### Architecture Example
<p align="center">
  <img alt="Architecture" src="https://github.com/lorenzobrusco/serverless-development-framework/blob/main/imgs//architecture.svg" width="95%">
</p>

## Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Licensing](#licensing)

## <a name="quick-start"></a>Quick Start

### Installation

Install the `serverless development framework` CLI via NPM:

```bash
npm install serverless-development-framework
```

Note: If you don’t already have Node on your machine, [install it first](https://nodejs.org/).

### Getting started

To create your first project, you can choose different framework such as:
[sam](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html) or [serverless](https://www.serverless.com/framework/docs/tutorial) or if you prefer take a look on the sample folder.


## <a name="features"></a>Features

#### EventPattern
Function Decorator, it allows to routing the traffic from Api Gateway to a specific function.

Parameters: 
- EventType
    - EventType.Api: catch api request
    - EventType.AwsEvent: catch aws event input [`preview`]
    - EventType.CustomEvent: catch custom event [`preview`]
- Method:
    - GET | POST | PUT | DELETE | PATCH
    - S3 | SQS | SNS | ANY  [`preview`]
- Path: a string that match with resource path inside event input

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test() {}
```

#### Authorizer
Function Decorator, it allows to preauthorizer function check whether caller has the necessary authorization.

Parameters: 
- EventType
    - IdpTye.COGNITO: Claims has the cognito standard, example "cognito:groups": ["role1", "role2"]
    - IdpTye.WSO2:  Claims has the wso2 standard, example "groups": "role1,,role2"
    - IdpTye.Custom: Developer define how to extract claims from requestContext
- Authorizations: a list of roles, authorizer check that all element inside this list should be present inside claims. 

- Handler: a custom function to extraxt authorization

In order to use Authorizer the lambda event guarantee this structure:
```typescript
{
    ...
    requestContext: {
        authorizer: {
            claims: {
                aud: 'string',
                iss: 'string',
                exp: 'number',
                iat: 'number',
                sub: 'string',
                "cognito:groups": ['role_1', ... 'role_N'] # For Cognito
                "groups": 'role_1,,...,,role_N' # For Wso2
            }
        }
    }
    ...
}
```

**Hint**
Use Api Gateway to handle the authentication and delegate to your code only the authorization step.


Example:
```typescript
@Authorizer(IdpTye.COGNITO, ['test'])
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test() {}


/**
 * Custom Handle
 **/
@Authorizer(IdpTye.CUSTOM, ['test'], async (event: any) => {
    return {
        email: event?.requestContext?.authorizer?.claims?.email ?? undefined,
        roles: new Set<string>(['test'])
    }
})
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test() {}
```

#### Injector
Dependency Injection Pattern to register a new Injectable class.

Parameters: 
- Class to Inject

Example:
```typescript
Injector.register(UserController);
```

#### PathParameter
Parameter Decorator, it allows extract a specific value from path Parameter inside Lambda event input.

Constraints:
 It Must be used together @EventPattern 

Parameters: 
- id: the parameter key

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@PathParameter('id') id: string) {}
```

#### QueryParameter
QueryParameter Decorator, it allows extract a specific value from queryStringParameters inside Lambda event input.

Constraints:
 It Must be used together @EventPattern 

Parameters: 
- id: the parameter key

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@QueryParameter('var1') var1: string) {}
```

#### RequestBody
RequestBody Decorator, it allows extract the whole body inside Lambda event input.

Constraints:
 It Must be used together @EventPattern 

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@RequestBody body: any) {}
```

#### RequestHeaders
RequestHeaders Decorator, it allows extract the whole headers inside Lambda event input.

Constraints:
 It Must be used together @EventPattern 

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@RequestHeaders headers: any) {}
```

#### RequestEvent
RequestEvent Decorator, it return Lambda event input.

Constraints:
 It Must be used together @EventPattern 

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@RequestEvent event: any) {}
```

#### RequestContext
RequestContext Decorator, it return Lambda context input.

Constraints:
 It Must be used together @EventPattern 

Example:
```typescript
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@RequestContext context: any) {}
```

#### UserInfo
UserInfo Decorator, it used to extract user info from Lambda context input.

Constraints:
 It Must be used together @EventPattern and @Authorizer

Example:
```typescript
@Authorizer(IdpTye.COGNITO, [])
@EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
public function test(@UserInfo userInfo?: any) {}
```

## <a name="example"></a>Example

```typescript
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
```

```typescript
import { UserService } from "../services/user.service";
import { BaseComponent } from "serverless-development-framework";
import { EventType, Method } from "serverless-development-framework";
import { BaseResponse, SuccessResponse, FailedResponse } from "serverless-development-framework";
import { EventPattern, Injectable, RequestBody, PathParameter, UserInfo, QueryParameter } from "serverless-development-framework";


@Injectable
export class UserController extends BaseComponent {

    constructor(
        private readonly service: UserService) {
        super();
    }

    /**
     * Event Pattern to retrieve All Users
     * @param userInfo {any} - user info from token
     * @returns {BaseResponse} 
     */
    @EventPattern(EventType.Api, Method.GET, `v1/api/user/`)
    public async getAllUser(@UserInfo userInfo?: any): Promise<BaseResponse> {
        try {
            this.logger.info(`[getAllUser] Starting to retrieve all users`);
            var res = await this.service.getAllUser(userInfo);
            this.logger.info(`[getAllUser] Successfully retrieved ${2} users`);
            return new SuccessResponse(200, res);
        } catch (err: any) {
            this.logger.error(`An error occurs, stack detail: ${err}`)
            return new FailedResponse(500, err);
        }
    }

}
```
## <a name="licensing"></a>Licensing
AWS Serverless Development Framework  is licensed under the `MIT` License

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.
