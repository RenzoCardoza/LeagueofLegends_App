const mongoose = require('mongoose');

const weeklyFeatureSchema = new mongoose.Schema({
    champions: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Champion"
    }],
    weekStart: Date
});

const WeeklyFeature = mongoose.model('WeeklyFeature', weeklyFeatureSchema);

module.exports = WeeklyFeature;