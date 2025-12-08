//require statements for the router
const express = require('express');
const router = new express.Router();
const championController = require('../controllers/championController');
const utilities = require('../utilities/utilities');

//Set up routes for the Champion directory

// search engine for finding champions 
router.get(
    '/search', 
    utilities.handleErrors(championController.findFromSearch)
);

// main route - this will build the view for all the champions
router.get(
    '/', 
    utilities.handleErrors(championController.getChampions)
);
// route to post any new champion to the DB
router.post(
    '/', 
    utilities.handleErrors(championController.insertChampion)
);
// route to update (patch)
router.patch(
    '/:id',
    utilities.handleErrors(championController.updateChampion)
);
// route champion details
router.get(
    '/:id', 
    utilities.handleErrors(championController.getChampion)
);
// route to delete
router.delete(
    '/:id',
    utilities.handleErrors(championController.deleteOneChampion)
)


module.exports = router;