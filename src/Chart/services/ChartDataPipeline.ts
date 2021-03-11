
import { ChartTypes, DataMetrics, FilterTypes } from '../models/ChartTypes';
import { EntityDataToDataArray, EntityDataToDataMatrix, EntityDataToTimeSeriesData, GroupDataArrayByValue, GroupDataMatrixByValue, GroupEntityDataByDate, ReduceDataArrayToMetric, ReduceDataArrayToStats } from './DataAggregator';
import ChartDataService from './ChartDataService';
import { IChartFilter } from '../models/ChartModels';
import { geoFilter } from '../../DataMap/services/GeoFilter';

export enum DataIOTypes {
    Entity = 'Entity',  
    AttributeArray = 'AttributeArray',
    XYPointArray = 'XYPointArray', 
    XMultiYPointArray = 'XMultiYPointArray',
    XtYPointArray = 'XtYPointArray',
    XtMultiPointArray = 'XtMultiPointArray',
    Number = 'Number',
    Stats = 'Stats'
}

export class DataSource {
    cache: any = null;
    
    fetch(feedName:string, attributes:string[] = [], type : ChartTypes, dataMetric : DataMetrics, historyLength: number, filter: IChartFilter) {
        console.log('Fetching Data from Data Source - feedName: ' + feedName + ', attribute: ' + attributes[0]);

        switch(type) {
            case ChartTypes.Number:
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    const pipeline = new DataPipeline(res, attributes, type, DataIOTypes.Entity, DataIOTypes.Number, dataMetric, historyLength, filter);
                    this.cache = pipeline.processData();
                    return this.cache;
                })   
            case ChartTypes.Stats:
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    const pipeline = new DataPipeline(res, attributes, type, DataIOTypes.Entity, DataIOTypes.Stats, dataMetric, historyLength, filter);
                    this.cache = pipeline.processData();
                    return this.cache;
                })             
            case ChartTypes.Bar:
                let outType = attributes.length === 1 ? DataIOTypes.XYPointArray : DataIOTypes.XMultiYPointArray;
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    const pipeline = new DataPipeline(res, attributes, type, DataIOTypes.Entity, outType, dataMetric, historyLength, filter);
                    this.cache = pipeline.processData();
                    return this.cache;
                })
            case ChartTypes.Pie:
            case ChartTypes.LineArea:
                return ChartDataService.fetchChartData(feedName, attributes[0]).then((res : any) => {
                    this.cache = res;
                    return this.cache;
                })
            case ChartTypes.ScatterPlot:
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    const pipeline = new DataPipeline(res, attributes, type, DataIOTypes.Entity, DataIOTypes.XtYPointArray, dataMetric, historyLength, filter);
                    this.cache = pipeline.processData();
                    return this.cache;
                })
            case ChartTypes.TimeSeries:
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    const pipeline = new DataPipeline(res, attributes, type, DataIOTypes.Entity, DataIOTypes.XtMultiPointArray, dataMetric, historyLength, filter);
                    this.cache = pipeline.processData();
                    return this.cache;
                })
            case ChartTypes.HeatMap:
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    this.cache = res;
                    return this.cache;
                })
            case ChartTypes.Table:
                return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
                    const pipeline = new DataPipeline(res, attributes, type, DataIOTypes.Entity, DataIOTypes.AttributeArray, dataMetric, historyLength, filter);
                    this.cache = pipeline.processData();
                    return this.cache;
                })
        }      
    }
}

/** DataPipeline for single feed */
export class DataPipeline {
    inputData: any;
    attributes: string[];
    type: ChartTypes;
    filter: any;
    inputType : DataIOTypes;
    outputType : DataIOTypes;
    dataMetric : DataMetrics;
    historyLength: number;

    constructor(inputData: any, attributes: string[], type: ChartTypes, inputType: DataIOTypes, outputType: DataIOTypes, dataMetric: DataMetrics, historyLength: number = 30, filter: IChartFilter) {
        this.inputData = inputData;
        this.attributes = attributes;
        this.type = type;
        this.filter = filter;
        this.inputType = inputType;
        this.outputType = outputType;
        this.dataMetric = dataMetric;
        this.historyLength = historyLength;
    }

    processData() {
        // TODO: Check for propery data input     

        switch(this.inputType) {
            case DataIOTypes.Entity:
                this.filterEntity();
                return this.transformEntity();
        }
    }

    filterEntity() {
        let filter;
        switch(this.filter.filterType) {
            case FilterTypes.Circle:
                filter = { circle: this.filter.circle }
                break;
            case FilterTypes.Shapes:
                filter = { geoJson: this.filter.shapes }
                break;
        }

        this.inputData = geoFilter(this.inputData, filter);
    }

    transformEntity() {
        let data = [];
        switch(this.outputType) {
            case DataIOTypes.Number:
                // Transform EntityData array to an array of attibute values 
                data = EntityDataToDataArray(this.inputData, this.attributes[0]);
                // Calculate relevant statistic
                return ReduceDataArrayToMetric(data, this.dataMetric);
                
            case DataIOTypes.Stats:
                // Transform EntityData array to an array of attibute values 
                data = EntityDataToDataArray(this.inputData, this.attributes[0]);
                // Calculate relevant statistic
                return ReduceDataArrayToStats(data, this.dataMetric);

            case DataIOTypes.XYPointArray:
                // Transform EntityData array to an array of attibute values 
                data = EntityDataToDataArray(this.inputData, this.attributes[0]);
                // Transform and group array data into to binned data
                return GroupDataArrayByValue(data);

            case DataIOTypes.XMultiYPointArray: 
                // Transform EntityData array to an matrix (array of array) of attibute values 
                data = EntityDataToDataMatrix(this.inputData, this.attributes);
                // Transform and group matrix data into to binned data
                return GroupDataMatrixByValue(data);    

            case DataIOTypes.XtYPointArray:
                return EntityDataToTimeSeriesData(this.inputData, this.attributes[0]);
                
            case DataIOTypes.XtMultiPointArray:
               return GroupEntityDataByDate(this.inputData, this.attributes, this.dataMetric, this.historyLength);

            case DataIOTypes.AttributeArray:
                return this.inputData.map((item : any)=>{
                    return { id:item.id, name:item.name, x:item.geo[0], y:item.geo[1], ...item.attr, time:item.time }
                })
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
