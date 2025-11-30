//require statements for the router
const express = require('express');
const router = new express.Router();
const contactController = require('../controllers/contactController');
const utilities = require('../utilities/utilities');

//Set up routes for the page contact

//main route 
router.get('/', utilities.handleErrors());

module.exports = router;