import countriesByContinent from '../json/country-by-continent.json';
import worldTopoJson from '../json/countries-110m.json'; //https://github.com/topojson/world-atlas
import usaGeoJson from '../json/world/counties-10m.json'; //https://github.com/topojson/us-atlas#us/10m.json
import * as topojson from 'topojson';

export function fetch(continent = "Africa") {    
    if(continent === "USA Counties")
        return getUSACountiesGeoJson();
    if(continent === "USA States")
        return getUSAStatesGeoJson();
    
    return getCountriesGeoJson(continent);
}

const getUSACountiesGeoJson = () => {
    const topology = usaGeoJson;
    return topojson.feature(topology, topology.objects.counties);
}

const getUSAStatesGeoJson = () => {
    const topology = usaGeoJson;
    return topojson.feature(topology, topology.objects.states);
}

const getCountriesGeoJson = (continent) => {
    const topology = worldTopoJson;
    const geojson = topojson.feature(topology, topology.objects.countries);

    if(continent == "World") return geojson;
    return { 
        type:"FeatureCollection",
        features:geojson.features.filter(item => isCountryInContinent(item.properties.name, continent)),
    }
}

const isCountryInContinent = (country, continent) => {
    const check = countriesByContinent.find(item => item.country == country)
    if(check)
        return continent === check.continent;
    else {
        console.log("Error: Missing " + country);
        return false;
    }
}