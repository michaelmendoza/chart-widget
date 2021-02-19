import { sort } from "d3";

const Stats = {
    
	sum: function(x:number[]) : number {
		if(x.length == 0) return 0;
		return x.reduce(function(a, b) { return a + b; });
	},

	mean: function(x:number[]) : number {
		if(x.length == 0) return 0;
		var sum = x.reduce(function(a, b) { return a + b; });
		var avg = sum / x.length;
		return avg;
	},
    
	median: function(x:number[]) : number {
		if(x.length == 0) return 0;
		var sortedArray = [...x];
		sortedArray.sort();
		const mid = Math.ceil(x.length / 2);
		const median = (x.length / 2) % 2 == 0 ? (sortedArray[mid] + sortedArray[mid - 1]) / 2 : sortedArray[mid - 1];
		return median;
	},

	variance: function(x:number[]) : number {
		if(x.length == 0) return 0;
		var mean = this.mean(x);
		var variance = x.reduce(function(a, b) { return a + ((b - mean) * (b - mean)) });
		variance = variance / x.length;
		return variance;
	},

	std: function(x:number[]) : number {
		return Math.sqrt(this.variance(x));
	},

	covariance:function(x:number[], y:number[]) : number {
		if(x.length == 0) return 0;
		var covariance = 0;
		var mean_x = this.mean(x);
		var mean_y = this.mean(y);
		for(var i = 0; i < x.length; i++) {
			covariance += (x[i] - mean_x) * (x[i] - mean_y);
		}
		covariance = covariance / x.length;
		return covariance;
	}

}

export default Stats;
