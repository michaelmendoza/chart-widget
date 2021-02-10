import React, { useState, useContext } from 'react';
import ChartState from '../states/ChartState';

const ChartHeader = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext); 

    return (
        <div className="chart-header"> 
            <div> {state.chartMode} </div> 
        </div>
    )
}

export default ChartHeader;