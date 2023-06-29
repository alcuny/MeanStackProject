const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session');
const passportConfig = require('./config/passport'); // Path to your Passport configuration file

// Connect to the database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database: ' + config.database);
  })
  .catch(err => {
    console.log('Error connecting to database: ' + err);
  });

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Configure express-session middleware
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
passportConfig(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});