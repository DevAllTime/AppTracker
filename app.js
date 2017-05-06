/**
 * Created by Sam-Mac on 4/10/17.
 */

var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');    // Parses request body
var cors = require('cors');         // Request to api from different domain name
var passport = require('passport');
var mongoose = require('mongoose');

const port = process.env.PORT || 8080;
// MONGOOSE connection
const config = require('./config/database');
//From the config import we are connecting to the database from the config-database.js file.
mongoose.connect(config.database);
// Finding out if the database is connected using a simple mongoose.connection.on()
mongoose.connection.on('connected', () => {
   console.log("Connected to the database" + config.database);
});
//if there is any error we are notified with the error
mongoose.connection.on('error', (err) => {
    console.log("Connected to the database" + err);
});

//EXPRESS server running
var app = express();


const users = require('./routes/users');
//MIDDLEWARES
//Cors Middleware
app.use(cors());

//Static Files - this will call the index.html when the user logs into the localhost:3000
app.use(express.static(path.join(__dirname,'/public')));
//Body parser middleware
app.use(bodyparser.json())
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
//Index Route
app.get('/',(request,response) => {
    response.send('Invalid Endpoint');
});

app.get('*',(request,response) => {
    response.sendFile(path.join(__dirname,'/public/index.html'));
});


app.listen(port,() => {
    console.log('Server listening on' + port);
});
