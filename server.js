//Require Statements
const express = require('express');
const dotenv = require('dotenv').config();
const static = require('./routes/static');
const utilities = require('./utilities/utilities');
const baseController = require('./controllers/baseController');
const bodyParser = require('body-parser');
const championRoutes = require('./routes/championRoutes');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// APP or Server to recieve requests
const app = express();



/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout") //not at views root

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// startup the database
mongoose.connect(process.env.MONGODB_URL, {dbName: "leagueofLegends"}).then(() => {console.log('Connection successful!')}).catch(err =>console.log('Error while connecting the database'));

// routes
app.use(static);
app.get('/', utilities.handleErrors(baseController.buildHomePage));
app.use('/champions', championRoutes);
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

//server start and listening
app.listen(port, () =>{
    console.log(`app listening on ${host}:${port}`);
})