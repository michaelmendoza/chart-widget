
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

}

export default Utils;