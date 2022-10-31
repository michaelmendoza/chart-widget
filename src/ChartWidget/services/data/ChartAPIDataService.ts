import { IFeedProperties } from '../../models/ChartInterfaces';
import { IDataService } from './DataServiceInterface';
import { ChartItem } from '../../models/ChartItem';

const cache : any = {
    entity: {},
    feeds: {}
};

const dataUrl = 'http://localhost:3001/';

/**
 * Fetches a entity data from a feed using data service. Returns a promise.
 * @param feed data feed
 */
const fetchEntityDataByFeed = async (feed: IFeedProperties) => {
    const id = feed.id;
    const url = dataUrl + 'entityEvents/findAndAggregate/' + id;
    const req = fetch(url);
    return req
    .then(res => res.json())
    .then(data => { 
        cache.entity[feed.name] = data.data;
        return data.data;
    });
};

/**
 * Fetches the available chart feeds. Returns a promise
 */
const fetchAvailableFeeds = async () => {
    const url = dataUrl + 'charts/getAvailbleCharts';
    const req = fetch(url);
    return req.then(res => res.json()).then(data => { 
        cache.feeds = data.data;
        return data.data;
    });
};

const createChart = (item:ChartItem) => {
    const url = dataUrl + 'charts/create';
    const options = { 
        method: 'POST', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: ChartItem.toJsonString(item) 
    };
    const req = fetch(url, options);
    return req.then(res => res.json());
};

const ChartAPIDataService : IDataService = {
    fetchEntityDataByFeed,
    fetchAvailableFeeds,
};

export default ChartAPIDataService;