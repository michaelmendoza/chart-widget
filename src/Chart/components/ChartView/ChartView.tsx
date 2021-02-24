 import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { NoDataChartItem, ChartViewItem } from './ChartViewItem';

/**
 * Contains a list of chart items to actively view. Chart properties and data are populated 
 * from chartList
 */
const ChartView = () => {

    const { state } = useContext(ChartState.ChartContext);
    
    return (
        <div className='chart-view'> 

            { state.chartList.length === 0 ? <NoDataChartItem></NoDataChartItem> : null }
            
            {
                state.chartList.map((item : any, index : number) => {
                    return <ChartViewItem item={item} index={index} key={index}></ChartViewItem>
                })
            }
        </div>
    )
}

export default ChartView;