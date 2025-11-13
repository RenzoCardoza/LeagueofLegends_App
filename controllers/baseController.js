const utilities = require("../utilities/utilities");
const baseController = {};

baseController.buildHomePage = async function (req, res){
    const nav = await utilities.getNav();
    //here will be the nav later on
    res.render('index', {
        title: "Home",
        nav: nav,
        errors: null,
    });
};

module.exports = baseController;