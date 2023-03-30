require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment/moment');
const bodyParser = require('body-parser');
const { result } = require('underscore');
const mongoose = require("mongoose");

const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect(process.env.MONGODB_URI,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   }
// // );
// mongoose.connect(process.env.MONGODB_URI);
// const connection = mongoose.connection;

// connection.on('error', console.error.bind(console, 'connection error:'));

app.post('/courses', (req,res) => {
    const username = req.body.user;

    // connection.once('open', async () => {
    //     const collection = connection.db.collection("people");
    //     collection.find({username: username}).toArray((err, data) => {
    //         res.json({courses: data.courses});
    //     })
    // })
    
    res.json({courses: "1 2 3 4"})

})


app.post('/login', (req, res) => {
    const data = req.body;
    const user = data.user;
    const pass = data.pass;
    // console.log("called");
    
    // const collection = connection.collection("people");
    // const docs = collection.find({username: user}).exec();

    res.json({valid: true});


});

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World' });
});

app.get('/api', (req, res) => {
    res.json({ msg: 'Hello from captain-america' });
});

app.get('/api/*', (req, res) => {
    res.json({ msg: 'hello this is /api/' });
});

app.listen(process.env.HOST_PORT);

module.exports = app;
