import countriesGeoJson from '../json/world.json';
import usaGeoJson from '../json/world/counties-10m.json'; //https://github.com/topojson/us-atlas#us/10m.json
import * as topojson from 'topojson';

export function fetch(continent = "Africa") {    
    if(continent === "USA Counties")
        return getUSACountyGeoJson();
    if(continent === "USA States")
        return getUSAStatesGeoJson();
    
    return getCountriesByContinent(continent);
    //let filteredGeoJsons = filterCountryByContinent(continent, countriesByContinent, countriesGeoJson);
    //return filteredGeoJsons;
}

const getUSACountyGeoJson = () => {
    const topology = usaGeoJson;
    return topojson.feature(topology, topology.objects.counties);
}

const getUSAStatesGeoJson = () => {
    const topology = usaGeoJson;
    return topojson.feature(topology, topology.objects.states);
}

const getCountriesByContinent = (continent) => {
    if(continent == "World") return countriesGeoJson;
    return { 
        type:"FeatureCollection",
        features:countriesGeoJson.features.filter(item => (item.properties.continent) === continent),
    }
}
