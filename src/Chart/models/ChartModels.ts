import { DataSource } from "../services/ChartDataPipeline";
import { ChartModes, ChartTypes, DataMetrics, DataTypes, FilterTypes } from "./ChartTypes";
import { MockFilterData } from '../../DataMap/services/MockFilterData';

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

export interface ChartDataSet {
    type: DataTypes,
    data: IDataPoint[] | IEntityDataPoint[] | IAttributeDataArray[]
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
    dateCreated: Date;
    dateUpdated: Date;
    dateHistoryLength: number = 30;
    attributes: string[];
    dataMetric: DataMetrics;
    historyLength: number;
    properties: any = {};
    dataSource: DataSource;

    constructor(name: string, 
                type: ChartTypes, 
                feedName: string, 
                attributes: string[],
                dataMetric: DataMetrics = DataMetrics.Count,
                historyLength: number = 30) {
        this.id = chartItemCount.toString();
        this.name = name;
        this.type = type;
        this.feedName = feedName;
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.attributes = attributes;
        this.dataMetric = dataMetric;
        this.historyLength = historyLength;
        this.dataSource = new DataSource();
        chartItemCount++;
    }
    
    static copy(i : ChartItem) {
        return new ChartItem(i.name, i.type, i.feedName, [...i.attributes], i.dataMetric, i.historyLength)
    }

    fetchData = (filter : IChartFilter)=> {
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
    mock: any
}

export class ChartConfig {
    index: number = 0;
    mode: ChartModes = ChartModes.ShowCharts;
    mock: any = { entityCount: 10000 };
}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChartItem[],
    chartFilters: any,
    chartConfig: IChartConfig
}