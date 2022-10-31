import { DataSource } from '../libraries/DataSource';
import { ChartTypes, DataMetrics } from './ChartEnums';
import { IChartItem, IFeedProperties, IChartFilter } from './ChartInterfaces';

let chartItemCount = 0;
export class ChartItem implements IChartItem {
    id: string;
    name: string;
    type: ChartTypes;
    feed: IFeedProperties;
    feedId: string = '';
    feedName: string;
    createAt: Date;
    updatedAt: Date;
    attributes: string[];
    dataMetric: DataMetrics;
    historyLength: number;
    dataSource: DataSource;

    constructor(name: string,
        type: ChartTypes,
        feed: any,
        feedId: string,
        feedName: string,
        attributes: string[],
        dataMetric: DataMetrics = DataMetrics.Count,
        historyLength: number = 30,
        dataSource = new DataSource()) {
        this.id = chartItemCount.toString();
        this.name = name;
        this.type = type;
        this.feed = feed;
        this.feedId = feedId;
        this.feedName = feedName;
        this.createAt = new Date();
        this.updatedAt = new Date();
        this.attributes = attributes;
        this.dataMetric = dataMetric;
        this.historyLength = historyLength;
        this.dataSource = dataSource;
        chartItemCount++;
    }

    static copy(i: ChartItem) {
        return new ChartItem(i.name, i.type, i.feed, i.feedId, i.feedName, [...i.attributes], i.dataMetric, i.historyLength, i.dataSource);
    }

    static toJsonString(i: ChartItem) {
        const json = { name: i.name, type: i.type, feedId: i.feedId, feedName: i.feedName, attributes: i.attributes, dataMetric: i.dataMetric, historyLength: i.historyLength };
        return JSON.stringify(json);
    }

    clearData = () => {
        this.dataSource = new DataSource();
    };

    // eslint-disable-next-line arrow-body-style
    fetchData = (filter: IChartFilter) => {
        //ChartDataService.createChart(this);
        return this.dataSource.fetch(this.feed, this.attributes, this.type, this.dataMetric, this.historyLength, filter);
    };
}
