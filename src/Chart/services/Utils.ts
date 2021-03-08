
const Utils = {
    /** 
     * Returns an array of all integers from start to end. (Python like functionality)
     * Ref: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
     * */
    range: (start : number, end : number) => {
        const length = end - start;
        return Array.from({ length }, (_, i) => start + i);
    },

	random: function(min:number, max:number) : number {		
        return Math.random() * (max - min) + min;
	},

	randomInt: function(min:number, max:number) : number {		
        return Math.round(Math.random() * (max - min) + min);
	},

    randomCircle: (center : number[], radius : number) => {
        let rRadius = Utils.random(0, radius);
        let rAngle = Utils.random(-Math.PI, Math.PI)    
        let x = rRadius * Math.cos(rAngle) + center[0];
        let y = rRadius * Math.sin(rAngle) + center[1];
        return [x, y]
    },

    randomNormal:(mean: number, std: number) => {
        // Box-Muller transform (https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve/36481059#36481059)
        var u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        var standard = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        return mean + standard * std; 
    },

    isNumber: (value: string | number): boolean => {
        return ((value != null) &&
                (value !== '') &&
                !isNaN(Number(value.toString())));
    }
}

export default Utils;