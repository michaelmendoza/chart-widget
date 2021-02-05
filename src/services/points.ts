export interface IPoint {
    x:number,
    y:number
}

const Points = {

    toPointArray: function(x:number[], y:number[]) : IPoint[] {
		var data = [];
		for(var i = 0; i < x.length; i++)
			data.push({ x:x[i], y:y[i] })
		return data;
	},

	toXYArray: function(points:IPoint[]) {
		var x = [];
		var y = [];
		for(var i = 0; i < points.length; i++) {
			x.push(points[i].x);
			y.push(points[i].y);
		}
		return { x:x, y:y };
    },
    
    linspace: function(min:number, max:number, N:number) {
		var x = new Array(N);
		var step = (max - min) / N;
		for(var i = 0; i < N; i++)
			x[i] = min + i * step ;
		return x;
	},

	gaussian: function(x:number[], mean:number, std:number) {
		var length = x.length;
		var y = new Array(length);
		var alpha = (1/(std * Math.sqrt(2 * Math.PI)));
		var beta = - 1 / (2 * std * std);
		for(var i = 0; i < length; i++)
			y[i] = alpha * Math.exp(beta * (x[i] - mean) * (x[i] - mean));
		return y;
	},

	random: function(min:number, max:number, N:number) {
		if( N === undefined )
			return Math.random() * (max - min) + min;
		else {
			var array = [];
			for(var i = 0; i < N; i++) {
				array.push(Math.random() * (max - min) + min);
			}
			return array;
		}
	},

	randomInt: function(min:number, max:number, N:number) {
		if( N === undefined )
			return Math.round(Math.random() * (max - min) + min);
		else {
			var array = [];
			for(var i = 0; i < N; i++) {
				array.push(Math.round(Math.random() * (max - min) + min));
			}
			return array;
		}
    },
    
	linearModel: function(x:number[], alpha:number, beta:number) {
		var y = x.map(function(x) {
			return alpha + beta * x;
		})
		return y;
    },
    
    gaussianModel: function (min:number, max:number, N:number, mean:number, std:number) {
		var x = this.linspace(min, max, N);
		var y = this.gaussian(x, mean, std);
		return this.toPointArray(x, y);
	}
}

export default Points;
