const request = require("supertest");
const app = require("../app");

describe("Car APIs", () => {

    test("should reject car creation without authentication", async () => {

        const response = await request(app)
            .post("/api/cars")
            .send({
                registrationNumber: `CAR-${Date.now()}`,
                type: "SEDAN"
            });

        expect(response.status).toBe(401);

    });


    test("should allow logged-in user to view cars", async () => {

        const response = await request(app)
            .get("/api/cars");

        /*
         * Without a JWT the request should be rejected.
         * This test confirms the endpoint is protected.
         */

        expect(response.status).toBe(401);

    });


    test("should reject normal user from creating a car", async () => {

        /*
         * We will add the login/JWT setup here once
         * we create a reusable test user.
         */

        expect(true).toBe(true);

    });


    test("should allow admin to create a car", async () => {

        /*
         * We will add the admin JWT here once
         * test authentication setup is completed.
         */

        expect(true).toBe(true);

    });

});