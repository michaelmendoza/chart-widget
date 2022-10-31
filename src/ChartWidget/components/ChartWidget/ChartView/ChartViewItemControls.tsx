import React, { useContext } from 'react';
import ChartState from '../../../state/ChartState';
import { ChartModes } from '../../../models/ChartEnums';
import { ActionTypes } from '../../../reducers/ChartActionsTypes';
import ChartTypeSelect from './ChartTypeSelect';
import { ChartViewItemAttributeControls } from './ChartViewItemAttributeControls';
import { IChartItem } from '../../../models/ChartInterfaces';

interface Props {
    item?: any,
    index: number
}

/**
 * Contains buttons for control for a ChartViewItem 
 */
export const ChartViewItemControls: React.FC<Props> = (props : Props) => {
    const { dispatch } = useContext(ChartState.ChartContext);

    const handleDelete = (item: IChartItem) => {
        dispatch({ type: ActionTypes.DELETE_CHART, item });
    };

    const handleEdit = () => {
        dispatch({ type: ActionTypes.UPDATE_CHART_MODE, mode: ChartModes.ShowChartEditor });
    };

    return (
        <div className='chart-view-item-controls layout-row-center layout-space-between'>
            <ChartTypeSelect item={props.item}></ChartTypeSelect>
            <ChartViewItemAttributeControls item={props.item}></ChartViewItemAttributeControls>

            <div className="text-align-right flex-50"> 
                <button className="button-icon" onClick={handleEdit}> <i className="fas fa-pen"></i> </button>
                <button className="button-icon" onClick={() => handleDelete(props.item)}> <i className="fas fa-trash"></i> </button>
            </div>
        </div>
    );
};
