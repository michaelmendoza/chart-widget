import * as topojson from 'topojson';
import countriesByContinent from '../json/country-by-continent.json';
import worldTopoJson from '../json/countries-110m.json'; //https://github.com/topojson/world-atlas //https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
import usaGeoJson from '../json/world/counties-10m.json'; //https://github.com/topojson/us-atlas#us/10m.json  //https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json

export function fetchGeoJson(continent = 'Africa') {    
    if (continent === 'USA Counties') return getUSACountiesGeoJson();
    if (continent === 'USA States') return getUSAStatesGeoJson();
    
    return getCountriesGeoJson(continent);
}

/*
const getCounties10m = async () => {
    return fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json')
        .then(response => response.json());
};

const getCountries110m = async () => {
    return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(response => response.json());
};
*/

const getUSACountiesGeoJson = () => {
    const topology = usaGeoJson;
    return topojson.feature(topology, topology.objects.counties);
};

const getUSAStatesGeoJson = () => {
    const topology = usaGeoJson;
    return topojson.feature(topology, topology.objects.states);
};

const getCountriesGeoJson = (continent) => {
    const topology = worldTopoJson;
    const geojson = topojson.feature(topology, topology.objects.countries);

    if (continent === 'World') return geojson;
    return { 
        type: 'FeatureCollection',
        features: geojson.features.filter(item => isCountryInContinent(item.properties.name, continent)),
    };
};

const isCountryInContinent = (country, continent) => {
    const check = countriesByContinent.find(item => item.country === country);
    if (check) return continent === check.continent;
    else return false;
};