import { ChartModes, ChartTypes } from "./ChartTypes";

export interface IDataPoint { 
    x: string | number,
    y: number
}

export interface IChart {
    type: ChartTypes,
    properties: any,
    data: IDataPoint[]
}

export type IChartState = {
    chartList: IChart[],
    chartFilters: any,
    chartView: any
}