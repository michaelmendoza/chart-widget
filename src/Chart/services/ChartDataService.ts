import ChartMockData from "./ChartMockData"

const ChartDataAdaptor = () => {

}

const ChartDataFilters = () => {

}

const ChartDataTransform = () => {
    
}

/**
 * Services for retrieving chart data from backend services or mock data service 
 */
const ChartDataService = {
    getChartData: () => { return ChartMockData.getChartData(); },
    getChartDataItem: (id: number) => { 
        const item = ChartMockData.getChartData().find(item => item.id == id);
        return item ? item.data : [];
    }
}

const ChartConfigService = {

}

export default ChartDataService; 