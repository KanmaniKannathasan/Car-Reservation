const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
   userId: {
  type: mongoose.Schema.Types.ObjectId, //ObjectId is not the datatype of js whereas it is datatype of mongodb 
  // (mongoose is the connector for mongodb) and this line is used to store the user info(like foreign key to connect with the user model) who is creating the record 

  ref: "User",
  required: true, // later to true once authetication implemented
},

    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    carType: {
      type: String,
      required: true,
      enum: ["SEDAN", "SUV", "VAN"],
    },

    startDateTime: {
      type: Date,
      required: true,
    },

    endDateTime: {
      type: Date,
      required: true,
    },

    numberOfDays: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;