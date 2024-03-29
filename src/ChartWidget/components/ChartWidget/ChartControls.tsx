import React, { useContext } from 'react';
import ChartState from '../../state/ChartState';
import { ChartModes } from '../../models/ChartEnums';
import { ActionTypes } from '../../reducers/ChartActionsTypes';

/**
 * Component that contains chart control buttons i.e. Adding new chart item 
 */
const ChartControls = () => {

    const { dispatch } = useContext(ChartState.ChartContext);

    const handleAdd = () => {
        dispatch({ type: ActionTypes.UPDATE_CHART_MODE, mode: ChartModes.ShowChartCreator });
    };

    const handleClear = () => {
        dispatch({ type: ActionTypes.CLEAR_ALL_CHARTS });
    };

    return (
        <div className='chart-controls'>
            <button className='button-icon' onClick={handleAdd}> <i className="fas fa-plus"></i> </button>
        </div>
    );
};

export default ChartControls;