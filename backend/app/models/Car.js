const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: ["SEDAN", "SUV", "VAN"]
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;