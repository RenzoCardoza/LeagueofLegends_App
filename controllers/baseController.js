const utilities = require("../utilities/utilities");
const getWeeklyChampions = require('../utilities/getFeatureChamps');
const baseController = {};

baseController.buildHomePage = async function (req, res){
    try{
        //build the nav bar from the utilities
        const nav = await utilities.getNav();
        // THIS COMMENTS WERE ANOTHER FUNCTION THAT IS USABLE ON OTHER OCCASSION
        // //get random popular champions
        // const tagToMatch = 'Fighter';
        // const count = 5;
        //this method uuses the aggreagation pipeline to fetch 4 random but related documents
        // const championsData = await Champion.getRandomChampByTag(tagToMatch, count);
        // fill the template
        const championsData = await getWeeklyChampions();
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