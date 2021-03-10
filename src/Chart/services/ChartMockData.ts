import * as Random from '../services/Random';
import Utils from '../services/Utils';
import { GroupDataArrayByValue } from './DataAggregator';

var entityData: any[] = [];
const entityCount = 10000;
const layerNames = ['Lightning', 'Hospitals', 'Traffic', 'Population'];
export const MockConfig = { entityData, entityCount, layerNames }

const ChartMockData = {
        
    /**
     * Creates a mock entity data array of size count.
     * 
     * Entity data is of form: { id, name, geo: {x, y}, attr: { a, b, c, d }, time }
     * @param count Size of entity data array
     */
    createEntityData: () => {
        // Date Ranges for Uniformly Distrubuted Dates between startTime and endTime 
        const daysInTimeWindow = 30;
        const milliSecondsInDay = 1000 * 60 * 60 * 24;
        const endTime = (new Date()).getTime();
        const startTime =  endTime - daysInTimeWindow * milliSecondsInDay;

        // Create Entity DataPoints 
        const ids = Utils.range(0, entityCount);
        const data = ids.map((id, index) => {
            const name = layerNames[index % layerNames.length];
            const geo = Random.randomCircle([15, 5], 40);
            const attr = { a:Random.randomNormal(50, 20), b:Random.random(0, 50), c:Random.random(0, 1000), d:Random.random(0, 250)}
            const time = new Date(Random.random(startTime, endTime))
            return { id:id, name:name, geo:geo, attr:attr, time:time }
        })
        
        entityData = data;
    },

    getEntityData: () => {
        // Create EntityData if not generated already
        if (entityData.length === 0) 
            ChartMockData.createEntityData();
            
        return entityData;
    },
    
    getEntityDataByFeed: (feedName : string) => {
        // Create EntityData if not generated already
        if (entityData.length === 0) 
            ChartMockData.createEntityData();
        
        // Filter EntityData array by Feed
        return entityData.filter((item)=>item.name === feedName)
    },

    getAttributeDataByFeed: (feedName :string) => {
        // Create EntityData if not generated already
        if (entityData.length === 0) 
            ChartMockData.createEntityData();
         
        // Filter EntityData array by Feed
        let entityDataByFeed = entityData.filter((item)=>item.name === feedName)

        // Add Date to Attribute Values 
        entityDataByFeed = entityDataByFeed.map((item)=>{
            return { attr: { ...item.attr, time:item.time }}
        })
        const keys = Object.keys(entityDataByFeed[0].attr)

        // Transform EntityData array to FeedData of form { a:[], b:[], c:[], d:[], ..., time:[] }
        const values : number[] = []
        const data = keys.map(key => { return { attribute:key, values:values }})
        entityDataByFeed.forEach((item : any)=> {  
            keys.forEach((key : string, index) => { // Assuming constant index order for keys
                data[index].values.push(item.attr[key]);
            })
        }) 

        return data;
    },

    getChartData: (feedName :string, attributeKey : string) => {
        // Create EntityData if not generated already
        if (entityData.length === 0) 
            ChartMockData.createEntityData();
        
        // Filter EntityData array by Feed
        const entityDataByFeed = entityData.filter((item)=>item.name === feedName)

        // Transform EntityData array to FeedData of form { a:[], b:[], c:[], d:[] }
        const feedData = { id:feedName, rawdata:new Array(), data:new Array() }
        entityDataByFeed.forEach((item : any)=> {  
            feedData.rawdata.push(item.attr[attributeKey]);
        })
        
        // Transform rawData to binned histogram data
        feedData.data = GroupDataArrayByValue(feedData.rawdata);

        return feedData.data;
    },
    
    getChartDataByTime: () => {

    }

}

export default ChartMockData;