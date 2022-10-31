import * as Random from '../../libraries/Random';
import Utils from '../../libraries/Utils';
import { GroupDataArrayByValue } from '../../libraries/DataAggregator';
import { MapConstants } from '../../models/MapConstants';
import { IFeedProperties } from '../../models/ChartInterfaces';

let entityData: any[] = [];
const mockDelay = 500;
const entityCount = 10000;
const layerNames = ['Lightning', 'Hospitals', 'Traffic', 'Population'];
export const MockConfig = { entityData, entityCount, layerNames };

const ChartMockData = {
        
    /**
     * Creates a mock entity data array of size count.
     * 
     * Entity data is of form: { id, name, geo: {x, y}, attr: { a, b, c, d }, time }
     * @param count Size of entity data array
     */
    createEntityData: () => {
        const mapConstant = MapConstants['USA States'];
        const geoCenter = mapConstant.center; 
        const radius = mapConstant.radius; 

        // Date Ranges for Uniformly Distrubuted Dates between startTime and endTime 
        const daysInTimeWindow = 30;
        const milliSecondsInDay = 1000 * 60 * 60 * 24;
        const endTime = (new Date()).getTime();
        const startTime = endTime - daysInTimeWindow * milliSecondsInDay;
        
        // Create Entity DataPoints 
        const ids = Utils.range(0, entityCount);
        const data = ids.map((id, index) => {
            const name = layerNames[index % layerNames.length];
            const geo = Random.randomCircle(geoCenter, radius);
            const attr = { a: Random.randomNormal(50, 20), b: Random.random(0, 50), c: Random.random(0, 1000), d: Random.random(0, 250)};
            const time = new Date(Random.random(startTime, endTime));
            return { id, name, geo, attr, time };
        });
        
        entityData = data;
    },
    
    /**
     * Retrives entity data from all feeds
     * @param feed data feed
     */
    getEntityData: () => {
        // Create EntityData if not generated already
        if (entityData.length === 0) {
            ChartMockData.createEntityData();
        }
            
        return entityData;
    },
    
    /**
     * Retrives entity data from a feed 
     * @param feed data feed
     */
    getEntityDataByFeed: (feedName : string) => {
        // Retrieve Entity Data 
        entityData = ChartMockData.getEntityData();
        // Filter EntityData array by Feed
        return entityData.filter((item) => item.name === feedName);
    },
    
    /**
     * Fetches entity data from a feed. Returns a promise.
     * @param feed data feed
     */    
    fetchEntityDataByFeed: (feed: IFeedProperties) => {
        const fetch = new Promise((resolve) => {
            setTimeout(() => {
                const data = ChartMockData.getEntityDataByFeed(feed.name);
                resolve(data);
            }, mockDelay);
        });
        
        return fetch;
    },

    /**
     * Fetches the available chart feeds. Returns a promise
     */    
    fetchAvailableFeeds: () => {
        const availableFeeds : IFeedProperties[ ] = layerNames.map((name, index) => (
            { name, id: index.toString(), attr: ['a', 'b', 'c', 'd']}
        ));
            
        const fetch = new Promise((resolve) => {
            setTimeout(() => {
                resolve(availableFeeds);
            }, mockDelay);
        });
        
        return fetch;
    }
};

export default ChartMockData;