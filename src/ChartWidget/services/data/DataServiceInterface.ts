import { IFeedProperties } from '../../models/ChartInterfaces';

/**
 * Interface for data services. Required to be followed for Custom DataService
 */
export interface IDataService { 
    fetchEntityDataByFeed: { (feed: IFeedProperties): Promise<any[]>; },
    fetchAvailableFeeds: { (): Promise<IFeedProperties[]>; },
}
