 import React, { useContext } from 'react';
import HistogramChart from '../Charts/HistogramChart.jsx';
import Points from '../../modules/points';
import ChartState from '../../states/ChartState';
import { NoDataChartItem, ChartViewItem } from './ChartViewItem';

/**
 * Contains a list of chart items to actively view. Chart properties and data are populated 
 * from chartList
 */
const ChartView = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    return (
        <div className='chart-view'> 

            { state.chartList.length == 0 ? <NoDataChartItem></NoDataChartItem> : null }
            
            {
                state.chartList.map((item : any, index : number) => {
                    return <ChartViewItem item={item} index={index}></ChartViewItem>
                })
            }
        </div>
    )
}

export default ChartView;