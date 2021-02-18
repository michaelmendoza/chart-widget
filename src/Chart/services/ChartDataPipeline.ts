
import { ChartTypes } from '../models/ChartTypes';
import { DataArrayToBinnedXYArray } from '../modules/Histogram';
import ChartDataService from './ChartDataService';
import Utils from '../modules/utils';

export enum DataIOTypes {
    Entity,  
    AttributeArray,
    XYPointArray, 
    XMultiYPointArray,
    XtYPointArray,
    XtMultiPointArray
}

export enum DataGroupByTypes {
    GroupByValue, // X: Bins, Y: Value Count 
    GroupByTime, // X: Time, Y: Value - Metric (Sum, Avg, StdDev, Median)
    XvsY, // ScatterPlot: (Comparision) X:Attr1 Values, Y:Attr2 Values
    TvsY // ScatterPlot: X: Time, Y: Value 
}

export enum DataMetrics {
    Sum, 
    Avg, 
    StdDev, 
    Median
}

export class DataSource {
    feedName: string;
    attributes: string[];
    type: ChartTypes;

    constructor(feedName:string, attributes:string[] = [], type : ChartTypes) {
        this.feedName = feedName;
        this.attributes = attributes;
        this.type = type;
    }

    toString() : string {
        return 'DataSource: feedName: ' + this.feedName + ', attribute: ' + this.attributes[0];
    }
    
    fetch() {
        switch(this.type) {
            case ChartTypes.Bar:
            case ChartTypes.Pie:
            case ChartTypes.LineArea:
                return ChartDataService.fetchChartData(this.feedName, this.attributes[0]);
            case ChartTypes.ScatterPlot:
                return ChartDataService.fetchEntityDataByFeed(this.feedName).then((res) => {
                    const pipeline = new DataPipeline(res, this.attributes, this.type, DataIOTypes.Entity, DataIOTypes.XtYPointArray);
                    return pipeline.processData();
                })
            case ChartTypes.TimeSeries:
                return ChartDataService.fetchEntityDataByFeed(this.feedName).then((res) => {
                    const pipeline = new DataPipeline(res, this.attributes, this.type, DataIOTypes.Entity, DataIOTypes.XtMultiPointArray);
                    return pipeline.processData();
                })
        }
           
    }


}

/** DataPipeline for single feed */
export class DataPipeline {
    inputData: any;
    attributes: string[];
    type: ChartTypes;
    filters: string[] = [];
    inputType : DataIOTypes;
    outputType : DataIOTypes;

    constructor(inputData: any, attributes: string[], type: ChartTypes, inputType: DataIOTypes, outputType: DataIOTypes) {
        this.inputData = inputData;
        this.attributes = attributes;
        this.type = type;
        this.inputType = inputType;
        this.outputType = outputType;
    }

    processData() {
        // TODO: Check for propery data input     

        switch(this.inputType) {
            case DataIOTypes.Entity:
                return this.transformEntity();
        }
    }

    transformEntity() {
        switch(this.outputType) {
            case DataIOTypes.XYPointArray:
                // Transform EntityData array to an array of attibute values 
                const data = new Array();
                this.inputData.forEach((item : any)=> {  
                    data.push(item.attr[this.attributes[0]]);
                })
                
                // Transform rawData to binned histogram data
                return DataArrayToBinnedXYArray(data);
            case DataIOTypes.XtYPointArray:
                return this.inputData.map((item : any) => {
                    return { x:item.time, y:item.attr[this.attributes[0]]}
                })
            case DataIOTypes.XtMultiPointArray:
                const timeSeriesData = this.inputData.map((item : any) => {
                    return { x:item.time, y:[item.attr[this.attributes[0]], item.attr[this.attributes[1]]] }
                })

                const historyLength = 30;
                const milliSecondsInDay = 1000 * 60 * 60 * 24;
                const endTime = (new Date()).getTime();
                const startTime =  endTime - historyLength * milliSecondsInDay;

                const times = Utils.range(1, historyLength + 1);
                const bins : number[][] = times.map(() => []);
                timeSeriesData.forEach((item : any) => {
                    var index = Math.floor(historyLength * (item.x.getTime() - startTime) / (endTime - startTime))
                    bins[index].push(item.y);
                })
                const values =  bins.map((bin, index) => {
                    const sum = [0,0]
                    bin.forEach((item : any) => { sum[0] += item[0]; sum[1] += item[1];})
                    return { x: index, y:sum } 
                    //return { x: startTime + (endTime - startTime) / historyLength * index, y:sum } // Sum
                    //return { x: startTime + (endTime - startTime) / historyLength * index, y:[bin.length] } // Count 
                })
                return values;
        }
    }
}

/**
 * Group by Value ie. Histogram
 * Group by Date and then sum, avg, std dev
 * 
 * Plots:
 * 1) X: Bins, Y: Value Count 
 * 2) X: Time, Y: Value - Metric (Sum, Avg, StdDev, Median)
 * 3) ScatterPlot: (Comparision) X:Attr1 Values, Y:Attr2 Values
 * 4) ScatterPlot: X: Time, Y: Value 
 * 
 */

const ChartDataAdaptor = () => {

}

const ChartDataFilters = () => {

}

const ChartDataTransform = () => {
    
}
