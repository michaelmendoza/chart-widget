import { IEntityDataPoint } from "../models/ChartModels";
import { DataMetrics } from "../models/ChartTypes";

/** Returns value from attr key from attr property - For use with IEntityDataPoint */
const fn = (x:IEntityDataPoint, attr:string) => {
    return x.attr[attr];
}

/**
 * Computes the sum of numbers.
 * @param x Input array of numbers
 */
export const sum = (x:IEntityDataPoint[], attr:string) => {
    if(x.length === 0) return 0;
    return x.reduce(function(a, b) { return a + fn(b, attr); }, 0);
}

/**
 * Computes the mean of numbers. Mean is also known as the average.
 * @param x Input array of numbers
 */
export const mean = (x:IEntityDataPoint[], attr:string) => {
    if(x.length === 0) return 0;
    var sum = x.reduce(function(a, b) { return a + fn(b, attr); }, 0);
    var avg = sum / x.length;
    return avg;
}

/**
 * Computes the median of numbers.
 * @param x Input array of numbers
 */
export const median = (x:IEntityDataPoint[], attr:string) => {
    if(x.length === 0) return 0;
    var sortedArray = [...x];
    sortedArray.sort((a:any, b)=> {
        return a.attr[attr] - fn(b, attr);
    });
    const mid = Math.ceil(x.length / 2);
    const median = (x.length / 2) % 2 === 0 ? (fn(sortedArray[mid], attr) + fn(sortedArray[mid - 1], attr)) / 2 : fn(sortedArray[mid - 1], attr);
    return median;
}

/**
 * Computes the variance of numbers. Variance expectation of the squared deviation of a random variable from its mean.
 * In other words, it measures how far a set of numbers is spread out from their average value.
 * @param x Input array of numbers
 */
export const variance = (x:IEntityDataPoint[], attr:string) => {
    if(x.length === 0) return 0;
    var _mean = mean(x, attr);
    var variance = x.reduce(function(a, b) { return a + ((fn(b, attr) - _mean) * (fn(b, attr) - _mean)) }, 0);
    variance = variance / x.length;
    return variance;
}

/**
 * Computes the standard deviation of numbers.
 * @param x Input array of numbers
 */
export const std = (x:IEntityDataPoint[], attr:string) => {
    return Math.sqrt(variance(x, attr));
}

/** 
 * Computes metric calculation (InPlace)
 */
export const calculateMetric = (data: IEntityDataPoint[], attribute: string, metric: DataMetrics) => {
    switch(metric) {
        case DataMetrics.Count:
            return data.length;
        case DataMetrics.Sum:
            return sum(data, attribute);
        case DataMetrics.Mean:
            return mean(data, attribute);
        case DataMetrics.Median:
            return median(data, attribute);
        case DataMetrics.StdDev:
            return std(data, attribute);
        default:
            return 0;
    }
}