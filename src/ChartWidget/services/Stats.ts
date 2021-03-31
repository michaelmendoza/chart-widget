import { DataMetrics } from "../models/ChartTypes";

/**
 * Computes the sum of numbers.
 * @param x Input array of numbers
 */
export const sum = (x:number[]) : number => {
	if(x.length === 0) return 0;
	return x.reduce(function(a, b) { return a + b; });
}

/**
 * Computes the mean of numbers. Mean is also known as the average.
 * @param x Input array of numbers
 */
export const mean = (x:number[]) : number => {
	if(x.length === 0) return 0;
	var sum = x.reduce(function(a, b) { return a + b; });
	var avg = sum / x.length;
	return avg;
}

/**
 * Computes the median of numbers.
 * @param x Input array of numbers
 */
export const median = (x:number[]) : number => {
	if(x.length === 0) return 0;
	var sortedArray = [...x];
	sortedArray.sort();
	const mid = Math.ceil(x.length / 2);
	const median = (x.length / 2) % 2 === 0 ? (sortedArray[mid] + sortedArray[mid - 1]) / 2 : sortedArray[mid - 1];
	return median;
}

/**
 * Computes the variance of numbers. Variance expectation of the squared deviation of a random variable from its mean.
 * In other words, it measures how far a set of numbers is spread out from their average value.
 * @param x Input array of numbers
 */
export const variance = (x:number[]) : number => {
	if(x.length === 0) return 0;
	var _mean = mean(x);
	var variance = x.reduce(function(a, b) { return a + ((b - _mean) * (b - _mean)) });
	variance = variance / x.length;
	return variance;
}

/**
 * Computes the standard deviation of numbers.
 * @param x Input array of numbers
 */
export const std = (x:number[]) : number => {
	return Math.sqrt(variance(x));
}

/**
 * Computes the covariance of numbers. Covariance is a measure of the joint variability of two random variables.
 * @param x Input array of numbers
 */
export const covariance = (x:number[], y:number[]) : number => {
	if(x.length === 0) return 0;
	var covariance = 0;
	var mean_x = mean(x);
	var mean_y = mean(y);
	for(var i = 0; i < x.length; i++) {
		covariance += (x[i] - mean_x) * (x[i] - mean_y);
	}
	covariance = covariance / x.length;
	return covariance;
}

/**
 * Computes the moving average of numbers in a window 
 * @param x 
 * @param windowLength 
 * @returns 
 */
export const movingAverage = (x: number[], windowLength: number): number => {
	return 0;
}

/** 
 * Computes metric calculation
 */
export const calculateMetric = (data:number[], metric: DataMetrics): number => {
	switch(metric) {
        case DataMetrics.Count:
            return data.length;
        case DataMetrics.Sum:
            return sum(data);
        case DataMetrics.Mean:
            return mean(data);
        case DataMetrics.Median:
            return median(data);
        case DataMetrics.StdDev:
            return std(data);
        default:
            return 0;
    }
}
