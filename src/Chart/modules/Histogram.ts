
import * as d3 from 'd3';
import Points from '../modules/points';

/** Takes an array of values and groups data into "bins" of equal width  */
export const DataArrayToBinnedXYArray = (data : number[]) => {
    var binCount = 5;
    var maxValue = d3.max(data, function(d) { return d; });
    var xmax : number = maxValue ? Math.round(maxValue):0;
    
    // Bin data using D3.bins
    var x = d3.scaleLinear()
        .domain([0, xmax])
    var bin = d3.bin()
        .domain([0, xmax])
        .thresholds(x.ticks(binCount - 1))
    var bins = bin(data);

    // Take bins and create an XYPoint Array 
    var values = bins.map((item)=> {
        return { x:item.x1, 
                 y:item.length,
                 label: item.x0?.toString() + ' - ' + item.x1?.toString()
                }
    })
    return values;
}

export const createTestBinData = () => {
    var dataPoints = Points.random(0, 10, 100); 
    return DataArrayToBinnedXYArray(dataPoints);
}