import { ChartModes, ChartTypes } from "./ChartTypes";

/** Interface for data point to be used by Chart */
export interface IDataPoint { 
    x: string | number,
    y: number
}

/** Interface for data to be feed into ChartViewItem */
export interface IChart {
    type: ChartTypes,
    properties: any,
    data: IDataPoint[]
}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChart[],
    chartFilters: any,
    chartView: any
}