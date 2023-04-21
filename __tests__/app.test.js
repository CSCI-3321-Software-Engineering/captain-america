require("dotenv").config();
const request = require("supertest");
const app = require("../index.js");
const {
  MongoMemoryServer,
} = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../schemas/user.js");
const Course = require("../schemas/course.js");

describe("API tests", () => {
  let mongod;
  let user;
  let course;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connection.close();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // create a test user
    user = await User.create({
      username: "test",
      password: "test123",
      userType: "student",
    });
    course = await Course.create({
      courseNumber: "CSCI101",
      title: "Introduction to Computer Science",
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Course.deleteMany({});
    await mongoose.connection.close();
    await mongod.stop();
  });

  describe("POST /api/userinfo", () => {
    test("returns user info", async () => {
      const res = await request(app)
        .post("/api/userinfo")
        .send({ user: user.username })
        .expect(200);

      expect(res.body.username).toBe(user.username);
      expect(res.body.userType).toBe(user.userType);
    });

    test("returns 400 for missing user field", async () => {
      const res = await request(app)
        .post("/api/userinfo")
        .send({})
        .expect(400);
      expect(res.body.error).toEqual("User parameter missing in request");
    });
  });

  describe("POST /api/getcourses", () => {
    test("returns user courses", async () => {
      const res = await request(app)
        .post("/api/getcourses")
        .send({ user: user.username, registration: false })
        .expect(200);
      expect(res.body.courses).toEqual(user.courses);
    });

    test("returns user shopping cart", async () => {
      const res = await request(app)
        .post("/api/getcourses")
        .send({ user: user.username, registration: true })
        .expect(200);

      expect(res.body.courses).toEqual(user.shoppingCart);
    });

    test("returns 400 for missing user field", async () => {
      const res = await request(app)
        .post("/api/getcourses")
        .send({ registration: false })
        .expect(400);
      expect(res.body.error).toEqual(
        "User parameter missing in request"
      );
    });

    test("returns 400 for missing registration field", async () => {
      const res = await request(app)
        .post("/api/getcourses")
        .send({ user: user.username })
        .expect(400);

      expect(res.body.error).toEqual(
        "Registration parameter missing in request"
      );
    });
  });

  describe("POST /api/getcourse", () => {
    test("returns course", async () => {
      const res = await request(app)
        .post("/api/getcourse")
        .send({ courseNumber: course.courseNumber })
        .expect(200);

      expect(res.body.courseNumber).toBe(
        course.courseNumber
      );
      expect(res.body.courseName).toBe(course.courseName);
    });

    test("returns invalid for nonexistent course", async () => {
      const res = await request(app)
        .post("/api/getcourse")
        .send({ courseNumber: "nonexistent" })
        .expect(401);

      expect(res.body.error).toEqual("Course not found");
    });
  });

  describe("POST /api/login", () => {
    test("returns valid for correct login", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({ user: user.username, pass: user.password })
        .expect(200);

      expect(res.body.userType).toBe(user.userType);
    });

    test("returns invalid for incorrect login", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({ user: user.username, pass: "incorrect" })
        .expect(401);

      expect(res.body.error).toBe("User not found");
    });

    test("returns 400 for missing user field", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({ pass: user.password })
        .expect(400);

      expect(res.body.error).toEqual("User parameter missing in request");
    });

    test("returns 400 for missing pass field", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({ user: user.username })
        .expect(400);

      expect(res.body.error).toEqual("Password parameter missing in request");
    });

    test("returns invalid for non-existent user", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({ user: "", pass: user.password })
        .expect(401);
      expect(res.body.error).toBe("User not found");
    });
  });
});
