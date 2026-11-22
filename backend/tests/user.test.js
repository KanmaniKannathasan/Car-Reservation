const request = require("supertest");
const app = require("../app");
const User = require("../app/models/User");

describe("User APIs", () => {

    test("should register a new user", async () => {

        const email = `user${Date.now()}@gmail.com`;

        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "Test User",
                email: email,
                password: "Password@123"
            });

        expect(response.status).toBe(201);

        expect(response.body.message)
            .toBe("User registered successfully");

        expect(response.body.user)
            .toHaveProperty("id");

        expect(response.body.user.email)
            .toBe(email);

    });


    test("should reject duplicate email", async () => {

        const email = `duplicate${Date.now()}@gmail.com`;

        await request(app)
            .post("/api/users/register")
            .send({
                name: "Test User",
                email: email,
                password: "Password@123"
            });

        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "Another User",
                email: email,
                password: "Password@123"
            });

        expect(response.status).toBe(400);

        expect(response.body.error)
            .toBe("Email already taken");

    });


    test("should login and return JWT token", async () => {

        const email = `login${Date.now()}@gmail.com`;
        const password = "Password@123";

        await request(app)
            .post("/api/users/register")
            .send({
                name: "Login User",
                email: email,
                password: password
            });

        const response = await request(app)
            .post("/api/users/login")
            .send({
                email: email,
                password: password
            });

        expect(response.status).toBe(200);

        expect(response.body)
            .toHaveProperty("token");

        expect(typeof response.body.token)
            .toBe("string");

    });


    test("should reject account access without JWT token", async () => {

        const response = await request(app)
            .get("/api/users/account");

        expect(response.status).toBe(401);

    });
    //authentication test
test("should reject login with invalid password", async () => {

    const email = `invalid${Date.now()}@gmail.com`;
    const password = "Password@123";

    // Register user
    await request(app)
        .post("/api/users/register")
        .send({
            name: "Invalid Password User",
            email: email,
            password: password
        });

    // Login with wrong password
    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: email,
            password: "WrongPassword@123"
        });

    expect(response.status).toBe(400);

    expect(response.body.error)
        .toBe("Invalid email or password");
});


test("should reject login with invalid email", async () => {

    const response = await request(app)
        .post("/api/users/login")
        .send({
            email: `doesnotexist${Date.now()}@gmail.com`,
            password: "Password@123"
        });

    expect(response.status).toBe(400);

    expect(response.body.error)
        .toBe("Invalid email or password");
});


test("should allow authenticated user to access account", async () => {

    const email = `account${Date.now()}@gmail.com`;
    const password = "Password@123";

    // Register
    await request(app)
        .post("/api/users/register")
        .send({
            name: "Account User",
            email: email,
            password: password
        });

    // Login
    const loginResponse = await request(app)
        .post("/api/users/login")
        .send({
            email: email,
            password: password
        });

    const token = loginResponse.body.token;

    // Access account
    const response = await request(app)
        .get("/api/users/account")
        .set("Authorization", token);

    expect(response.status).toBe(200);

    expect(response.body.email)
        .toBe(email);

    expect(response.body)
        .toHaveProperty("name");

    expect(response.body)
        .toHaveProperty("role");
});
test("should reject invalid JWT token", async () => {

    const response = await request(app)
        .get("/api/users/account")
        .set(
            "Authorization",
            "invalid-token"
        );

    expect(response.status).toBe(401);

});
/// normal user shouldnot access admin api

test("should deny normal user from accessing admin API", async () => {

    const email = `normal${Date.now()}@gmail.com`;
    const password = "Password@123";

    // Register user
    await request(app)
        .post("/api/users/register")
        .send({
            name: "Normal User",
            email: email,
            password: password
        });

    // Login
    const loginResponse = await request(app)
        .post("/api/users/login")
        .send({
            email: email,
            password: password
        });

    const token = loginResponse.body.token;

    // Try admin API
    const response = await request(app)
        .get("/api/users/all")
        .set("Authorization", token);

    expect(response.status).toBe(403);

    expect(response.body.error)
        .toBe("Access Denied.");
});
test("should allow admin to access admin API", async () => {

    const email = `admin${Date.now()}@gmail.com`;
    const password = "Admin123";

     
    // STEP 1: Register a test user
    

    const registerResponse = await request(app)
        .post("/api/users/register")
        .send({
            name: "Test Admin",
            email: email,
            password: password
        });

    expect(registerResponse.status).toBe(201);


    
    // STEP 2: Find the user in MongoDB
    

    const user = await User.findOne({
        email: email
    });

    expect(user).not.toBeNull();


    // STEP 3: Change role to admin
   

    user.role = "admin";

    await user.save();

    // STEP 4: Login as admin
  

    const loginResponse = await request(app)
        .post("/api/users/login")
        .send({
            email: email,
            password: password
        });

    expect(loginResponse.status).toBe(200);

    expect(loginResponse.body)
        .toHaveProperty("token");

    const token = loginResponse.body.token;


   
    // STEP 5: Access admin API
    

    const response = await request(app)
        .get("/api/users/all")
        .set("Authorization", token);


    // STEP 6: Verify authorization
    
    expect(response.status).toBe(200);

    expect(Array.isArray(response.body))
        .toBe(true);
});

});