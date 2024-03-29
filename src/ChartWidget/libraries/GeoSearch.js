import PolygonLookup from 'polygon-lookup';

/**
 * Creates a feature dictionary where the keys are the feature names, and the values
 * are the point count in each feature polygon
 * @param {*} features 
 * @param {*} points 
 * @returns Feature count dictionary
 */
 export const entityInPolygonSearchCount = (features, points) => {
    const keys = features.features.map((item) => item.properties.name);
    const dict = {};
    keys.forEach((key) => {
        dict[key] = 0;
    });

    const lookup = new PolygonLookup(features);
    points.forEach((point) => {
        const search = lookup.search(point.geo[0], point.geo[1]);
        if (search) dict[search.properties.name] += 1;
    });

    return dict;
};

/**
 * Creates a feature dictionary where the keys are the feature names, and the values
 * are an array of the entities found in each feature polygon from the input entity array
 * @param {*} features 
 * @param {*} points 
 * @returns Feature entity dictionary [{feature_name:[entity]}]
 */
export const entityInPolygonSearch = (features, points) => {

    // Create dictionary with country name as key, value is array of entities
    const keys = features.features.map((item) => item.properties.name);
    const dict = {};
    keys.forEach((key) => {
        dict[key] = [];
    });

    // Do polygon look to find all polygons which contain a point feature 
    const lookup = new PolygonLookup(features);
    points.forEach((point) => {
        const search = lookup.search(point.geo[0], point.geo[1]);
        if (search) dict[search.properties.name].push(point);
    });

    return dict;
};
