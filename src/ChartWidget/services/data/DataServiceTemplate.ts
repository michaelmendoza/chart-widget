
import { IFeedProperties } from '../../models/ChartInterfaces';
import { IDataService } from './DataServiceInterface';

/**
 * Fetches entity data from a feed using data service. Returns a promise.
 * @param feed data feed
 */
const fetchEntityDataByFeed = async (feed: IFeedProperties) => [];

/**
 * Fetches the available chart feeds. Returns a promise
 */
const fetchAvailableFeeds = async () => [];

const DataService : IDataService = {
    fetchEntityDataByFeed,
    fetchAvailableFeeds
};

export default DataService;