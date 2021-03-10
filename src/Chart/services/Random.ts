
/**
 * Returns a random value (uniform distribution) between min and max
 * @param min min value
 * @param max max value
 */
export const random = (min:number, max:number) : number => {		
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer value (uniform distribution) between min and max
 * @param min min value
 * @param max max value
 */
export const randomInt = (min:number, max:number) : number => {		
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Returns a random value (uniform distribution) with a circle with center and radius
 * @param center center position [x, y]
 * @param radius radius value
 */
export const randomCircle = (center : number[], radius : number) => {
    let rRadius = random(0, radius);
    let rAngle = random(-Math.PI, Math.PI)    
    let x = rRadius * Math.cos(rAngle) + center[0];
    let y = rRadius * Math.sin(rAngle) + center[1];
    return [x, y]
}

/**
 * Returns a random value (normal distribution) between min and max
 * @param min min value
 * @param max max value
 */
export const randomNormal = (mean: number, std: number) => {
    // Box-Muller transform (https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve/36481059#36481059)
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    var standard = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return mean + standard * std; 
}