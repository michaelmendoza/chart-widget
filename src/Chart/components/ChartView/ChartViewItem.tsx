import React from 'react';
import PieChart from '../Charts/PieChart.jsx';
import BarChart from '../Charts/BarChart.jsx';
import LineAreaChart from '../Charts/LineAreaChart';
import { ChartTypes } from '../../models/ChartTypes';
import { ChartViewItemControls } from "./ChartViewItemControls";

interface Props {
    item?: any,
    index: number
}

/**
 * Contain a single chart and it's associated controls, for use with ChartView
 */
export const ChartViewItem: React.FC<Props> = (props) => {

    const renderChartByChartType = () => {
        switch (props.item.type) {
            case ChartTypes.Bar:
                return <BarChart width={500} height={500} data={props.item.data} />;
            case ChartTypes.Pie:
                return <PieChart width={500} height={500} data={props.item.data} />;
            case ChartTypes.LineArea:
                return <LineAreaChart width={500} height={500} data={props.item.data} />;
            default:
                return null;
        }
    };

    return (
        <li className='chart-view-item'>
            <div> {props.item.properties.name} </div>
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
