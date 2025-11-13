const utilities = {};

utilities.getNav = async function (req, res, next){
    let nav = '<ul class="navBar">';
    nav += '<a href="/" title="Home"><li>Home</li></a>';
    nav += '<a href="/champions/" title="Champions"><li>Champions</li></a>'
    nav += '<a href="/contact/" title="Contact Me"><li>Contact</li></a>'
    return nav;
}

utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


module.exports = utilities;