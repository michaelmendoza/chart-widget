const Entity = require('../models/entity');
const MapConstants = require('../services/constants').MapConstants;
const Random = require('../services/random');
const Utils = require('../services/utils');

const createMockEntityData = (entityCount) => {
    const layerNames = ['Lightning', 'Hospitals', 'Traffic', 'Population'];
    const mapConstant = MapConstants['USA States'];
    const geoCenter = mapConstant.center; 
    const radius = mapConstant.radius; 

    // Date Ranges for Uniformly Distrubuted Dates between startTime and endTime 
    const daysInTimeWindow = 30;
    const milliSecondsInDay = 1000 * 60 * 60 * 24;
    const endTime = (new Date()).getTime();
    const startTime =  endTime - daysInTimeWindow * milliSecondsInDay;

    // Create Entity DataPoints
    const ids = Utils.range(0, entityCount);
    const data = ids.map((id, index) => {
        const name = layerNames[index % layerNames.length];
        const geo = Random.randomCircle(geoCenter, radius);
        const attr = { a: Random.randomNormal(50, 20), b: Random.random(0, 50), c: Random.random(0, 1000), d: Random.random(0, 250)};
        const time = new Date(Random.random(startTime, endTime));
        return { name, geo, attr, time };
    });
    return data;
}

const createMockEntities = async (count = 10) => {
    try {
        const mockEntities = createMockEntityData(count);
        await Entity.insertMany(mockEntities);

    }
    catch(error) {
        console.log('Entities not created: ', error.message );
    }
}

module.exports = {
    createMockEntities
}