import ChartMockData from "./ChartMockData"

// TODO: ADD cache for Backend data call 

enum DataTypes { 'Mock', 'API' };
let dataType = DataTypes.API;
const dataUrl = 'http://localhost:3001/';
const mockDelay = 250; // Delay in milliseconds 
const cache : any = {
    entity: {},
    feeds: {}
}

const fetchEntityDataByFeed = (feedName:string) => {
    const id = cache.feeds.find((item:any) => item.name === feedName).id;
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

/**
 * Services for retrieving chart data from backend services or mock data service 
 */
const ChartDataService = {

    async fetchEntityDataByFeed(feedName:string) {
        let fetch;

        // Check for entity data in data cache.entity
        if(cache.entity[feedName]) {
            fetch = Promise.resolve(cache.entity[feedName])
            return fetch;
        }
        else {
            // Fetch entity
            fetch = (dataType == DataTypes.Mock) ? fetchMockEntityDataByFeed : fetchEntityDataByFeed;
            return fetch(feedName);
        }
    },

    fetchAvailableCharts: fetchAvailableCharts,

    getEntityData: () => {
        return ChartMockData.getEntityData();
    },

    getEntityDataByFeed: (feedName:string) => {
        return ChartMockData.getEntityDataByFeed(feedName)
    },

}

export default ChartDataService; 