
const worldGeoJson = require('./json/world.json');

getGeo = (name) => {
    return worldGeoJson.features.find(features => features.properties.name == name ).geometry;
}

module.exports = {
    getGeo
}
