import { fetchGeoJson } from './GeoJson';
import { geoFilter } from './GeoFilter';
import { entityInPolygonSearch } from './GeoSearch';
import { ReduceEntityDictToMetricInPlace } from './DataAggregator';
import { createEntityData } from '../services/data/MockEntityData';

/**
 * Creates DataMap data from entityData or new generated entityData with entityCount
 * @param {*} entityCount Entity count
 * @param {*} entityData Input entity data
 * @param {*} map 
 * @param {*} filter GeoJson with filter polygons
 * @param {*} metric DataMetric for data reduction 
 * @returns 
 */
export const createDataMapData = (entityCount, entityData, map, filter, metric) => {
    const geoData = fetchGeoJson(map);
    let pointData = entityData || createEntityData(entityCount, map);
    pointData = geoFilter(pointData, filter);

    let pointsInPolygons = entityInPolygonSearch(geoData, pointData);
    pointsInPolygons = ReduceEntityDictToMetricInPlace(pointsInPolygons, 'a', metric); 
    
    return { geoData, pointData, pointsInPolygons };
};

/**
 * Creates PointMap data from entityData or new generated entityData with entityCount
 * @param {*} entityCount Entity count
 * @param {*} entityData Input entity data
 * @param {*} map 
 * @param {*} filter GeoJson with filter polygons
 * @param {*} max Max number of data points to render
 * @returns 
 */
export const createPointMapData = (entityCount, entityData, map, filter, max) => {
        const geoData = fetchGeoJson(map);
        let pointData = entityData || createEntityData(entityCount, map);
        pointData = geoFilter(pointData, filter);
        pointData = max ? pointData.filter((point, index) => index < max) : pointData;
        return {geoData, pointData};
};