const express = require('express');
const app = express();
const PORT = 8080;
const connectToDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


connectToDB();
app.use(express.json());
app.use(bodyParser.json());

app.use(
    cors({
        origin: 'http://localhost:3000',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', routes);
app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
  });


app.listen(PORT, (req, res) => {
    console.log( `Server is running on port ${PORT}`);
});
