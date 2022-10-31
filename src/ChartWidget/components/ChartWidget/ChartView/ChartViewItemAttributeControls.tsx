import React, { useContext, useState } from 'react';
import { ChartItem } from '../../../models/ChartItem';
import { ActionTypes } from '../../../reducers/ChartActionsTypes';
import ChartState from '../../../state/ChartState';
import Select from '../../libraries/Selectors/Select';

interface Props {
    item: ChartItem
}

/**
 * Contains buttons for control for a ChartViewItem 
 */
export const ChartViewItemAttributeControls : React.FC<Props> = (props : Props) => {
    const { state, dispatch } = useContext(ChartState.ChartContext);
    const [attribute, setAttribute] = useState(props.item.attributes[0]);
    const editor = state.chartConfig.editor;
    const currentFeed = editor.availableFeeds.find(item => item.name === props.item.feedName);
    const attributeOptions = currentFeed.attr;

    const handleAttributeChange = (value : any) => {
        setAttribute(value.value);
        const item = ChartItem.copy(props.item);
        item.attributes[0] = value.value;
        dispatch({type: ActionTypes.UPDATE_CHART, id: props.item.id, updatedChart: item});
    };

    const options = attributeOptions.map((item:any) => ({ value: item, label: item }));

    return (
        <div className='chart-view-item-attribute-controls'>
            <div className='chart-editor-item'>
                <Select options={options} onChange={handleAttributeChange} value={{label: attribute, value: attribute}}> </Select>
            </div>
        </div>
    );
};
