/* eslint-disable no-multi-spaces */
import { ChartModes, ChartTypes, DataMetrics, FilterTypes } from './ChartEnums';

export interface IEntityDataPoint { 
    id: string | number,            // Enity ID
    name: string,                   // Enity Name
    geo?: { x:number, y:number }[], // Geo coordinates
    attr: { [key:string]: any }     // Attribute value for entity 
}

export interface IFeedProperties {
    name: string, 
    id: string, 
    attr: string[]
}

/** Interface for ChartState -> ChartItems. Used for data to be feed into ChartViewItem */
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

/** Interface for ChartState -> ChartFilter */
export interface IChartFilter {
    filterType: FilterTypes,
    circle: any,
    shapes: any
}

/** Interface for ChartState -> ChartConfig */
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
    },
    updateCounter: number
}

/** Interface for Chart State */
export type IChartState = {
    chartList: IChartItem[],
    chartFilters: any,
    chartConfig: IChartConfig
}