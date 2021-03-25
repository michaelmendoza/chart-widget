import { DataSource } from "../services/DataSource";
import { ChartModes, ChartTypes, DataMetrics, DataTypes, FilterTypes } from "./ChartTypes";
import { MockFilterData } from '../../DataMap/services/MockFilterData';
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
    attr: { }                       // Attribute value for entity 
}

export interface IAttributeDataArray { 
    attribute: string,   // Attribute key
    values: number[]     // Attribute values
}

/** Interface for data to be feed into ChartViewItem */
export interface IChartItem {
    id: string,
    name: string,
    type: ChartTypes,
    feedName: string,
    attributes: string[],
    dataMetric : DataMetrics,
    historyLength: number
}

let chartItemCount = 0;
export class ChartItem {
    id: string;
    name: string;
    type: ChartTypes;
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
                feedId: string,
                feedName: string, 
                attributes: string[],
                dataMetric: DataMetrics = DataMetrics.Count,
                historyLength: number = 30) {
        this.id = chartItemCount.toString();
        this.name = name;
        this.type = type;
        this.feedId = feedId;
        this.feedName = feedName;
        this.createAt = new Date();
        this.updatedAt = new Date();
        this.attributes = attributes;
        this.dataMetric = dataMetric;
        this.historyLength = historyLength;
        this.dataSource = new DataSource();
        chartItemCount++;
    }
    
    static copy(i : ChartItem) {
        return new ChartItem(i.name, i.type, i.feedId, i.feedName, [...i.attributes], i.dataMetric, i.historyLength)
    }

    static toJsonString(i : ChartItem) {
        const json = { name:i.name, type:i.type, feedId:i.feedId, feedName:i.feedName, attributes:i.attributes, dataMetric:i.dataMetric, historyLength:i.historyLength }
        return JSON.stringify(json);
    }

    fetchData = (filter : IChartFilter)=> {
        ChartDataService.createChart(this);
        return this.dataSource.fetch(this.feedName, this.attributes, this.type, this.dataMetric, this.historyLength, filter);
    };
}

export class ChartFilter {
    filterType: FilterTypes = FilterTypes.None;
    circle: any = MockFilterData().circle;
    shapes: any = MockFilterData().geoJson;
}

export interface IChartFilter {
    filterType: FilterTypes,
    circle: any,
    shapes: any
}

/** Interface for chart config */
export interface IChartConfig {
    index: number,
    mode: ChartModes,
    mock: any,
    editor: {
        chartType: ChartTypes,
        name: string,
        feedId: string, 
        feedName: string,
        attributes: string[],
        metric: DataMetrics,
        history: number,
        multiChartTypes: ChartTypes[],
        availableFeeds: any[]
    }
}

export class ChartConfig {
    index: number = 0;
    mode: ChartModes = ChartModes.ShowCharts;
    mock: any = { entityCount: 10000 };
    editor: any = {
        chartType: ChartTypes.Bar,
        name: 'New Chart',
        feedId:'',
        feedName: 'Population',
        attributes: ['a', ''],
        metric: DataMetrics.Count,
        history: 30,
        multiChartTypes: [ChartTypes.Bar, ChartTypes.LineArea],
        availableFeeds: [{name:'Population', attr:['a','b','c','d']}, {name:'Lightning', attr:['a','b']}]
    }
}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChartItem[],
    chartFilters: any,
    chartConfig: IChartConfig
}