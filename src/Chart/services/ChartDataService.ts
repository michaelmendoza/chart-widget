import ChartMockData from "./ChartMockData"

/**
 * Services for retrieving chart data from backend services or mock data service 
 */
const ChartDataService = {
    getChartData: (feedName:string, attributeKey:string) => { 
        return ChartMockData.getChartData(feedName, attributeKey); 
    },
}

const ChartConfigService = {

}

export default ChartDataService; 