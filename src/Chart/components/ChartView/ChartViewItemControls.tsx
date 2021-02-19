import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartModes } from '../../models/ChartTypes';
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import { ChartViewItemAttributeControls } from './ChartViewItemAttributeControls';

interface Props {
    item?: any,
    index: number
}

/**
 * Contains buttons for control for a ChartViewItem 
 */
export const ChartViewItemControls: React.FC<Props> = (props) => {
    const { state, dispatch } = useContext(ChartState.ChartContext);

    const handleDelete = (index: number) => {
        dispatch({ type: ActionTypes.DELETE_CHART, index: index });
    };

    const handleEdit = () => {
        dispatch({ type: ActionTypes.UPDATE_CHART_MODE, mode: ChartModes.ShowChartEditor });
    };

    return (
        <div className='chart-view-item-controls'>
            <div> 
                <button onClick={handleEdit}> Edit </button>
                <button onClick={() => handleDelete(props.index)}>Delete</button>
            </div>
        </div>
    );
};
