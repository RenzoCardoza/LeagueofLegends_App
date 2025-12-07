const WeeklyFeature = require('../models/weeklyFeature');
const Champion = require('../models/championModel');

async function getWeeklyChampions() {
    try{
        let feature = await WeeklyFeature.findOne({}).populate('champions');
    
        const now = new Date();
    
        //calculate Monday of this current week
        const monday = new Date(now);
        monday.setDate(now.getDate() - now.getDay() + 1);
        monday.setHours(0, 0, 0, 0);
    
        if (!feature || feature.weekStart.getTime() !== monday.getTime()) {
            //get random 4 champions
            const randomChampions = await Champion.aggregate([
                { $sample: { size: 5 } }
            ]);
    
            if (feature) {
                feature.champions = randomChampions;
                feature.weekStart = monday;
                await feature.save();
            } else {
                await WeeklyFeature.create({
                    champions: randomChampions,
                    weekStart: monday
                });
            }
    
            //reload with population
            feature = await WeeklyFeature.findOne({}).populate('champions');
        }
    
        return feature.champions
    } catch (err) {
        console.log(err);
    }
}

module.exports = getWeeklyChampions