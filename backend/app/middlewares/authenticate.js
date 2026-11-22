const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {

    // Get token from request header
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            error: "Token not provided",
        });
    }

    try {

        // Verify token
        const tokenData = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("token data", tokenData);

        req.userId = tokenData.userId;

        // Store user role for authorization
        req.role = tokenData.role;

        next();

    } catch (err) {
        return res.status(401).json({
            error: err.message,
        });
    }
};

module.exports = authenticateUser;