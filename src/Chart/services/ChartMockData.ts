import * as d3 from 'd3';
import Points from '../modules/points';
import Utils from '../modules/utils';

const histogramDataToBins = (data : any) => {
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

export const createtestData = () => {
    var dataPoints = Points.random(0, 10, 100); 
    var bins = histogramDataToBins(dataPoints);
    return binsToPointArray(bins);
}

const transformDataToChartData = (data : any) => {
    var bins = histogramDataToBins(data);
    return binsToPointArray(bins);
}

var entityData: any[] = [];
const layerNames = ['Lightning', 'Hopsitals', 'Traffic', 'Population'];

const ChartMockData = {
        
    /**
     * Creates a mock entity data array of size count.
     * 
     * Entity data is of form: { id, name, geo: {x, y}, attr: { a, b, c, d }}
     * @param count Size of entity data array
     */
    createEntityData: (count : number) => {
        
        const ids = Utils.range(0, count);
        const data = ids.map((id) => {
            const name = layerNames[Utils.randomInt(0,3)];
            const geo = { x:Utils.random(-1,1), y:Utils.random(-1,1) }
            const attr = { a:Utils.random(0, 100), b:Utils.random(0, 50), c:Utils.random(0, 1000), d:Utils.random(0, 250)}
            return { id:id, name:name, geo:geo, attr:attr }
        })

        entityData = data;
    },

    getChartData: (feedName :string, attributeKey : string) => {
        // Create EntityData if not generated already
        if (entityData.length == 0) 
            ChartMockData.createEntityData(400);
        
        // Filter EntityData array by Feed
        const entityDataByFeed = entityData.filter((item)=>item.name == feedName)

        // Transform EntityData array to FeedData of form { a:[], b:[], c:[], d:[] }
        const feedData = { id:feedName, rawdata:new Array(), data:new Array() }
        entityDataByFeed.forEach((item : any)=> {  
            feedData.rawdata.push(item.attr[attributeKey]);
        })
        
        // Transform rawData to binned histogram data
        feedData.data = transformDataToChartData(feedData.rawdata);

        return feedData;
    }
    
}

export default ChartMockData;