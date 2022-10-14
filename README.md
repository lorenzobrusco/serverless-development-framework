# Serverless Development Framework

![Build Status](https://github.com/lorenzobrusco/serverless-development-framework/imgs/github-badge.svg)
![Build Status](https://github.com/lorenzobrusco/serverless-development-framework/imgs/license.svg)

**The Serverless Development Framework** – Build applications on [AWS](https://aws.amazon.com/) using Lambda Api Gateway and other next-gen cloud services, that auto-scale and only charge you when they run. This lowers the total cost of running and operating your apps, enabling you to build more and manage less.

The Serverless Development Framework is used to transform your lambda functions in **Application Development Framework** style.

**Nano Service** should be a very atomic service.
The mainly benefits is to limit the [cold start](https://aws.amazon.com/it/blogs/compute/operating-lambda-performance-optimization-part-1/) for each lambda.

<p align="center">
  <img alt="Cold Start Time per language" src="https://github.com/lorenzobrusco/serverless-development-framework/imgs/cold_start_runtime.jpg" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Cold Start Time per size" src="https://github.com/lorenzobrusco/serverless-development-framework/imgs/cold_start_size.jpg" width="45%">
</p>

Another very important library that you cloud integrate with **ASDF** is [webpack](https://webpack.js.org/) that allow us to reduce drastically the zip size.

### Architecture Example
<p align="center">
  <img alt="Architecture" src="https://github.com/lorenzobrusco/serverless-development-framework/imgs/architecture.svg" width="95%">
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

#### UserInfo [`preview`]
UserInfo Decorator, it used to extract user info from Lambda context input.

Constraints:
 It Must be used together @EventPattern 

Example:
```typescript
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
        super('UserController');
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
AWS Serverless Development Framework  is licensed under the [MIT License](./LICENSE.txt).

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.
