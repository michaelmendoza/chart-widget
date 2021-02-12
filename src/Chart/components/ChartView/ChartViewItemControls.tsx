import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartModes } from '../../models/ChartTypes';
import { ActionTypes } from '../../reducers/ChartActions';

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
        dispatch({ type: ActionTypes.DELETE, index: index });
    };

    const handleEdit = () => {
        dispatch({ type: ActionTypes.UPDATE, mode: ChartModes.ShowChartEditor });
    };

    return (
        <div className='chart-item-controls'>
            <button onClick={handleEdit}> Edit </button>
            <button onClick={() => handleDelete(props.index)}>Delete</button>
        </div>
    );
};
