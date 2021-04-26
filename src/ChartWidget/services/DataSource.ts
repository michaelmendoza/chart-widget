
import { ChartTypes, DataMetrics } from '../models/ChartTypes';
import ChartDataService from './ChartDataService';
import { IChartFilter, IFeedProperties } from '../models/ChartModels';
import { DataPipeline } from './DataPipeline';

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
    
    fetch(feed:IFeedProperties, attributes:string[] = [], type : ChartTypes, dataMetric : DataMetrics, historyLength: number, filters: IChartFilter) {
        console.log('Fetching Data from Data Source - feedName: ' + feed.name + ', attribute: ' + attributes[0]);

        return ChartDataService.fetchEntityDataByFeed(feed).then((res) => {
            let args = { inputData: res, attributes, type, inputType: DataIOTypes.Entity, outputType: DataIOTypes.Entity, dataMetric, historyLength, filters }
            
            // Remove attributes that are empty or null
            args.attributes = args.attributes.filter(item => item !== "");

            switch(type) {
                case ChartTypes.Number:
                    args.outputType = DataIOTypes.Number;
                    break;
                case ChartTypes.Stats:
                    args.outputType = DataIOTypes.Stats;
                    break;
                case ChartTypes.Bar:
                    args.outputType = args.attributes.length === 1 ? DataIOTypes.XYPointArray : DataIOTypes.XMultiYPointArray;
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

            this.cache = DataPipeline( args )
            return this.cache;
        })    
    }
}

