
import * as d3 from 'd3';
import { IEntityDataPoint } from '../models/ChartModels';
import { DataMetrics } from '../models/ChartTypes';
import Points from '../modules/points';
import Stats from '../modules/stats';
import Utils from '../modules/utils';

/**
 *  Takes an array of values and groups data into "bins" of equal width. 
 *  Place top bin value in x, and count of elements in bins in y. 
 */
export const GroupDataArrayByValue = (data : number[], binCount : number = 5) => {

    var maxValue = d3.max(data, function(d) { return d; });
    var xmax : number = maxValue ? Math.round(maxValue):0;
    
    // Bin data using D3.bins
    var x = d3.scaleLinear()
        .domain([0, xmax])
    var ticks = x.ticks(binCount - 1)
    var bin = d3.bin()
        .domain([0, xmax])
        .thresholds(ticks)
    
    var bins = bin(data);

    // Take bins and create an XYPoint Array 
    var values = bins.map((item)=> {
        return { x:item.x1, 
                 y:item.length,
                 label: item.x0?.toString() + ' - ' + item.x1?.toString()
                }
    })
    return values;
}

export const GroupDataMatrixByValue = (data : any[], binCount : number = 5) => {

    // Calculation max value for all data values 
    var maxValue : number = 0;
    data.forEach((dataArray : any[])=> {
        let itemMaxValue : number = d3.max(dataArray, function(d) { return d; });
        maxValue = Math.max(maxValue, itemMaxValue);
    })
    var xmax : number = maxValue ? Math.round(maxValue):0;
    
    // Bin data using D3.bins
    var x = d3.scaleLinear()
        .domain([0, xmax])
    var bin = d3.bin()
        .domain([0, xmax])
        .thresholds(x.ticks(binCount - 1))

    // Take bins and create an XMultiYPoint Array 
    var bins = bin([]);
    var values = bins.map((item)=> {
        return { x:item.x1, y:new Array(), label: item.x0?.toString() + ' - ' + item.x1?.toString() }
    })

    // Populate y values for XMultiYPoint Array 
    data.forEach((dataArray : any[])=>{
        var bins = bin(dataArray);
        bins.forEach((item, index)=> {
            values[index].y.push(item.length)
        })
    })
    
    // values = [{ x, y[], label }]
    return values;
}

export const EntityDataToDataArray = (data : IEntityDataPoint[], attribute : string) : number [] => {
    const dataArray = new Array();
    data.forEach((item : any)=> {  
        dataArray.push(item.attr[attribute]);
    })
    return dataArray;
}

/**
 * Transforms entity data into data matrix M[attr][value] 
 * @param data Enityt data array
 * @param attributes attribute array 
 */
export const EntityDataToDataMatrix = (data : IEntityDataPoint[], attributes : string[]) => {
    // Allocated memory for data matrix M[attr][value]
    const dataMatrix = new Array(attributes.length);
    attributes.forEach((attribute : any, index : number)=> {
        dataMatrix[index] = new Array(data.length);
    })

    data.forEach((dataitem : any, dataIndex : number)=> {  
        attributes.forEach((attribute : any, attrIndex : number) => {
            dataMatrix[attrIndex][dataIndex] = dataitem.attr[attribute];
        })    
    })

    return dataMatrix;
}

export const EntityDataToTimeSeriesData = (data : IEntityDataPoint[], attribute : string) => {
    return data.map((item : any) => {
        return { x:item.time, y:item.attr[attribute] }
    })    
}

const milliSecondsInDay = 1000 * 60 * 60 * 24;
export const GroupEntityDataByDate = (data : IEntityDataPoint[], 
                                      attributes : string[], 
                                      metric : DataMetrics, 
                                      historyLength : number = 30,
                                      binSize : number = milliSecondsInDay) => {

    // Format data to { x, y[] }
    const timeSeriesData = data.map((item : any) => {
        return { x:item.time, y:[item.attr[attributes[0]], item.attr[attributes[1]]] }
    })

    // Create bins of size binSize
    const endTime = (new Date()).getTime();
    const startTime =  endTime - historyLength * binSize;
    const times = Utils.range(1, historyLength + 1);
    const bins : number[][][] = times.map(() => [new Array(), new Array()]); // bins[date_bucket][attr][data_points]

    // Groups data into "bins" of binSize width.
    timeSeriesData.forEach((item : any) => {
        var dateBucketIndex = Math.floor(historyLength * (item.x.getTime() - startTime) / (endTime - startTime))
        //bins[dateBucketIndex].push(item.y);
        bins[dateBucketIndex][0].push(item.y[0]);
        bins[dateBucketIndex][1].push(item.y[1]);
    })

    // Aggregate data for specified metric 
    const values =  bins.map((dateBucket, index) => {
        const x = index; // startTime + (endTime - startTime) / historyLength * index

        switch(metric) {
            case DataMetrics.Count:
                return { x:x, y:[dateBucket[0].length, dateBucket[1].length]} 
            case DataMetrics.Sum:
                return { x:x, y:[Stats.sum(dateBucket[0]), Stats.sum(dateBucket[1])]}
            case DataMetrics.Mean:
                return { x:x, y:[Stats.mean(dateBucket[0]), Stats.mean(dateBucket[1])]}
            case DataMetrics.Median:
                return { x:x, y:[Stats.median(dateBucket[0]), Stats.median(dateBucket[1])]}
            case DataMetrics.StdDev:
                return { x:x, y:[Stats.std(dateBucket[0]), Stats.std(dateBucket[1])]}
        }
    })

    return values;
}

export const createTestBinData = () => {
    var dataPoints = Points.random(0, 10, 100); 
    return GroupDataArrayByValue(dataPoints);
}