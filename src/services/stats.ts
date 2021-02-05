
const Stats = {
    
	mean: function(x:number[]) : number {
		var sum = x.reduce(function(a, b) { return a + b; });
		var avg = sum / x.length;
		return avg;
	},
    
	variance: function(x:number[]) : number {
		var mean = this.mean(x);
		var variance = x.reduce(function(a, b) { return a + ((b - mean) * (b - mean)) });
		variance = variance / x.length;
		return variance;
	},

	std: function(x:number[]) : number {
		return Math.sqrt(this.variance(x));
	},

	covariance:function(x:number[], y:number[]) : number {
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
