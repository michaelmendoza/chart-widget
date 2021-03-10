export interface IPoint {
    x:number,
    y:number
}

export interface IXYArray {
	x:number[],
	y:number[]
}

/**
 * Transforms two arrays (XYArray) into an array of points.
 * @param x array
 * @param y array
 */
export const toPointArray = (x:number[], y:number[]) : IPoint[] => {
	var data = [];
	for(var i = 0; i < x.length; i++)
		data.push({ x:x[i], y:y[i] })
	return data;
}

/**
 * Transforms an array of points into an two arrays (XYArray).
 * @param points 
 */
export const toXYArray = (points:IPoint[]) : IXYArray => {
	var x = [];
	var y = [];
	for(var i = 0; i < points.length; i++) {
		x.push(points[i].x);
		y.push(points[i].y);
	}
	return { x:x, y:y };
}
    
/**
 * Return evenly spaced numbers over a specified interval.
 * @param min The starting value of the sequence
 * @param max The end value of the sequence
 * @param N Number of samples to generate. Default is 50. Must be non-negative.
 */
export const linspace = (min:number, max:number, N:number = 50) => {
	var x = new Array(N);
	var step = (max - min) / N;
	for(var i = 0; i < N; i++)
		x[i] = min + i * step ;
	return x;
}

/**
 * Computes gaussian values with mean, and std.
 * @param x Input array
 * @param mean Mean
 * @param std Standard deviation
 */
export const gaussian = (x:number[], mean:number, std:number) => {
	var length = x.length;
	var y = new Array(length);
	var alpha = (1/(std * Math.sqrt(2 * Math.PI)));
	var beta = - 1 / (2 * std * std);
	for(var i = 0; i < length; i++)
		y[i] = alpha * Math.exp(beta * (x[i] - mean) * (x[i] - mean));
	return y;
}

/**
 * Returns a random values (uniform distribution) between min and max.
 * @param min Min value
 * @param max Max value
 * @param N Number of samples to generate
 */
export const random = (min:number, max:number, N:number = 1) : number[] => {		
	var array = [];
	for(var i = 0; i < N; i++) {
		array.push(Math.random() * (max - min) + min);
	}
	return array;
}

/**
 * Returns a random integer values (uniform distribution) between min and max.
 * @param min min value
 * @param max max value
 * @param N Number of samples to generate
 */
export const randomInt = (min:number, max:number, N:number = 1) : number[] => {
	var array = [];
	for(var i = 0; i < N; i++) {
		array.push(Math.round(Math.random() * (max - min) + min));
	}
	return array;
}
    
/**
 * Computes a linear regression model with alpha and beta.
 * @param x Input array
 * @param alpha constant model coefficient
 * @param beta linear model coefficeint (first-order)
 */
export const linearModel = (x:number[], alpha:number, beta:number) => {
	var y = x.map(function(x) {
		return alpha + beta * x;
	})
	return y;
}
    
/**
 * Computes gaussian values with mean, and std. Output is formated an a point array.
 * @param x Input array
 * @param min Min input value
 * @param max Max input value
 * @param N Number of samples to generate
 * @param mean Mean
 * @param std Standard deviation
 */
export const gaussianModel = (min:number, max:number, N:number, mean:number, std:number) => {
	var x = linspace(min, max, N);
	var y = gaussian(x, mean, std);
	return toPointArray(x, y);
}
