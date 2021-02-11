import * as d3 from 'd3';
import Points from '../modules/points';

const transformEntityToBins = (data : any) => {
    var binMax = 10;
    var binCount = 5;
    var xmax = binMax;

    var x = d3.scaleLinear()
        .domain([0, xmax])
    var bin = d3.bin()
        .domain([0, xmax])
        .thresholds(x.ticks(binCount - 1))
    var bins = bin(data);

    var lastBin = bins.pop()
    lastBin?.forEach(item => bins[binCount-1].push(item));
    return bins;
}

const binsToPointArray = (bins : d3.Bin<number, number>[]) => {
    var values = bins.map((item)=> {
        return { x:item.x1, 
                 y:item.length,
                 label: item.x0?.toString() + ' - ' + item.x1?.toString()
                }
    })
    return values;
}

const ChartMockData = {
    
    mockEntityFactory: () => {

    },

    getEntityData: () => {
        return [
            { id:'0', name:'layer0', geo:{x:0,y:1}, attr:{a:10, b:12, c:14, d:14}}
        ];
    },

    getEntityAttributeData: () => {
        var dataPoints = Points.random(0, 10, 100); // entityAttributeDataPoints
        var bins = transformEntityToBins(dataPoints);
        return binsToPointArray(bins);
    },

    getChartData: () => {
        var feedCount = 4;
        var data = new Array(feedCount);
        for(var i = 0; i < feedCount; i++)
            data[i] = ChartMockData.getEntityAttributeData();

        return data.map((item, index)=> {
            return {id:index, data:item}
        })
    }

}

export default ChartMockData;