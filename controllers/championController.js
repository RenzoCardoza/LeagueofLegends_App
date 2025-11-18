const Champion = require('../models/championModel');
const { render } = require('ejs');
const utilities = require('../utilities/utilities');

const championController = {};

// GET ALL THE DATA FROM THE MODEL
championController.getChampions = async function (req, res){
    try{
        const champions = await Champion.find();

        res.status(200).json({
            status: "success",
            results: champions.lenght,
            data: {
                champions
            } 
    }
    )} catch (err) {
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