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

championController.getChampion = async function (req, res){
    try{
        const champion = await Champion.findOne({ name: req.params.name});

        res.status(200).json({
            status: 'success',
            message: champion
        });
    } catch (err) {
        
    }
}

//POST SOMETHING TO THE DB
// If the request has several champions in the request body then Create() method will save them 
// to the DB
championController.insertChampion = async function (req, res){
    try{
        //insert a new document into the database
        const newChampion = await Champion.create(req.body);
        
        res.status(200).json({
            status: "success",
            message: newChampion
        });

    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err
        })
    }
}

module.exports = championController;