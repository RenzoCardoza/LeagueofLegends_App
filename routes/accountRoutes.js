//require statements for the router
const express = require('express');
const router = new express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities/utilities');

//Set up routes for the page contact

//login route
router.get('/login', utilities.handleErrors(accountController.buildLogin));

module.exports = router;