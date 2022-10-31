import { IFeedProperties } from '../../models/ChartInterfaces';
import ChartMockDataService from './ChartMockDataService';
import ChartAPIDataService from './ChartAPIDataService';

/**
 * DataService Type for use by DataServiceProvider 
 */
export enum DataServiceType { 'MOCK', 'API', 'CUSTOM' }

let dataServiceType = DataServiceType.MOCK; // Default is Mock DataService 
let entityDataService = ChartMockDataService; // Custom DataService Hook 

/**
 * Provices services for retrieving chart data from backend services or mock data service 
 */
const DataServiceProvider = {

    /**
     * Sets custom data service 
     * @param dataService custom data service
     */
    setEntityDataService: (dataService : any) => {
        entityDataService = dataService;
        dataServiceType = DataServiceType.CUSTOM;
    },

    /**
     * Fetches entity data from a feed using data service. Returns a promise.
     * @param feed data feed
     */
    fetchEntityDataByFeed(feed: IFeedProperties) {

        // Fetch entity data
        switch (dataServiceType) {
            case DataServiceType.MOCK:
                return ChartMockDataService.fetchEntityDataByFeed(feed);
            case DataServiceType.API:
                return ChartAPIDataService.fetchEntityDataByFeed(feed);
            case DataServiceType.CUSTOM:
                return entityDataService.fetchEntityDataByFeed(feed);
            default:
                return ChartMockDataService.fetchEntityDataByFeed(feed);
        }
    },
    
    /**
     * Fetches the available chart feeds. Returns a promise
     */
    fetchAvailableFeeds: () => {
        switch (dataServiceType) {
            case DataServiceType.MOCK:
                return ChartMockDataService.fetchAvailableFeeds();
            case DataServiceType.API:
                return ChartAPIDataService.fetchAvailableFeeds();
            case DataServiceType.CUSTOM:
                return entityDataService.fetchAvailableFeeds();
            default:
                return ChartMockDataService.fetchAvailableFeeds();
        }
    }

};

export default DataServiceProvider;