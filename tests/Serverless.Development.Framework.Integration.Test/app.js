"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const api_controller_test_1 = require("./controllers/api.controller.test");
const Serverless_Development_Framework_Core_1 = require("../../src/Serverless.Development.Framework.Core");
const Serverless_Development_Framework_Core_2 = require("../../src/Serverless.Development.Framework.Core");
Serverless_Development_Framework_Core_1.Injector.register(api_controller_test_1.ApiControllerTest);
/**
 * Product Handler
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
async function handler(event, context) {
    return await (0, Serverless_Development_Framework_Core_2.handlerResolver)(event, context);
}
exports.handler = handler;
//# sourceMappingURL=app.js.map