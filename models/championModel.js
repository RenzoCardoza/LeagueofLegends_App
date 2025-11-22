const mongoose = require('mongoose');

const SkinSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id for skin required']
        },
    num: {
        type: Number,
        required: [true, 'Skin number required']
    },
    name: {
        type: String,
        required: [true, 'Name for skins required']
    },
    chromas: {
        type: Boolean,
        required: [true, 'chroma availables required']
    }
}, {_id: false});

const championSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'A champion must have a name'],
        unique: true
    },
    key: {
        type: String,
        required: [true, 'Champion Key missing']
    },
    name: {
        type: String,
        required: [true, 'A champion must have a name'],
        unique:true
    },
    title: {
        type: String,
        required: [true, 'A champion needs a title']
    },
    image: {
        full: { type: String },
        sprite: { type: String },
        group: { type: String },
        x: { type: Number },
        y: { type: Number },
        w: { type: Number },
        h: { type: Number }
    },
    skins: {
        type: [SkinSchema],
        default: []
    },
    lore: {
        type: String,
        required: [true, 'lore required'],
        trim: true
    },
    blurb: {
        type: String,
        required: [true, 'blurb required'],
        trim: true
    },
    allytips: [String],
    enemytips: [String],
    tags: [String],
    partype: { 
        type: String 
    },
    info: {
        attack: {
            type: Number,
            required: [true, 'Please set a base attack damage']
        },
        defense: {
            type: Number,
            required: [true, 'Please set a base defense value for the champion']
        },
        magic: {
            type: Number,
            required: [true, 'Please set a base value for the champion defense']
        },
        difficulty: {
            type: Number,
            required: [true, 'Difficulty value is missing']
        }
    },
    stats: {
        hp: {
            type: Number,
            required: [true, 'Base Health Points missing'],
        },
        hpperlevel: {
            type: Number, 
            required: [true, 'Hp per Level stat missing']
        },
        mp: {
            type: Number,
            required: [true, 'Base Mana Points missing']
        },
        mpperlevel: {
            type: Number,
            required: [true, 'Mana per level points missing']
        },
        movespeed: {
            type: Number,
            required: [true, 'move speed missing']
        },
        armor: {
            type: Number,
            required: [true, 'armor value missing']
        },
        armorperlevel: {
            type: Number,
            required: [true, 'armor per level missing']
        },
        spellblock: {
            type: Number,
            required: [true, 'spellblock value missing']
        },
        spellblockperlevel: {
            type: Number, 
            required: [true, 'spell block per level value missing']
        },
        attackrange: {
            type: Number,
            required: [true, 'Attack range value missing']
        },
        hpregen: {
            type: Number,
            required: [true, 'HP regen value missing']
        },
        hpregenperlevel: {
            type: Number,
            required: [true, 'Hp regen per level value is required']
        },
        mpregen: {
            type: Number, 
            required: [true, 'MP Regen value is missing']
        },
        mpregenperlevel: {
            type: Number,
            required: [true, 'MP regen value per level is missing']
        },
        crit: {
            type: Number,
            default: 0
        },
        attackdamage: {
            type: Number, 
            default: 60
        },
        attackdamageperlevel: {
            type: Number, 
            required: [true, 'Set the attack damage per level value']
        },
        attackspeedperlevel: {
            type: Number, 
            required: [true, 'Attack Speed per level value is missing']
        },
        attackspeed: {
            type: Number, 
            required: [true, 'Set the attack speed value']
        }
    },
    spells: [Object],
    passive: {
        name: {
            type: String,
            required: [true, 'Passive name required']
        },
        description: {
            type: String,
            required: [true, 'description required']
        },
        image:{
            full: { type: String },
            sprite: { type: String },
            group: { type: String },
            x: { type: Number },
            y: { type: Number },
            w: { type: Number },
            h: { type: Number }
        }
    },
    recommended: {
        type: Array,
        default: []
    }
});

const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;