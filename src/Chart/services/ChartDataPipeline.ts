
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
    
    fetch(feedName:string, attributes:string[] = [], type : ChartTypes, dataMetric : DataMetrics, historyLength: number, filters: IChartFilter) {
        console.log('Fetching Data from Data Source - feedName: ' + feedName + ', attribute: ' + attributes[0]);

        return ChartDataService.fetchEntityDataByFeed(feedName).then((res) => {
            let args = { inputData: res, attributes, type, inputType: DataIOTypes.Entity, outputType: DataIOTypes.Entity, dataMetric, historyLength, filters }

            switch(type) {
                case ChartTypes.Number:
                    args.outputType = DataIOTypes.Number;
                    break;
                case ChartTypes.Stats:
                    args.outputType = DataIOTypes.Stats;
                    break;
                case ChartTypes.Bar:
                    args.outputType = attributes.length === 1 ? DataIOTypes.XYPointArray : DataIOTypes.XMultiYPointArray;
                    break;
                case ChartTypes.Pie:
                case ChartTypes.LineArea:
                    args.outputType = DataIOTypes.XYPointArray
                    break;
                case ChartTypes.ScatterPlot:
                    args.outputType = DataIOTypes.XtYPointArray;
                    break;
                case ChartTypes.TimeSeries:
                    args.outputType =  DataIOTypes.XtMultiPointArray;
                    break;
                case ChartTypes.HeatMap:
                    args.outputType = DataIOTypes.Entity;
                    break;
                case ChartTypes.Table:
                    args.outputType = DataIOTypes.AttributeArray;
                    break;
            }

            const pipline = new DataPipeline( args )
            this.cache = pipline.processData();
            return this.cache;
        })    
    }
}

/** DataPipeline for single feed */
export class DataPipeline {
    inputData: any;
    attributes: string[];
    type: ChartTypes;
    filters: any;
    inputType : DataIOTypes;
    outputType : DataIOTypes;
    dataMetric : DataMetrics;
    historyLength: number;

    constructor({ inputData, attributes, type, inputType, outputType, dataMetric, historyLength, filters } : any) {
        this.inputData = inputData;
        this.attributes = attributes;
        this.type = type;
        this.filters = filters;
        this.inputType = inputType;
        this.outputType = outputType;
        this.dataMetric = dataMetric;
        this.historyLength = historyLength;
    }

    processData() {
        // TODO: Check for propery data input     

        switch(this.inputType) {
            case DataIOTypes.Entity:
                let data; 
                data = this.filter(this.inputData);
                data = this.transform(data);
                data = this.aggregate(data);
                data = this.reduce(data);
                return data;
        }
    }

    filter(inputData : any) {
        let filters;
        switch(this.filters.filterType) {
            case FilterTypes.Circle:
                filters = { circle: this.filters.circle }
                break;
            case FilterTypes.Shapes:
                filters = { geoJson: this.filters.shapes }
                break;
        }

        return geoFilter(inputData, filters);
    }

    transform = (data : any) => {
        switch(this.outputType) {
            case DataIOTypes.AttributeArray:
                return data.map((item : any)=>{
                    return { id:item.id, name:item.name, x:item.geo[0], y:item.geo[1], ...item.attr, time:item.time }
                })
            
            case DataIOTypes.Number:
            case DataIOTypes.Stats:
            case DataIOTypes.XYPointArray:
                // Transform EntityData array to an array of attibute values 
                return EntityDataToDataArray(data, this.attributes[0]);

            case DataIOTypes.XMultiYPointArray: 
                // Transform EntityData array to an matrix (array of array) of attibute values 
                return EntityDataToDataMatrix(data, this.attributes);

            case DataIOTypes.XtYPointArray:
                return EntityDataToTimeSeriesData(data, this.attributes[0]);
            
            default:
                return data;
        } 
    }

    aggregate = (data : any) => {
        switch(this.outputType) {
            case DataIOTypes.XYPointArray:
                // Transform and group array data into to binned data
                return GroupDataArrayByValue(data);

            case DataIOTypes.XMultiYPointArray: 
                // Transform and group matrix data into to binned data
                return GroupDataMatrixByValue(data);    
                
            case DataIOTypes.XtMultiPointArray:
               return GroupEntityDataByDate(data, this.attributes, this.dataMetric, this.historyLength);

            default:
                return data;
        }
    }

    reduce = (data : any) => {
        switch(this.outputType) {
            case DataIOTypes.Number:
                // Calculate relevant statistic
                return ReduceDataArrayToMetric(data, this.dataMetric);
                
            case DataIOTypes.Stats:
                // Calculate relevant statistic
                return ReduceDataArrayToStats(data, this.dataMetric);
            
            default: 
                return data;
        }
    }
}
