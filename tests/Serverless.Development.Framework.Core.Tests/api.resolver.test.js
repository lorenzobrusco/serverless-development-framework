"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Serverless_Development_Framework_Core_1 = require("../../src/Serverless.Development.Framework.Core");
const models = __importStar(require("./moch/api.moch"));
describe("[User Controller]", () => {
    it("Get All User Success", async () => {
        let result = await (0, Serverless_Development_Framework_Core_1.handlerResolver)(models.successGetAllUser, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });
    it("Get User Success", async () => {
        let result = await (0, Serverless_Development_Framework_Core_1.handlerResolver)(models.successGetUser, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });
    it("Get User Filter Success", async () => {
        let result = await (0, Serverless_Development_Framework_Core_1.handlerResolver)(models.successGetUserFilter, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });
    it("Create User Success", async () => {
        let result = await (0, Serverless_Development_Framework_Core_1.handlerResolver)(models.successCreateUser, {});
        assert.ok(result.statusCode === 201, "This shouldn't fail");
    });
    it("Delete User Success", async () => {
        let result = await (0, Serverless_Development_Framework_Core_1.handlerResolver)(models.successDeleteUser, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });
});
//# sourceMappingURL=api.resolver.test.js.map