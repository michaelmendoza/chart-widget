import ChartMockData from "./ChartMockData"

const mockDelay = 250; // Delay in milliseconds 

/**
 * Services for retrieving chart data from backend services or mock data service 
 */
const ChartDataService = {
    async fetchChartData(feedName:string, attributeKey:string) {
        let fetch = new Promise((resolve, reject) => {
            setTimeout(() =>  {
                const data = this.getChartData(feedName, attributeKey)
                resolve(data);
            }, mockDelay)
        })
        
        return fetch;
    },

    async fetchEntityDataByFeed(feedName:string) {
        let fetch = new Promise((resolve, reject) => {
            setTimeout(() =>  {
                const data = this.getEntityDataByFeed(feedName)
                resolve(data);
            }, mockDelay)
        })
        
        return fetch;
    },

    getChartData: (feedName:string, attributeKey:string) => { 
        return ChartMockData.getChartData(feedName, attributeKey); 
    },

    getEntityData: () => {
        return ChartMockData.getEntityData();
    },

    getEntityDataByFeed: (feedName:string) => {
        return ChartMockData.getEntityDataByFeed(feedName)
    },

    getAttributeDataByFeed: (feedName:string) => {
        return ChartMockData.getAttributeDataByFeed(feedName);
    },
}

const ChartConfigService = {

}

export default ChartDataService; 