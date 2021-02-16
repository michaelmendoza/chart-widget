import React, { useState, useContext } from 'react';
import ChartState from '../states/ChartState';

/**
 * Component that display the current chartView mode i.e. ShowCharts or ShowEditor
 */
const ChartHeader = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext); 

    return (
        <div className="chart-header"> 
            <div> {state.chartConfig.mode} </div> 
        </div>
    )
}

export default ChartHeader;