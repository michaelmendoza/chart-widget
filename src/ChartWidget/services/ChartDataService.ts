import { ChartItem, IFeedProperties } from "../models/ChartModels";
import ChartMockData from "./ChartMockData";
import {getCachedEntityData} from './EntityDataService';

// TODO: ADD cache for Backend data call 

enum DataTypes { 'Mock', 'API', 'STREAM' };
let dataType = DataTypes.STREAM;
const dataUrl = 'http://localhost:3001/';
const mockDelay = 250; // Delay in milliseconds 
const cache : any = {
    entity: {},
    feeds: {}
}

export const fetchStreamedEntityDataByFeed = (feed: IFeedProperties) => {
    const entities = getCachedEntityData(feed.id.toLowerCase(), feed.attr);
    return entities;
}

const fetchEntityDataByFeed = (feedName:string) => {
    const feed = cache.feeds.find((item:any) => item.name === feedName);
    const id = feed.id;
    const url = dataUrl + 'entityEvents/findAndAggregate/' + id;
    const req = fetch(url);
    return req.then(res => { 
        return res.json()
    }).then(data => { 
        cache.entity[feedName] = data.data;
        console.log(data); 
        return data.data;
    });
}

const fetchAvailableCharts = () => {
    const url = dataUrl + 'charts/getAvailbleCharts';
    const req = fetch(url);
    return req.then(res => { 
        return res.json()
    }).then(data => { 
        cache.feeds = data.data;
        console.log(data); 
        return data.data;
    });
}

const fetchMockEntityDataByFeed = (feedName:string) => {
    let fetch = new Promise((resolve, reject) => {
        setTimeout(() =>  {
            const data = ChartMockData.getEntityDataByFeed(feedName)
            resolve(data);
        }, mockDelay)
    })
    
    return fetch;
}

const fetchMockChartData = (feedName:string, attributeKey:string) => {
    let fetch = new Promise((resolve, reject) => {
        setTimeout(() =>  {
            const data = ChartMockData.getChartData(feedName, attributeKey)
            cache.entity[feedName] = data;
            resolve(data);
        }, mockDelay)
    })
    
    return fetch;
}

const createChart = (item:ChartItem ) => {
    const url = dataUrl + 'charts/create';
    const options = { 
        method: 'POST', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body:ChartItem.toJsonString(item) 
    }
    const req = fetch(url, options)
    return req.then(res => { 
        return res.json()
    }).then(data => { 
        console.log('Saved Chart');
        console.log(data); 
        return data;
    });
}

/**
 * Services for retrieving chart data from backend services or mock data service 
 */
const ChartDataService = {

    async fetchEntityDataByFeed(feed: IFeedProperties) {
        let fetch;

        // Check for entity data in data cache.entity
        if(cache.entity[feed.name]) {
            fetch = Promise.resolve(cache.entity[feed.name])
            return fetch;
        }
        else {
            // Fetch entity
            switch(dataType) {
                case DataTypes.Mock:
                    return fetchMockEntityDataByFeed(feed.name);
                case DataTypes.API:
                    return fetchEntityDataByFeed(feed.name);
                case DataTypes.STREAM:
                    fetch = Promise.resolve(fetchStreamedEntityDataByFeed(feed));
                    return fetch;
            };

            //fetch = (dataType === DataTypes.Mock) ? fetchMockEntityDataByFeed : fetchEntityDataByFeed;
            //return fetch(feedName);
        }
    },

    fetchAvailableCharts: fetchAvailableCharts,

    createChart:createChart,

    getEntityData: () => {
        return ChartMockData.getEntityData();
    },

    getEntityDataByFeed: (feedName:string) => {
        return ChartMockData.getEntityDataByFeed(feedName)
    },

}

export default ChartDataService; 