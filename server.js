//Require Statements
const express = require('express');
const dotenv = require('dotenv').config();
const static = require('./routes/static');
const utilities = require('./utilities/utilities');
const baseController = require('./controllers/baseController');
const expressLayouts = require('express-ejs-layouts');

// APP or Server to recieve requests
const app = express();

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout") //not at views root

// routes
app.use(static);
app.get('/', utilities.handleErrors(baseController.buildHomePage));
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