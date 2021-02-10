
//<LineAreaChart width={500} height={500} data={_data}></LineAreaChart>
//<BarChart width={500} height={500} data={[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}></BarChart>
//<HistogramChart width={500} height={500} data={[2,2,2,2,2,4,6,7,3,4]}></HistogramChart>
//<PieChart width={500} height={500} data={[46, 28, 26]}></PieChart>
//const _data = Points.gaussianModel(-3, 3, 100, 1, 0.5);

import * as d3 from 'd3';

const transformEntityToBins = (data : any) => {
    var binMax = 10;
    var binCount = 10;
    var xmax = binMax;

    var x = d3.scaleLinear()
        .domain([0, xmax])
    var bin = d3.bin()
        .domain([0, xmax])
        .thresholds(x.ticks(binCount - 1))
    var bins = bin(data);
    return bins;
}

const binsToPointArray = (bins : d3.Bin<number, number>[]) => {
    var values = bins.map((item)=> {
        return { x:item.x0?.toString() + ' - ' + item.x1?.toString(), y:item.length }
    })
    return values;
}

const binsToXYArrays = (bins: d3.Bin<number, number>[]) => {
    var y = bins.map((item) => {
        return item.length;
    })
    var x = bins.map((item) => {
        return item.x0?.toString() + ' - ' + item.x1?.toString()
    })
    return { x, y }
}

const ChartMockData = {
    
    getEntityData: () => {
        return [
            { id:'0', name:'layer0', geo:{x:0,y:1}, attr:{a:10, b:12, c:14, d:14}}
        ];
    },

    transformEntityToBarChartData: (data : any) => {
        var bins = transformEntityToBins(data);
        return binsToPointArray(bins);
    },

    transformEntityToPieChartData: (data : any) => {
        var bins = transformEntityToBins(data);
        return binsToXYArrays(bins);
    },

    getChartData: () => {
        return [
            {id:'0', data:[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]},
            {id:'1', data:[]},
            {id:'2', data:[]}
        ]
    }

}

export default ChartMockData;