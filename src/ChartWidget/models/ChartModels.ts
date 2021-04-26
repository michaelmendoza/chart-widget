import { DataSource } from "../services/DataSource";
import { ChartModes, ChartTypes, DataMetrics, FilterTypes } from "./ChartTypes";
import { MockFilterData } from '../services/MockFilterData'; 
import ChartDataService from "../services/ChartDataService";

/** Interface for data point to be used by Chart */
export interface IDataPoint { 
    x: string | number,
    y: number
}

export interface IEntityDataPoint { 
    id: string | number,            // Enity ID
    name: string,                   // Enity Name
    geo?: { x:number, y:number }[],  // Geo coordinates
    attr: { [key:string]: any }      // Attribute value for entity 
}

export interface IAttributeDataArray { 
    attribute: string,   // Attribute key
    values: number[]     // Attribute values
}

export interface IFeedProperties {
    name: string, 
    id: string, 
    attr: string[]
}

/** Interface for data to be feed into ChartViewItem */
export interface IChartItem {
    id: string,
    name: string,
    type: ChartTypes,
    feed: IFeedProperties,
    feedName: string,
    attributes: string[],
    dataMetric : DataMetrics,
    historyLength: number
}

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
        this.dataSource = dataSource
        chartItemCount++;
    }
    
    static copy(i : ChartItem) {
        return new ChartItem(i.name, i.type, i.feed, i.feedId, i.feedName, [...i.attributes], i.dataMetric, i.historyLength, i.dataSource);
    }

    static toJsonString(i : ChartItem) {
        const json = { name:i.name, type:i.type, feedId:i.feedId, feedName:i.feedName, attributes:i.attributes, dataMetric:i.dataMetric, historyLength:i.historyLength }
        return JSON.stringify(json);
    }

    clearData = () => {
        this.dataSource = new DataSource();
    }

    fetchData = (filter : IChartFilter)=> {
        ChartDataService.createChart(this);
        return this.dataSource.fetch(this.feed, this.attributes, this.type, this.dataMetric, this.historyLength, filter);
    };
}

export interface IChartFilter {
    filterType: FilterTypes,
    circle: any,
    shapes: any
}

export class ChartFilter implements IChartFilter{
    filterType: FilterTypes = FilterTypes.None;
    circle: any = MockFilterData().circle;
    shapes: any = MockFilterData().geoJson;
}

/** Interface for chart config */
export interface IChartConfig {
    index: number,
    mode: ChartModes,
    mock: any,
    editor: {
        chartType: ChartTypes,
        name: string,
        feed: IFeedProperties,
        feedId: string, 
        feedName: string,
        attributes: string[],
        metric: DataMetrics,
        history: number,
        multiChartTypes: ChartTypes[],
        availableFeeds: any[]
    },
    size: {
        width: number,
        height: number
    }
}

export class ChartConfig implements IChartConfig{
    index: number = 0;
    mode: ChartModes = ChartModes.ShowCharts;
    mock: any = { entityCount: 10000 };
    editor: any = {
        chartType: ChartTypes.Bar,
        name: 'New Chart',
        feed: {name:'',id:'',attr:[]},
        feedId:'',
        feedName: 'Population',
        attributes: ['', ''],
        metric: DataMetrics.Count,
        history: 30,
        multiChartTypes: [ChartTypes.Bar, ChartTypes.LineArea],
        availableFeeds: [{name:'Population', attr:['a','b','c','d']}, {name:'Lightning', attr:['a','b']}],
    }; 
    size = {
        width: 500,
        height: 1200
    };
}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChartItem[],
    chartFilters: any,
    chartConfig: IChartConfig
}