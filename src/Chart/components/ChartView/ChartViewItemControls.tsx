import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartModes } from '../../models/ChartTypes';
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import ChartTypeSelect from './ChartTypeSelect';

interface Props {
    item?: any,
    index: number
}

/**
 * Contains buttons for control for a ChartViewItem 
 */
export const ChartViewItemControls: React.FC<Props> = (props) => {
    const { dispatch } = useContext(ChartState.ChartContext);

    const handleDelete = (index: number) => {
        dispatch({ type: ActionTypes.DELETE_CHART, index: index });
    };

    const handleEdit = () => {
        dispatch({ type: ActionTypes.UPDATE_CHART_MODE, mode: ChartModes.ShowChartEditor });
    };

    return (
        <div className='chart-view-item-controls layout-row-center layout-space-between'>
            <ChartTypeSelect item={props.item}></ChartTypeSelect>

            <div className="text-align-right flex-50"> 
                <button className="button-icon" onClick={handleEdit}> <i className="fas fa-pen"></i> </button>
                <button className="button-icon" onClick={() => handleDelete(props.index)}> <i className="fas fa-trash"></i> </button>
            </div>
        </div>
    );
};
