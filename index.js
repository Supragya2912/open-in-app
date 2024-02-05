const express = require('express');
const app = express();
const PORT = 8080;
const connectToDB = require('./db');


connectToDB();


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, (req, res) => {
    console.log( `Server is running on port ${PORT}`);
});
