import React, { useEffect, useState } from 'react';
import PieChart from '../Charts/PieChart.jsx';
import BarChart from '../Charts/BarChart.jsx';
import LineAreaChart from '../Charts/LineAreaChart';
import DualChart from '../Charts/DualChart';
import { ChartTypes } from '../../models/ChartTypes';
import { ChartViewItemControls } from "./ChartViewItemControls";
import LoadingSpinner from '../Loading/LoadingSpinner';
import ScatterPlot from '../Charts/ScatterPlot.jsx';
import BarComparsionChart from '../Charts/BarComparsionChart.jsx';
import DataMap from '../../../DataMap/components/DataMap.jsx';
import DataTable from '../Tables/DataTable';

interface Props {
    item?: any,
    index: number
}

/**
 * Contain a single chart and it's associated controls, for use with ChartView
 */
export const ChartViewItem: React.FC<Props> = (props) => {
    
    const [data, setData] = useState<any>([]);
    useEffect(()=> {

        const fetchData = async () => {
            const fetchPromise = props.item.fetchData();
            const result = await fetchPromise;
            setData(result);
            console.log(result);
        }
        fetchData();
        
    }, [props.item])

    const renderChartByChartType = () => {
        
        let data = props.item.dataSource.cache; 

        if(!data) {
            return <div className='layout-center' style={{width:'500px', height:'500px'}}> 
                <div> 
                    <LoadingSpinner></LoadingSpinner>
                    <div>Loading</div>
                </div>
            </div>
        }

        switch (props.item.type) {
            case ChartTypes.Number:
                return <NumberChartItem data={data}></NumberChartItem>
            case ChartTypes.Stats:
                return <StatsChartItem data={data}></StatsChartItem>
            case ChartTypes.Bar:
                if(props.item.attributes.length === 1) // Simple Bar Chart
                    return <BarChart width={500} height={500} data={data} />;
                else // Muliple Bar Chart 
                    return <BarComparsionChart width={500} height={500} data={data}/>
            case ChartTypes.Pie:
                return <PieChart width={500} height={500} data={data} />;
            case ChartTypes.LineArea:
                return <LineAreaChart width={500} height={500} data={data} />;
            case ChartTypes.ScatterPlot:
                return <ScatterPlot width={500} height={500} data={data}/>
            case ChartTypes.TimeSeries:
                return <DualChart width={500} height={500} data={data} />;
            case ChartTypes.HeatMap:
                return <DataMap width={500} height={500} data={data}></DataMap>
            case ChartTypes.Table:
                return <DataTable data={data} columns={['id','name','x','y','a','b','c','d','time']}></DataTable> 
            default:
                return null;
        }
    };

    return (
        <li className='chart-view-item'>
            <div> {props.item.name} </div>
            <ChartViewItemControls index={props.index} item={props.item}></ChartViewItemControls>
            {renderChartByChartType()}
        </li>
    );
};

/**
 * 
 */
export const NoDataChartItem = () => {
    return <div className="chart-view-item-no-data"> Please Add Chart </div>;
};

export const NumberChartItem = ({data} : any) => {
    return (
        <div className='number-chart-item layout-center' style={{width:'500px', height:'500px'}}> 
            <div className="flex-50"> 
                <label>Count:</label> 
                <div className='stats-item'>{data}</div> 
            </div>
        </div>
    );
}

export const StatsChartItem = ({data} : any) => {
    return (
        <div className='stats-chart-item layout-row-center flex-wrap' style={{width:'500px', height:'500px'}}>
            <div className="flex-50"> 
                <label>Count:</label>
                <div className='stats-item'>{data.count} </div>
            </div>
            <div className="flex-50"> 
                <label>Mean:</label>
                <div className='stats-item'>{data.mean.toFixed(4)}</div>
            </div>
            <div className="flex-50"> 
                <label>Median:</label>
                <div className='stats-item'>{data.median.toFixed(4)}</div>
            </div>
            <div className="flex-50"> 
                <label>Sum:</label>
                <div className='stats-item'>{data.sum.toFixed(4)}</div>
            </div>
            <div className="flex-50"> 
                <label>Std Dev:</label>
                <div className='stats-item'>{data.stddev.toFixed(4)}</div>
            </div>
        </div>
    )
}