const utilities = require("../utilities/utilities");
const Champion = require('../models/championModel');
const baseController = {};

baseController.buildHomePage = async function (req, res){
    try{
        //build the nav bar from the utilities
        const nav = await utilities.getNav();
        //get random popular champions
        const tagToMatch = 'Fighter';
        const count = 5;
        const championsData = await Champion.getRandomChampByTag(tagToMatch, count);
        // fill the template
        const popularChampions = await utilities.buildPopularChampions(championsData);
        //send the response to the client
        res.render('index', {
            title: "Home",
            nav: nav,
            popularChampions: popularChampions,
            errors: null,
        });
    } catch (err){
        console.log(err);
    }
};

module.exports = baseController;