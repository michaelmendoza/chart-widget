import { ChartTypes } from "./ChartTypes";

export interface IDataPoint { 
    x: string | number,
    y: number
}

export interface IChart {
    type: ChartTypes,
    data: IDataPoint[]
}

export type IChartState = {
    chartList: IChart[],
    chartFilters: any
}