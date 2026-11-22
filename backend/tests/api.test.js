const request = require("supertest");
const app = require("../app");

describe("API Health Check", () => {

    test("GET /api should return API running message", async () => {

        const response = await request(app)
            .get("/api");

        expect(response.status).toBe(200);

        expect(response.body.message)
            .toBe("Car Reservation API is running");

    });

});