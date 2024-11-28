// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../app"); // Import your app
// require("dotenv").config();

// beforeAll(async () => {
//   jest.spyOn(console, "log").mockImplementation(() => {});

//   // Ensure connection to the test database
//   const dbUri = process.env.TEST_DB_URI || process.env.DB_URI;
//   await mongoose.connect(dbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   console.log("Test database connected");
// });

// afterAll(async () => {
//   // Restore console logs after tests
//   jest.restoreAllMocks();

//   // Disconnect the database after tests
//   await mongoose.disconnect();
// });

// beforeEach(async () => {
//   if (mongoose.connection.readyState === 0) {
//     const dbUri = process.env.TEST_DB_URI;
//     await mongoose.connect(dbUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   }

//   // Clean up test data before each test
//   const collections = await mongoose.connection.db.collections();
//   for (const collection of collections) {
//     await collection.deleteMany({});
//   }
// });

// describe("RBAC User Routes", () => {
//   let adminToken;
//   let userToken;

//   it("should register a new user", async () => {
//     const res = await request(app)
//       .post("/api/users/register")
//       .send({
//         name: "John Doe",
//         email: "john@example.com",
//         password: "password123",
//         role: "User",
//       });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.message).toBe("User registered successfully");
//   });

//   it("should register a new admin", async () => {
//     const res = await request(app)
//       .post("/api/users/register")
//       .send({
//         name: "Admin User",
//         email: "admin@example.com",
//         password: "adminpass",
//         role: "Admin",
//       });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.message).toBe("User registered successfully");
//   });

//   it("should log in as a user", async () => {
//     const res = await request(app)
//       .post("/api/users/login")
//       .send({
//         email: "john@example.com",
//         password: "password123",
//       });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.token).toBeDefined();
//     userToken = res.body.token;
//   });

//   it("should log in as an admin", async () => {
//     const res = await request(app)
//       .post("/api/users/login")
//       .send({
//         email: "admin@example.com",
//         password: "adminpass",
//       });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.token).toBeDefined();
//     adminToken = res.body.token;
//   });

//   it("should not allow a user to access admin content", async () => {
//     const res = await request(app)
//       .get("/api/users/admin")
//       .set("Authorization", `Bearer ${userToken}`);
//     expect(res.statusCode).toEqual(401);
//     expect(res.body.message).toBe("Only Admin is Authorized!");
//   });

//   it("should allow an admin to access admin content", async () => {
//     const res = await request(app)
//       .get("/api/users/admin")
//       .set("Authorization", `Bearer ${adminToken}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.message).toBe("Admin Content Accessed");
//   });

//   it("should allow a user to access user content", async () => {
//     const res = await request(app)
//       .get("/api/users/user")
//       .set("Authorization", `Bearer ${userToken}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.message).toBe("User Content Accessed");
//   });

//   it("should allow an admin to access user content", async () => {
//     const res = await request(app)
//       .get("/api/users/user")
//       .set("Authorization", `Bearer ${adminToken}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.message).toBe("User Content Accessed");
//   });

//   it("should retrieve all users (Admin Only)", async () => {
//     const res = await request(app)
//       .get("/api/users")
//       .set("Authorization", `Bearer ${adminToken}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });

//   it("should not allow a user to retrieve all users", async () => {
//     const res = await request(app)
//       .get("/api/users")
//       .set("Authorization", `Bearer ${userToken}`);
//     expect(res.statusCode).toEqual(401);
//     expect(res.body.message).toBe("Only Admin is Authorized!");
//   });
// });
