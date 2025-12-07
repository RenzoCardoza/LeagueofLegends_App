const dotenv = require('dotenv').config();

const utilities = {};

// function that holds the nav bar ands get called with every render function
utilities.getNav = async function (req, res, next){
    let nav = '<ul class="navBar">';
    nav += '<a href="/" title="Home" class="navigation"><li>Home</li></a>';
    nav += '<a href="/champions/" title="Champions" class="navigation"><li>Champions</li></a>';
    nav += '<a href="/account/login" title="Login" class="navigation" id="loginBtn"><li>Login</li></a>';
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
    let sectionContainer = `<div class="background-map"></div>`;
    sectionContainer += `<div class="hero" style="--hero-img: url('${splashArtUrl}${championData.id}_0.jpg')">`;
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
    const keybinds = ["Q", "W", "E", "R"];
    //HTML Template
    let spellsContainer = '<div class="spells-container">';
    spellsContainer += `    <h1>Abilities</h1>`;
    spellsContainer += `    <div class="imgs-desc">`;
    spellsContainer += `    <div class="spellList">`;
    spellsContainer += `        <div class="spell" data-index="-1">`;
    spellsContainer += `            <img src="${passiveArtUrl}${championData.passive.image.full}" alt="Passive Sprite">`;
    spellsContainer += `            <span class="keybind-label">Passive</span>`;
    spellsContainer += `        </div>`;
    if (championData.spells.length > 0){
        championData.spells.forEach((spell, index) =>{
            spellsContainer += `    <div class="spell" data-index="${index}">`;
            spellsContainer += `        <img src="${spellArtUrl}${spell.image.full}" alt="Spell Sprite">`;
            spellsContainer += `        <span class="keybind-label">${keybinds[index]}</span>`;
            spellsContainer += `    </div>`;
        });
        spellsContainer += `    </div>`;
        spellsContainer += `<div class="desc-container">`;
        spellsContainer += `    <div class="spellDescription activeSpell" data-index="-1">
                                    <h3 class="spellTitle">${championData.passive.name}</h3>
                                    <span>${championData.passive.description}</span>
                                </div>`;
        championData.spells.forEach((spell, index) =>{
            spellsContainer += `<div class="spellDescription" data-index="${index}">
                                    <h3 class="spellTitle">${spell.name}</h3>
                                    <span>${spell.description}</span>
                                </div>`;
        })
        spellsContainer += `</div>`;
    } else {
        spellsContainer += '<p>We could not find any spells</p>';
    }
    spellsContainer += `    </div>`;
    spellsContainer += '</div>';

    return spellsContainer;
}

//function that builds the stats for the champion
utilities.buildChampionStats = async function(championData){
    let container = `<section class=champStats>`;
    container += `  <h1>Champion Stats</h1>`;
    container += `  <div class="entireStats">`;
    container += `      <div class="baseStats">`;
    container += `          <h4>Attack: <span>${championData.info.attack}</span></h4> `;
    container += `          <h4>Defense: <span>${championData.info.defense}</span></h4>`;
    container += `          <h4>Magic: <span>${championData.info.magic}</span></h4>`;
    container += `          <h4>Difficulty: <span>${championData.info.difficulty}</span></h4>`;
    container += `      </div>`;
    container += `      <div class="detailStats">`;
    container += `          <h4>Base HP: <span>${championData.stats.hp}</span></h4>`;
    container += `          <h4>Base MP: <span>${championData.stats.mp}</span></h4>`;
    container += `          <h4>Base Armor: <span>${championData.stats.armor}</span></h4>`;
    container += `          <h4>Base Magic Resist: <span>${championData.stats.spellblock}</span></h4>`;
    container += `          <h4>Base Attack Damage: <span>${championData.stats.attackdamage}</span></h4>`;
    container += `          <h4>Attack Range: <span>${championData.stats.attackrange}</span></h4>`;
    container += `      </div>`;
    container += `</section>`;

    return container;
}

//Function that builds the skins containers
utilities.buildChampionSkins = async function (championData){
    //URL for the splash art of the champion
    const splashArtUrl = process.env.CHAMP_SPLASH_ART;
    //place the container for the template
    let skinsContainer = '<div class="skins-container">';
    skinsContainer += ` <h1>Available Skins</h1>`;
    skinsContainer += ` <div class="images-container champ-carousel js-flickity" data-flickity='{ 
                            "cellAlign": "left",
                            "wrapAround": true, 
                            "autoplay": 2500, 
                            "lazyload": true, 
                            "pageDots": true,
                            "prevNextButtons": true,
                            "draggable": ">1",
                            "selectedAttraction": 0.02,
                            "friction": 0.3
                        }'>`;
    if (championData.skins.length > 0){
        championData.skins.forEach(skin =>{
            skinsContainer += ` <div class="skin carousel-cell">`;
            skinsContainer += `     <img 
                                        src="${splashArtUrl}${championData.id}_${skin.num}.jpg" 
                                        alt="a Skin for ${championData.name}"
                                    >`;
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

utilities.buildPopularChampions = async function (championsData){
    const champIcons = process.env.CHAMP_SQUARE_ASSETS
    let container = `<div class="popularChamps">`;
    if (championsData.length > 0){
        championsData.forEach(champion =>{
            container += `<a href="/champions/${champion.id}" class="homeLinksChamp">`;
            container += `  <div class="champPic">`;
            container += `      <img src="${champIcons}${champion.id}.png" alt="An Icon of ${champion.name}">`;
            container += `      <span class="iconName">${champion.name}</span>`;
            container += `  </div>`;
            container += `</a>`;
        });
    } else {
        container += `<p>This week's selection is under maintainence`;
    }
    container += `</div>`;
    return container;
}

//solve any promises to handle errors
utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


module.exports = utilities;