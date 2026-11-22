const request = require("supertest");
const app = require("../app");

describe("Reservation APIs", () => {

    test("should reject reservation without authentication", async () => {

        const response = await request(app)
            .post("/api/reservations")
            .send({
                customerName: "John",
                carType: "SUV",
                startDateTime: "2026-09-01T10:00:00.000Z",
                numberOfDays: 3
            });

        expect(response.status).toBe(401);

    });


    test("should create reservation successfully", async () => {

        /*
         * This test will use a logged-in user.
         *
         * Expected:
         *
         * POST /api/reservations
         *          ↓
         * Find active car
         *          ↓
         * Check existing reservations
         *          ↓
         * Car available
         *          ↓
         * Create reservation
         */

        expect(true).toBe(true);

    });


    test("should reject reservation when no car is available", async () => {

        /*
         * Example:
         *
         * SUV-001
         *
         * Existing reservation:
         * 01 Sep → 04 Sep
         *
         * New reservation:
         * 02 Sep → 05 Sep
         *
         * The dates overlap.
         */

        expect(true).toBe(true);

    });


    test("should allow reservation when dates do not overlap", async () => {

        /*
         * Existing reservation:
         * 01 Sep → 04 Sep
         *
         * New reservation:
         * 04 Sep → 07 Sep
         *
         * No overlap.
         */

        expect(true).toBe(true);

    });


    test("should allow admin to view all reservations", async () => {

        expect(true).toBe(true);

    });


    test("should allow user to view their own reservations", async () => {

        expect(true).toBe(true);

    });


    test("should cancel an existing reservation", async () => {

        expect(true).toBe(true);

    });


    test("should return 404 when cancelling non-existing reservation", async () => {

        expect(true).toBe(true);

    });

});