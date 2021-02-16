import React, { useContext } from 'react';
import ChartState from '../states/ChartState';

const ChartStateDebugger = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);

    return (
        <div className='chart-state-debugger'> 
            ChartList 
            <div> { JSON.stringify(state.chartList) } </div>
            ChartFilters
            <div> { JSON.stringify(state.chartFilters) } </div>
            ChartView
            <div> { JSON.stringify(state.chartConfig) } </div>
        </div>
    )
}

export default ChartStateDebugger;