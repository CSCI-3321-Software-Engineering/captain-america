require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment/moment');
const bodyParser = require('body-parser');
const { result } = require('underscore');
const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const logins = {
    "student": "123",
    "professor": "123",
    "admin": "123"
};

app.post('/login', (req,res) => {
    const data = req.body;
    const username = data.user;
    const password = data.pass;

    const validLogin = logins[username] == password;

    res.json({result: validLogin});
});

app.get('/', (req,res) => {
    res.json({msg: 'Hello World'});
});

app.get('/api', (req,res) => {
    res.json({msg: 'Hello from captain-america'});
});

app.get('/api/*', (req,res) => {
    res.json({msg: 'hello this is /api/'});
});

app.listen(process.env.HOST_PORT, () => {
    console.log(`listening at http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`);
});