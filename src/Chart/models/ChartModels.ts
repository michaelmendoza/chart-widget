import { DataSource } from "../services/ChartDataPipeline";
import { ChartModes, ChartTypes, DataTypes } from "./ChartTypes";

/*
Note: There are three kinds of data:
ChartData - ie. IDataPoints -> { x, y }
EntityData - [{  id:id,  name:name,  geo:geo, attr:attr }]
EntityDataByAttribute - i.e. { id, name, attributeKey, attributeValues:[]}

DataSet {
    datatype: ChartData | EntityData | EntityDataByAttribute,
    data: IDataPoint[] | IEntityItem[] | IEntityDataByAttribute[]
}
*/

/** Interface for data point to be used by Chart */
export interface IDataPoint { 
    x: string | number,
    y: number
}

export interface IEntityDataPoint { 
    id: string | number,            // Enity ID
    name: string,                   // Enity Name
    geo: { x:number, y:number }[],  // Geo coordinates
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
    attributes: string[]
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
    properties: any = {};
    filters: any[] = [];
    dataSource: DataSource;

    constructor(name: string, 
                type: ChartTypes, 
                feedName: string, 
                attributes: string[]) {
        this.id = chartItemCount.toString();
        this.name = name;
        this.type = type;
        this.feedName = feedName;
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.attributes = attributes;
        this.dataSource = new DataSource(feedName, attributes, type);
        chartItemCount++;
    }
    
    fetchData = ()=> {
        return this.dataSource.fetch();
    };
}

export class ChartList {

}

export interface IChartFilter {

}

/** Interface for chart config */
export interface IChartConfig {
    index: number,
    mode: ChartModes
}

export class ChartConfig {
    index: number = 0;
    mode: ChartModes = ChartModes.ShowCharts;
}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChartItem[],
    chartFilters: any,
    chartConfig: IChartConfig
}