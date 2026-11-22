const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCltr = {};

// Register
userCltr.register = async (req, res) => {
  const body = req.body;

  try {
    const userPresent = await User.findOne({ email: body.email });

    if (userPresent) {
      return res.status(400).json({
        error: "Email already taken",
      });
    }

    const user = new User(body);

    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(body.password, salt);

    user.password = hashPassword;

    // First registered user becomes admin
    const usersCount = await User.countDocuments();

    if (usersCount === 0) {
      user.role = "admin";
    }

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong!!!",
    });
  }
};

// Login
userCltr.login = async (req, res) => {

  const body = req.body;

  try {

    const userPresent = await User.findOne({
      email: body.email,
    });

    // User does not exist
    if (!userPresent) {

      return res.status(400).json({
        error: "Invalid email or password",
      });

    }


    // Check password
    const isPasswordMatch = await bcryptjs.compare(
      body.password,
      userPresent.password
    );


    // Password is incorrect
    if (!isPasswordMatch) {

      return res.status(400).json({
        error: "Invalid email or password",
      });

    }


    // JWT data
    const tokenData = {
      userId: userPresent._id,
      role: userPresent.role,
    };


    // Generate JWT
    const token = jwt.sign(
      tokenData,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    // Successful login
    res.status(200).json({

      message: "Login successful",

      token: token,

      user: {
        id: userPresent._id,
        name: userPresent.name,
        email: userPresent.email,
        role: userPresent.role,
      },

    });


  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Something went wrong!!!",
    });

  }
};

// Get logged-in user's account
userCltr.account = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "_id name email role"
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong!!!",
    });
  }
};

// Get all users
// Admin only
userCltr.list = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id name email role" //// gives only id name  email and role
    );

    res.status(200).json(users);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong!!!",
    });
  }
};

// Delete user
// Admin only
userCltr.remove = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (userId === req.userId.toString()) {
      return res.status(400).json({
        error: "Admin cannot delete their own account",
      });
    }

    const user = await User.findOneAndDelete({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Something went wrong!!!",
    });
  }
};

module.exports = userCltr;