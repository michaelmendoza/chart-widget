
const Utils = {
    /** 
     * Returns an array of all integers from start to end. (Python like functionality)
     * Ref: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
     * */
    range: (start : number, end : number) => {
        const length = end - start;
        return Array.from({ length }, (_, i) => start + i);
    },

    /** Returns boolearn values for whether a value is a number */
    isNumber: (value: string | number): boolean => {
        return ((value != null) &&
                (value !== '') &&
                !isNaN(Number(value.toString())));
    }
}

export default Utils;