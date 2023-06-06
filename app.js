const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
//mongoose.connect(config.database);

// Connect to the database
//mongoose.connect(config.database);

mongoose.connect(config.database,{useNewUrlParser:true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to database: ' +config.database);
}, err => {
    console.log('Error connecting to database');
});
// On connection
/*mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});*/

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port, () => {
    console.log('SEVER started on port'+port);
})