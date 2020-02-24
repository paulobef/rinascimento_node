require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Cors = require('cors');
const logger = require('morgan');
const db = require('./config/database.js');
const user = require('./routes/admin/user');
const auth = require('./routes/auth');
const passport = require('./config/strategies');
const { transporter } = require('./config/smtp');
const path = require('path');



// Database testing and syncing
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
   // console.log('Drop and Resync with { force: true }');
});



// middleware
app.use(helmet());
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// public routes
app.use('/auth', auth);

// private routes
app.use('/user', passport.authenticate('jwt', { session: false }), user);



// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something looks wrong :( !!!"});
});

// Create a Server
const server = app.listen(8081, function () {

    const host = server.address().address;
    const port = server.address().port;

    console.log("App listening at http://" + host + ":" + port)
});