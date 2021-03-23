import ChartMockData from "./ChartMockData"

// TODO: ADD cache for Backend data call 

enum DataTypes { 'Mock', 'API' };
let dataType = DataTypes.API;
const dataUrl = 'http://localhost:3001/';
const mockDelay = 250; // Delay in milliseconds 
const cache : any = {}

const fetchEntityDataByFeed = (feedName:string) => {
    const url = dataUrl + 'entityEvents/findAndAggregate';
    const req = fetch(url);
    return req.then(res => { 
        return res.json()
    }).then(data => { 
        cache[feedName] = data.data;
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
            cache[feedName] = data;
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

        // Check for entity data in data cache
        if(cache[feedName]) {
            fetch = Promise.resolve(cache[feedName])
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