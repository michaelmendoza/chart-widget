import React, { useContext } from 'react';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes } from '../models/ChartTypes'
import { ActionTypes } from '../reducers/ChartActionsTypes';

/**
 * Component that contains chart control buttons i.e. Adding new chart item 
 */
const ChartControls = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);

    const handleAdd = () => {
        dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowChartCreator});    }
    
    const handleClear = () => {
        dispatch({ type:ActionTypes.CLEAR_ALL_CHARTS })
    }

    return (
        <div className='chart-controls layout-row'> 
            <button onClick={handleAdd}> Add </button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}

export default ChartControls;