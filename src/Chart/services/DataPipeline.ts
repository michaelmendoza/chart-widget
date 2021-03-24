
import { FilterTypes } from '../models/ChartTypes';
import { EntityDataToDataArray, EntityDataToDataMatrix, EntityDataToTimeSeriesData, GroupDataArrayByValue, GroupDataMatrixByValue, GroupEntityDataByDate, ReduceDataArrayToMetric, ReduceDataArrayToStats } from './DataAggregator';
import { geoFilter } from '../../DataMap/services/GeoFilter';
import { DataIOTypes } from './DataSource';
import { GeoAdapter } from './DataAdapter';

/** DataPipeline for single feed */
export const DataPipeline = ({ inputData, attributes, type, inputType, outputType, dataMetric, historyLength, filters } : any) => {
    
    /** Run data pipeline  */
    const run = () => {
        validate(inputData);

        let start = Date.now();
        let data; 
        switch(inputType) {
            case DataIOTypes.Entity:
                data = adapt(inputData);
                data = filter(data);
                data = transform(data);
                data = aggregate(data);
                data = reduce(data);
        }
        let delta = Date.now() - start
        console.log('Pipeline Processing Complete in: ' + (delta / 1000) + ' seconds.');

        return data;
    }
    
    const validate = (data : any) => {
        // TODO: Check for propery data input     
    }

    const adapt = (data : any) => {
        return GeoAdapter(data)
    }

    const filter = (data : any) => {
        let activeFilter;
        switch(filters.filterType) {
            case FilterTypes.Circle:
                activeFilter = { circle: filters.circle }
                break;
            case FilterTypes.Shapes:
                activeFilter = { geoJson: filters.shapes }
                break;
        }
        
        return geoFilter(data, activeFilter);
    }

    const transform = (data : any) => {
        switch(outputType) {
            case DataIOTypes.AttributeArray:
                return data.map((item : any)=>{
                    return { id:item.id, name:item.name, x:item.geo[0], y:item.geo[1], ...item.attr, time:item.time }
                })
            
            case DataIOTypes.Number:
            case DataIOTypes.Stats:
            case DataIOTypes.XYPointArray:
                // Transform EntityData array to an array of attibute values 
                return EntityDataToDataArray(data, attributes[0]);

            case DataIOTypes.XMultiYPointArray: 
                // Transform EntityData array to an matrix (array of array) of attibute values 
                return EntityDataToDataMatrix(data, attributes);

            case DataIOTypes.XtYPointArray:
                return EntityDataToTimeSeriesData(data, attributes[0]);
            
            default:
                return data;
        } 
    }

    const aggregate = (data : any) => {
        switch(outputType) {
            case DataIOTypes.XYPointArray:
                // Transform and group array data into to binned data
                return GroupDataArrayByValue(data);

            case DataIOTypes.XMultiYPointArray: 
                // Transform and group matrix data into to binned data
                return GroupDataMatrixByValue(data);    
                
            case DataIOTypes.XtMultiPointArray:
               return GroupEntityDataByDate(data, attributes, dataMetric, historyLength);

            default:
                return data;
        }
    }

    const reduce = (data : any) => {
        switch(outputType) {
            case DataIOTypes.Number:
                // Calculate relevant statistic
                return ReduceDataArrayToMetric(data, dataMetric);
                
            case DataIOTypes.Stats:
                // Calculate relevant statistic
                return ReduceDataArrayToStats(data, dataMetric);
            
            default: 
                return data;
        }
    }

    return run();
}
