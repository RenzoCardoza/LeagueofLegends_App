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
    grid += '</div>';
    return grid;
}

//function that would build the details for the single champion view
utilities.buildChampionBanner = async function(championData){
    //URL for the splash art of the champion
    const splashArtUrl = process.env.CHAMP_SPLASH_ART;
    //place the container for the html
    let sectionContainer = `<div class="hero" style="--hero-img: url('${splashArtUrl}${championData.name}_0.jpg')">`;
    sectionContainer += '   <div class="hero-content">';
    sectionContainer += `       <h1>${championData.name}</h1>`;
    sectionContainer += `       <h4>${championData.title}</h4>`;
    sectionContainer += `       <p>${championData.lore}</p>`;
    sectionContainer += `   </div>`;
    sectionContainer += '</div>';

    return sectionContainer;
}

//function that build the champion spells
utilities.buildChampionSpells = async function(championData){
    //url for the images of the champion spells
    const spellArtUrl = process.env.CHAMP_ABILITY_ASSETS;
    const passiveArtUrl = process.env.CHAMP_PASSIVE_ASSETS;
    //HTML Template
    let spellsContainer = '<div class="spells-container">';
    spellsContainer += `    <h1>Abilities</h1>`;
    spellsContainer += `    <div class="spellList">`;
    spellsContainer += `        <div class="spell">`;
    spellsContainer += `            <img src="${passiveArtUrl}${championData.passive.image.full}" alt="Passive Sprite">`;
    spellsContainer += `            <h4>${championData.passive.name}</h4>`;
    spellsContainer += `            <p>${championData.passive.description}</p>`;
    spellsContainer += `        </div>`;
    if (championData.spells.length > 0){
        championData.spells.forEach(spell =>{
            spellsContainer += `    <div class="spell">`;
            spellsContainer += `        <img src="${spellArtUrl}${spell.image.full}" alt="Spell Sprite">`;
            spellsContainer += `        <h4>${spell.name}</h4>`;
            spellsContainer += `        <p>${spell.description}</p>`;
            spellsContainer += `    </div>`;
            // spellsContainer += `    <p class="description">${spell.description}</p>`;
        });
    } else {
        spellsContainer += '<p>We could not find any spells</p>';
    }
    spellsContainer += `    </div>`;
    spellsContainer += '</div>';

    return spellsContainer;
}

utilities.buildChampionSkins = async function (championData){
    //URL for the splash art of the champion
    const splashArtUrl = process.env.CHAMP_SPLASH_ART;
    //place the container for the template
    let skinsContainer = '<div class="skins-container">';
    skinsContainer += ` <h1>Available Skins</h1>`;
    skinsContainer += ` <div class="images-container">`;
    if (championData.skins.length > 0){
        championData.skins.forEach(skin =>{
            skinsContainer += ` <div class="skin">`;
            skinsContainer += `     <img src="${splashArtUrl}${championData.name}_${skin.num}.jpg" alt="a Skin for ${championData.name}">`;
            skinsContainer += `     <div class="skinTitle">`;
            skinsContainer += `         <h4>${skin.name === "default" ? championData.name : skin.name}</h4>`;
            skinsContainer += `     </div>`;
            skinsContainer += ` </div>`;
        });
    } else {
        skinsContainer += `<p>There are no skins available for this Champion</p>`;
    }

    skinsContainer += `     </div>`;
    skinsContainer += `</div>`;

    return skinsContainer;
}

//solve any promises to handle errors
utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


module.exports = utilities;