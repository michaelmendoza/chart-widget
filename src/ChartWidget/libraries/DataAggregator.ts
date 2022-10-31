
import * as d3 from 'd3';
import { IEntityDataPoint } from '../models/ChartInterfaces';
import { DataMetrics } from '../models/ChartEnums';
import * as Points from './Points';
import * as Stats from './Stats';
import * as StatsInPlace from './StatsInPlace';
import Utils from './Utils';

const milliSecondsInDay = 1000 * 60 * 60 * 24;

/**
 *  Takes an array of values and groups data into "bins" of equal width. 
 *  Place top bin value in x, and count of elements in bins in y. 
 * @returns [{x, y}]
 */
export const GroupDataArrayByValue = (data : number[], binCount : number = 5) => {

    const maxValue = d3.max(data, (d) => d);
    const xmax : number = maxValue ? Math.round(maxValue) : 0;
    
    // Bin data using D3.bins
    const x = d3.scaleLinear()
        .domain([0, xmax]);
    const ticks = x.ticks(binCount - 1);
    const bin = d3.bin();
        //.domain([0, xmax])
        //.thresholds(ticks)
    
    const bins = bin(data);

    // Take bins and create an XYPoint Array 
    const values = bins.map((item) => ({ x: item.x1, 
                 y: item.length,
                 label: item.x0?.toString() + ' - ' + item.x1?.toString()}));
    return values;
};

/**
 *  Takes an array of array of values and groups data into "bins" of equal width. 
 *  Place top bin value in x, and count of elements in bins in y. 
 * @returns [{x, [y]}]
 */
export const GroupDataMatrixByValue = (data : any[], binCount : number = 5) => {

    // Calculation max value for all data values 
    let maxValue : number = 0;
    data.forEach((dataArray : any[]) => {
        const itemMaxValue : number = d3.max(dataArray, (d) => d);
        maxValue = Math.max(maxValue, itemMaxValue);
    });
    const xmax : number = maxValue ? Math.round(maxValue) : 0;
    
    // Bin data using D3.bins
    const x = d3.scaleLinear()
        .domain([0, xmax]);
    const bin = d3.bin()
        .domain([0, xmax])
        .thresholds(x.ticks(binCount - 1));

    // Take bins and create an XMultiYPoint Array 
    const bins = bin([]);
    const values = bins.map((item) => {
        const y : number[] = [];
        return { x: item.x1, y, label: item.x0?.toString() + ' - ' + item.x1?.toString() };
    });

    // Populate y values for XMultiYPoint Array 
    data.forEach((dataArray : any[]) => {
        const bins = bin(dataArray);
        bins.forEach((item, index) => {
            values[index].y.push(item.length);
        });
    });
    
    // values = [{ x, y[], label }]
    return values;
};

/**
 * Transforms an array of entities, into an array of attribute values 
 * @param data 
 * @param attribute 
 * @returns 
 */
export const EntityDataToDataArray = (data : IEntityDataPoint[], attribute : string) : number [] => {
    const dataArray : any[] = [];
    data.forEach((item : any) => {  
        dataArray.push(item.attr[attribute]);
    });
    return dataArray;
};

/**
 * Transforms entity data into data matrix M[attr][value] 
 * @param data Entity data array
 * @param attributes attribute array 
 */
export const EntityDataToDataMatrix = (data : IEntityDataPoint [], attributes : string []) => {
    // Allocated memory for data matrix M[attr][value]
    const dataMatrix = new Array(attributes.length);
    attributes.forEach((attribute : any, index : number) => {
        dataMatrix[index] = new Array(data.length);
    });

    data.forEach((dataitem : any, dataIndex : number) => {  
        attributes.forEach((attribute : any, attrIndex : number) => {
            dataMatrix[attrIndex][dataIndex] = dataitem.attr[attribute];
        });    
    });

    return dataMatrix;
};

/**
 * Transforms EntityData array to an an array of x, y values. Where x is time, y is the specified attribute. 
 * @param data 
 * @param attribute 
 * @returns 
 */
export const EntityDataToTimeSeriesData = (data : IEntityDataPoint[], attribute : string) => data.map((item : any) => ({ x: new Date(item.time), y: item.attr[attribute] }));

/**
 * Aggregates data by grouping entity data by date into bins according to a metric. For use by time series. 
 * @param data Entity data array
 * @param attributes Array of attributes to group
 * @param metric Metric for aggregation
 * @param historyLength Number of bins for time series grouping 
 * @param binSize Width of bins in time (default 1 day)
 * @returns [{x (time), [y]}]
 */
export const GroupEntityDataByDate = (data : IEntityDataPoint[], 
                                      attributes : string[], 
                                      metric : DataMetrics, 
                                      historyLength : number = 30,
                                      binSize : number = milliSecondsInDay) => {
                                    
    // Format data to { x, y[] }
    const timeSeriesData = data.map((item : any) => {
        const y = attributes.map((attribute) => item.attr[attribute]);
        return { x: new Date(item.time), y };
    });
    
    // Create bins of size binSize
    const endTime = (new Date()).getTime();
    const startTime = endTime - historyLength * binSize;
    const times = Utils.range(1, historyLength + 1);
    const bins : number[][][] = times.map(() => [[], []]); // bins[date_bucket][attr][data_points]

    // Groups data into "bins" of binSize width.
    timeSeriesData.forEach((item : any) => {
        const dateBucketIndex = Math.floor(historyLength * (item.x.getTime() - startTime) / (endTime - startTime));
        if (0 <= dateBucketIndex && dateBucketIndex < bins.length) {
            // Interate through attributes and bin 
            for (let index = 0; index < attributes.length; index++) {
                bins[dateBucketIndex][index].push(item.y[index]);
            }
        }
    });
    
    // Aggregate data for specified metric 
    const values = bins.map((dateBucket, index) => {
        const x = new Date(startTime + (endTime - startTime) / historyLength * index);
        const y = [];

        // Interate through attributes and calculate metric for this datebucket bin 
        for (let index = 0; index < attributes.length; index++) {
            y.push(Stats.calculateMetric(dateBucket[index], metric));
        }

        return { x, y };
    });

    return values;
};

/**
 * Reduces an array of number to a data metric 
 * @param data 
 * @param metric 
 * @returns 
 */
export const ReduceDataArrayToMetric = (data : number[], metric : DataMetrics) => {
    switch (metric) {
        case DataMetrics.Count:
            return data.length;
        case DataMetrics.Sum:
            return Stats.sum(data);
        case DataMetrics.Mean:
            return Stats.mean(data);
        case DataMetrics.Median:
            return Stats.median(data);
        case DataMetrics.StdDev:
            return Stats.std(data);
        default:
            return 0;
    }
};

/**
 * 
 * @param data Reduces an array of number to a object with data metrics i.e. { count, sum, mean, median, stddev }
 * @param metric 
 * @returns An object of form: { count, sum, mean, median, stddev }
 */
export const ReduceDataArrayToStats = (data : number[]) => ({
        count: data.length,
        sum: Stats.sum(data),
        mean: Stats.mean(data),
        median: Stats.median(data),
        stddev: Stats.std(data)
    });

/**
 * Reduces a dictionary with entity arrays to a data metric 
 * @param {*} dict 
 * @param {string} attribute 
 * @param {*} metric 
 * @returns 
 */
 export const ReduceEntityDictToMetric = (dict:{[key:string]: IEntityDataPoint[]}, attribute:string, metric: DataMetrics) => {
    const keys = Object.keys(dict);
    const result: any = {};
    keys.forEach((key) => {
        const entityDataArray = dict[key];
        result[key] = Stats.calculateMetric(EntityDataToDataArray(entityDataArray, attribute), metric);
    });
    return result;
};

// 
/**
 * Reduces a dictionary with entity arrays to a data metric. Caluculations are done in place using Entity 
 * object structure for attributes. Note: 1.457s to 1.212s (16.8% decrease) by calculating in place for N = 1000000
 * @param {*} dict 
 * @param {string} attribute 
 * @param {*} metric 
 * @returns 
 */
export const ReduceEntityDictToMetricInPlace = (dict:{[key:string]: IEntityDataPoint[]}, attribute:string, metric:DataMetrics) => {
    const keys = Object.keys(dict);
    const result:any = {};
    keys.forEach((key) => {
        const entityDataArray = dict[key];
        result[key] = StatsInPlace.calculateMetric(entityDataArray, attribute, metric);
    });
    return result;
};

export const createTestBinData = () => {
    const dataPoints = Points.random(0, 10, 100); 
    return GroupDataArrayByValue(dataPoints);
};