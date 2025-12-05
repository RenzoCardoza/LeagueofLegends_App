const utilities = require("../utilities/utilities");
const accountController = {};

accountController.buildLogin = async function (req, res){
    try{
        //get the navigation bar from the utilities
        const nav = await utilities.getNav();
        res.render('./account/login', {
            title: 'Login',
            nav,
            errors: null
        })
    } catch (err){
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

module.exports = accountController;