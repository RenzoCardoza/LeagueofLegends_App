const utilities = require("../utilities/utilities");
const baseController = {};

baseController.buildHomePage = async function (req, res){
    const nav = await utilities.getNav();
    //send the response to the client
    res.render('index', {
        title: "Home",
        nav: nav,
        errors: null,
    });
};

module.exports = baseController;