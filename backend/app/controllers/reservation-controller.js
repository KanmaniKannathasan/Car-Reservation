const Reservation = require("../models/Reservation");
const Car = require("../models/Car");

const {
    reservationValidationSchema
} = require("../validators/reservation-validator");

const reservationCltr = {};


// Find reservation based on user role
const findReservation = async (
    reservationId,
    userId,
    role
) => {

    if (role === "admin") {

        return await Reservation.findById(
            reservationId
        )
            .populate("carId")
            .populate(
                "userId",
                "name email role"
            );
    }

    return await Reservation.findOne({
        _id: reservationId,
        userId: userId
    })
        .populate("carId")
        .populate(
            "userId",
            "name email"
        );
};


// Find available car
const findAvailableCar = async (
    carType,
    startDate,
    endDate
) => {

    const cars = await Car.find({
        type: carType,
        active: true
    });

    if (cars.length === 0) {
        return null;
    }

    for (const car of cars) {

        const existingReservation =
            await Reservation.findOne({
                carId: car._id,
                status: "CONFIRMED",

                startDateTime: {  // existing start < new end AND existing end > new start
                    $lt: endDate
                },

                endDateTime: {
                    $gt: startDate
                }
            });

        if (!existingReservation) {
            return car;
        }
    }

    return null;
};


// Create reservation
reservationCltr.create = async (req, res) => {

    const body = req.body;

    const {
        error,
        value
    } = reservationValidationSchema.validate(
        body,
        {
            abortEarly: false //"Don't stop after finding the first validation error. Check the entire request and return all validation errors."
        }
    );

    if (error) {

        return res.status(400).json({
            error: error.details.map(
                err => err.message
            )
        });
    }

    try {

        const {
            customerName,
            carType,
            startDateTime,
            numberOfDays
        } = value;


        // Convert start date
        const startDate =
            new Date(startDateTime);


        // Calculate end date
        const endDate =
            new Date(startDate);

        endDate.setDate(
            endDate.getDate() + numberOfDays
        );


        // Find available car
        const availableCar =
            await findAvailableCar(
                carType,
                startDate,
                endDate
            );


        // No car available
        if (!availableCar) {

            return res.status(409).json({
                error:
                    `No ${carType} cars are available for the selected dates`
            });
        }


        // Create reservation
        const reservation =
            await Reservation.create({

                userId: req.userId,

                carId: availableCar._id,

                customerName:
                    customerName,

                carType:
                    carType,

                startDateTime:
                    startDate,

                endDateTime:
                    endDate,

                numberOfDays:
                    numberOfDays,

                status:
                    "CONFIRMED"
            });


        res.status(201).json({

            message:
                "Reservation created successfully",

            reservation:
                reservation
        });


    } catch (err) {

        console.log(err);

        res.status(500).json({
            error:
                "Something went wrong while creating reservation"
        });
    }
};


// Get all reservations
// Admin → all reservations
// User → only their reservations
reservationCltr.list = async (
    req,
    res
) => {

    try {

        let reservations;


        if (req.role === "admin") {

            reservations =
                await Reservation.find()
                    .populate(
                        "carId"
                    )
                    .populate(
                        "userId",
                        "name email role"
                    );

        } else {

            reservations =
                await Reservation.find({
                    userId: req.userId
                })
                    .populate(
                        "carId"
                    )
                    .populate(
                        "userId",
                        "name email"
                    );
        }


        res.status(200).json(
            reservations
        );


    } catch (err) {

        console.log(err);

        res.status(500).json({
            error:
                "Something went wrong while fetching reservations"
        });
    }
};


// Get one reservation
// Admin → any reservation
// User → only their reservation
reservationCltr.show = async (
    req,
    res
) => {

    const reservationId =
        req.params.reservationId;


    try {

        const reservation =
            await findReservation(
                reservationId,
                req.userId,
                req.role
            );


        if (!reservation) {

            return res.status(404).json({
                error:
                    "Reservation not found"
            });
        }


        res.status(200).json(
            reservation
        );


    } catch (err) {

        console.log(err);

        res.status(400).json({
            error:
                "Invalid reservation ID"
        });
    }
};


// Cancel reservation
// Admin → any reservation
// User → only their reservation
reservationCltr.cancel = async (
    req,
    res
) => {

    const reservationId =
        req.params.reservationId;


    try {

        const reservation =
            await findReservation(
                reservationId,
                req.userId,
                req.role
            );


        if (!reservation) {

            return res.status(404).json({
                error:
                    "Reservation not found"
            });
        }


        if (
            reservation.status ===
            "CANCELLED"
        ) {

            return res.status(400).json({
                error:
                    "Reservation is already cancelled"
            });
        }


        reservation.status =
            "CANCELLED";


        await reservation.save();


        res.status(200).json({

            message:
                "Reservation cancelled successfully",

            reservation:
                reservation
        });


    } catch (err) {

        console.log(err);

        res.status(500).json({
            error:
                "Something went wrong while cancelling reservation"
        });
    }
};


module.exports = reservationCltr;