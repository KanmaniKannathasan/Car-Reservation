const express = require("express");
const cors = require("cors");
require("dotenv").config();

const carCltr = require("./app/controllers/car-controller");
const userCltr = require("./app/controllers/user-controller");
const reservationCltr = require("./app/controllers/reservation-controller");

const authenticateUser = require("./app/middlewares/authenticate");
const authorizeUser = require("./app/middlewares/authorize");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Car Reservation API is running"
    });
});

// User APIs
app.post("/api/users/register", userCltr.register);
app.post("/api/users/login", userCltr.login);
app.get("/api/users/account", authenticateUser, userCltr.account);
app.get("/api/users/all", authenticateUser, authorizeUser(["admin"]), userCltr.list);
app.delete("/api/users/:userId", authenticateUser, authorizeUser(["admin"]), userCltr.remove);

// Car APIs
app.get("/api/cars", authenticateUser, carCltr.list);
app.get("/api/cars/:carId", authenticateUser, carCltr.show);
app.post("/api/cars", authenticateUser, authorizeUser(["admin"]), carCltr.create);
app.put("/api/cars/:carId", authenticateUser, authorizeUser(["admin"]), carCltr.update);
app.delete("/api/cars/:carId", authenticateUser, authorizeUser(["admin"]), carCltr.remove);

// Reservation APIs
app.post("/api/reservations", authenticateUser, reservationCltr.create);
app.get("/api/reservations", authenticateUser, reservationCltr.list);
app.get("/api/reservations/:reservationId", authenticateUser, reservationCltr.show);
app.patch("/api/reservations/:reservationId/cancel", authenticateUser, reservationCltr.cancel);

module.exports = app;