import { idText } from "typescript";
import { ChartModes, ChartTypes } from "./ChartTypes";
import { screen } from '@testing-library/react';

/** Interface for data point to be used by Chart */
export interface IDataPoint { 
    x: string | number,
    y: number
}

/** Interface for data to be feed into ChartViewItem */
export interface IChart {
    id: number,
    type: ChartTypes,
    properties: any,
    data: IDataPoint[]
}

// Current ChartView
export interface IChartView {
    index: number,
    mode: ChartModes
}

export interface IChartFilter {

}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChart[],
    chartFilters: any,
    chartView: IChartView
}

export class ChartConfig {
    index: number = 0;
    mode: ChartModes = ChartModes.ShowCharts;
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
    dateHistoryLength: number= 30;
    filters: any[] = [];
    data: any[] = []
    rawData: any[] = []

    constructor(name: string, type: ChartTypes, feedName: string) {
        this.id = chartItemCount.toString();
        this.name = name;
        this.type = type;
        this.feedName = feedName;
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        chartItemCount++;
    }
}

/*
ChartItem {
    id : string,  
    name, 
    type, 
    feedId,
    feedName,
    dateCreated, 
    dateModified,
    dataHistoryLength,
    filters: [],
    data:[], 
    rawdata: [
        {
            attribute,
            aggregationMethod, 
            entityData:[], 
            chartData:[] 
        }
    ] 
}
*/