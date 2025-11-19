const dotenv = require('dotenv').config();

const utilities = {};

// function that holds the nav bar ands get called with every render function
utilities.getNav = async function (req, res, next){
    let nav = '<ul class="navBar">';
    nav += '<a href="/" title="Home" class="navigation"><li>Home</li></a>';
    nav += '<a href="/champions/" title="Champions" class="navigation"><li>Champions</li></a>';
    nav += '<a href="/contact/" title="Contact Me" class="navigation"><li>Contact</li></a>';
    return nav;
}

// function that builds the grid with the data 
utilities.buildChampionGrid = async function(data){
    const splashImagesUrl = process.env.CHAMP_IMGS_DATA;
    //place the container for the data for the champions
    let grid = '<div class="championGrid">';
    if(data.length > 0){
        //For each champion build a new card
        data.forEach(champion => {
            grid += `<a href="/champions/${champion.id}" title="View details about ${champion.name}" class="linkChampCard">`
            grid += '<div class="championCard">';
            grid += `   <img src="${splashImagesUrl}${champion.id}_0.jpg" alt="Spash Art for ${champion.name}">`
            grid += `   <h4 class="champCardName">`;
            grid += `       ${champion.name}`;
            grid += `   </h4>`;
            grid += `</div></a>`;
        });
    } else {
        grid += '<p class="notice">Sorry, we could not find any champions</p>';
    } 
    grid += '</div>'
    return grid;
}

//function that would build the details for the single champion view
utilities.buildChampionDetails = async function(championData){
    
}

utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


module.exports = utilities;