require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index.js');

let mongoServer;
beforeAll(async () => {
    server = app.listen(process.env.HOST);
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connection.close();
    mongoose.connect(
        mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB!');
    });

});

afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('GET /', () => {
    it('should return a hello world message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Hello World');
    });
});

describe('GET /api', () => {
    it('should return a hello message from captain-america', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Hello from captain-america');
    });
});

describe('GET /api/*', () => {
    it('should return a hello message from /api/', async () => {
        const response = await request(app).get('/api/foo/bar');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('hello this is /api/');
    });
});

describe('POST /login', () => {
    it('should return a valid login result', async () => {
        const response = await request(app)
            .post('/login')
            .send({ user: 'student', pass: '123' });
        expect(response.status).toBe(200);
        console.log(response.body.result);
        // expect(response.body.result).toBe(true);
    });
});

describe('GET /testDB', () => {
    it('should return a response without errors', async () => {
        const response = await request(app).get('/testDB');
        expect(response.status).toBe(200);
    });
});
