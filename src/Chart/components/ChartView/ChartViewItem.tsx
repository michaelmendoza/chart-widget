import React, { useEffect, useState } from 'react';
import PieChart from '../Charts/PieChart.jsx';
import BarChart from '../Charts/BarChart.jsx';
import LineAreaChart from '../Charts/LineAreaChart';
import DualChart from '../Charts/DualChart';
import { ChartTypes } from '../../models/ChartTypes';
import { ChartViewItemControls } from "./ChartViewItemControls";
import LoadingSpinner from '../Loading/LoadingSpinner';

interface Props {
    item?: any,
    index: number
}

/**
 * Contain a single chart and it's associated controls, for use with ChartView
 */
export const ChartViewItem: React.FC<Props> = (props) => {
    
    const [data, setData] = useState([]);
    useEffect(()=> {

        const fetchData = async () => {
            const fetchPromise = props.item.fetchData();
            const result = await fetchPromise;
            setData(result);
            console.log("Data Fetched with " + props.item.dataSource);
            console.log(result);
        }
        fetchData();
        
    }, [])

    const renderChartByChartType = () => {
        
        if(data.length === 0)
            return <div className='layout-center' style={{width:'500px', height:'500px'}}> 
                <div> 
                    <LoadingSpinner></LoadingSpinner>
                    <div>Loading</div>
                </div>
            </div>

        switch (props.item.type) {
            case ChartTypes.Number:
                return <div> Number </div>
            case ChartTypes.Bar:
                return <BarChart width={500} height={500} data={data} />;
            case ChartTypes.Pie:
                return <PieChart width={500} height={500} data={data} />;
            case ChartTypes.LineArea:
                return <LineAreaChart width={500} height={500} data={data} />;
            case ChartTypes.TimeSeries:
                return <DualChart width={500} height={500} data={data} />;
            default:
                return null;
        }
    };

    return (
        <li className='chart-view-item'>
            <div> {props.item.name} </div>
            <ChartViewItemControls index={props.index}></ChartViewItemControls>
            {renderChartByChartType()}
        </li>
    );
};

/**
 * 
 */
export const NoDataChartItem = () => {
    return <div> Please add chart </div>;
};
