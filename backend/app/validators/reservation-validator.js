const Joi = require("joi");

const reservationValidationSchema = Joi.object({
    customerName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    carType: Joi.string()
        .valid("SEDAN", "SUV", "VAN")
        .required(),

    startDateTime: Joi.date()
        .iso()
        .required(),

    numberOfDays: Joi.number()
        .integer()
        .min(1)
        .required()
});

module.exports = {
    reservationValidationSchema
};