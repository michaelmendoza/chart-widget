
export const sum = (x:number[]) : number => {
	if(x.length === 0) return 0;
	return x.reduce(function(a, b) { return a + b; });
}

export const mean = (x:number[]) : number => {
		if(x.length === 0) return 0;
		var sum = x.reduce(function(a, b) { return a + b; });
		var avg = sum / x.length;
		return avg;
	}

export const median = (x:number[]) : number => {
		if(x.length === 0) return 0;
		var sortedArray = [...x];
		sortedArray.sort();
		const mid = Math.ceil(x.length / 2);
		const median = (x.length / 2) % 2 === 0 ? (sortedArray[mid] + sortedArray[mid - 1]) / 2 : sortedArray[mid - 1];
		return median;
	}

export const variance = (x:number[]) : number => {
		if(x.length === 0) return 0;
		var _mean = mean(x);
		var variance = x.reduce(function(a, b) { return a + ((b - _mean) * (b - _mean)) });
		variance = variance / x.length;
		return variance;
	}

export const std = (x:number[]) : number => {
		return Math.sqrt(variance(x));
	}

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

export const movingAverage = (x: number[], windowLength: number): number => {
	return 0;
}
