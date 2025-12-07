const Champion = require('../models/championModel');
const { render } = require('ejs');
const utilities = require('../utilities/utilities');

const championController = {};

// GET ALL THE DATA FROM THE MODEL
championController.getChampions = async function (req, res){
    try{
        //get all the data from the champions and sort the array to appear alphabetically
        let champions = await Champion.find();
        champions.sort((a, b) => a.name.localeCompare(b.name));
        //get the nav bar for the page
        const nav = await utilities.getNav();
        //get the grid element
        const grid = await utilities.buildChampionGrid(champions);
        //render the website to the endpoint
        res.render('./champions/championList', {
            title: 'Champion List',
            nav: nav,
            grid: grid,
            errors: null,
        });
    } catch (err) {
        console.log(err);
    }
};

//GET ALL DATA FROM 1 SPECIFIC CHAMPION
championController.getChampion = async function (req, res){
    try{
        //get the name for the champion
        const champId = req.params.id;
        //get the nav bar for the page
        const nav = await utilities.getNav();
        //get data info
        const champion = await Champion.findOne({id: champId});
        // get the containers 
        const championBanner = await utilities.buildChampionBanner(champion);
        const championSpells = await utilities.buildChampionSpells(champion);
        const championSkins = await utilities.buildChampionSkins(champion);
        // render to the endpoint
        res.render('./champions/championDetails', {
            title: `Champion Details`,
            nav: nav,
            championBanner: championBanner,
            championSpells: championSpells,
            championStats: null,
            championSkins: championSkins,
            errors: null,
        });
    } catch (err) {
        console.log(err);
    }
}

//find a champion from a search engine
championController.findFromSearch = async function (req, res, next){
    try{
        //get the nav bar for the page
        const nav = await utilities.getNav();
        //GET THE QUERY FILTER
        let {name} = req.query;
        const filter = {};
        // IF THERE IS NO PARAMETER - MOVE ON
        if (name) {
            // case insensitive search
            filter.name = { $regex: name, $options: "i"};
        }
        // get the list of champion that match the characters
        const results = await Champion.find(filter);
        if (results.length > 1) results.sort((a, b) => a.name.localeCompare(b.name));
        //build the grid 
        const grid = await utilities.buildChampionGrid(results);
        //render the appropiate page
        res.render('./champions/searchResults', {
            title: 'Search Results',
            nav,
            grid,
            errors: null
        });
    } catch (err) {
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

//POST SOMETHING TO THE DB
// If the request has several champions in the request body then Create() method will save them 
// to the DB
championController.insertChampion = async function (req, res){
    try{
        //insert a new document into the database
        const newChampion = await Champion.create(req.body);
        // send status from the API
        res.status(200).json({
            status: "success",
            message: newChampion
        });
    } catch (err) {
        //send status as the error
        res.status(400).json({
            status: "error",
            message: err
        })
    }
}

module.exports = championController;