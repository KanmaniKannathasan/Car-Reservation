const mongoose = require("mongoose");

require("dotenv").config();

beforeAll(async () => { //Before running the tests, connect to the test database.

    await mongoose.connect(process.env.TEST_DB_URL);

});

afterAll(async () => {

    await mongoose.connection.dropDatabase();

    await mongoose.connection.close();

});