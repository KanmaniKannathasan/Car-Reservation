const Car = require("../models/Car");

const carCltr = {};

// Get all cars
// Logged-in users and admins
carCltr.list = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json(cars);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong while fetching cars",
    });
  }
};

// Create car
// Admin only
carCltr.create = async (req, res) => {
  const body = req.body;

  try {
    const existingCar = await Car.findOne({
      registrationNumber: body.registrationNumber,
    });

    if (existingCar) {
      return res.status(409).json({
        error: "Car with this registration number already exists",
      });
    }

    const car = await Car.create({
      registrationNumber: body.registrationNumber,
      type: body.type,
      active: body.active !== undefined ? body.active : true,
    });

    res.status(201).json({
      message: "Car created successfully",
      car: car,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: err.message,
    });
  }
};

// Update car
// Admin only
carCltr.update = async (req, res) => {
  const carId = req.params.carId;
  const body = req.body;

  try {
    const car = await Car.findByIdAndUpdate(
      carId,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!car) {
      return res.status(404).json({
        error: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car updated successfully",
      car: car,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: err.message,
    });
  }
};
// Get one car
// Logged-in users and admins
carCltr.show = async (req, res) => {
  const carId = req.params.carId;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        error: "Car not found",
      });
    }

    res.status(200).json(car);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: "Invalid car ID",
    });
  }
};

// Delete car
// Admin only
carCltr.remove = async (req, res) => {
  const carId = req.params.carId;

  try {
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      return res.status(404).json({
        error: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car deleted successfully",
      car: car,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong while deleting the car",
    });
  }
};

module.exports = carCltr;