import assert = require('assert');
import * as models from './moch/api.moch';
import { handler } from "./controllers/api.controller.test"

describe("[User Controller]", () => {
    it("Get All User Success", async () => {
        let result = await handler(models.successGetAllUser, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });

    it("Get User Success", async () => {
        let result = await handler(models.successGetUser, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });

    it("Get User Filter Success", async () => {
        let result = await handler(models.successGetUserFilter, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });

    it("Create User Success", async () => {
        let result = await handler(models.successCreateUser, {});
        assert.ok(result.statusCode === 201, "This shouldn't fail");
    });

    it("Delete User Success", async () => {
        let result = await handler(models.successDeleteUser, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });
});
