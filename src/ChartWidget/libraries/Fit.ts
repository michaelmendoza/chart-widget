import * as Stats from './Stats';

/**
 * Returns the coefficents for a simple linear regression model given a set of x, y data. 
 * Coefficents are calculated using ordinary least squares. Given the model 
 * y[i] = alpha * beta * x[i], the set of parameters (alpha, beta) are calculated 
 * as beta = covariance(x,y) / variance(x) and alpha = avg(y) - beta * avg(x)
 */
export const simpleLinearRegression = (x : number[], y : number[]) => {

	const beta = Stats.covariance(x, y) / Stats.variance(x);
	const alpha = Stats.mean(y) - beta * Stats.mean(x);

	return { alpha, beta };
};