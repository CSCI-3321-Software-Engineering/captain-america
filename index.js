require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment/moment');
const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());

const logins = {
    "student": { password: 123, id: "S0001"},
    "professor": { password: 123, id: "P0001"},
    "admin": { password: 123, id: "A0001"},
}

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