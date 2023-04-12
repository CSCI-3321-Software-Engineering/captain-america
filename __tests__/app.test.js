require('dotenv').config();
const request = require('supertest');
const app = require('../index.js');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../schemas/user.js');
const Course = require('../schemas/course.js');


describe('API tests', () => {
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
        user = await User.create({ username: 'test', password: 'test123', userType: 'student' });
        course = await Course.create({ courseNumber: 'CSCI101', title: 'Introduction to Computer Science' });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Course.deleteMany({});
        await mongoose.connection.close();
        await mongod.stop();
    });

    describe('POST /api/userinfo', () => {
        test('returns user info', async () => {
            const res = await request(app)
                .post('/api/userinfo')
                .send({ user: user.username })
                .expect(200);

            expect(res.body.username).toBe(user.username);
            expect(res.body.userType).toBe(user.userType);
        });
    });

    describe('POST /api/getcourses', () => {
        test('returns user courses', async () => {
            const res = await request(app)
                .post('/api/getcourses')
                .send({ user: user.username, registration: false })
                .expect(200);
            expect(res.body.courses).toEqual(user.courses);
        });

        test('returns user shopping cart', async () => {
            const res = await request(app)
                .post('/api/getcourses')
                .send({ user: user.username, registration: true })
                .expect(200);

            expect(res.body.courses).toEqual(user.shoppingCart);
        });
    });

    describe('POST /api/getcourse', () => {
        test('returns course', async () => {
            const res = await request(app)
                .post('/api/getcourse')
                .send({ courseNumber: course.courseNumber })
                .expect(200);

            expect(res.body.courseNumber).toBe(course.courseNumber);
            expect(res.body.courseName).toBe(course.courseName);

            await Course.findByIdAndDelete(course._id);
        });

        test('returns 404 for nonexistent course', async () => {
            const res = await request(app)
                .post('/api/getcourse')
                .send({ courseNumber: 'nonexistent' })
                .expect(404);

            expect(res.body).toEqual({});
        });
    });

    describe('POST /api/login', () => {
        test('returns valid for correct login', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({ user: user.username, pass: user.password })
                .expect(200);

            expect(res.body.valid).toBe(true);
            expect(res.body.userType).toBe(user.userType);
        });

        test('returns invalid for incorrect login', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({ user: user.username, pass: 'incorrect' })
                .expect(200);

            expect(res.body.valid).toBe(false);
        });
    });
});
