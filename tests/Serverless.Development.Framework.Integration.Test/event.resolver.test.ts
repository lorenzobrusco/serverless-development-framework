import assert = require('assert');
import * as api from './moch/api.moch';
import * as models from './moch/sqs.moch';
import * as events from './moch/custom.event.moch';
import { handler } from "./controllers/event.controller.test"

describe("[Event Controller]", () => {
    it("Consumer Success", async () => {
        let result = await handler(models.successGetSqsMessage, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });

    it("Consumer Custom Event Success", async () => {
        let result = await handler(events.event, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });


    it("Produce new Custom Event Success", async () => {
        let result = await handler(api.successProduceCustomEvent, {});
        assert.ok(result.statusCode === 200, "This shouldn't fail");
    });
});
