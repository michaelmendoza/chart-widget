import React, { useContext } from 'react';
import { ChartItem } from '../../models/ChartModels';
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import ChartState from '../../states/ChartState';
import Select from '../Selectors/Select';

interface Props {
    item: ChartItem
}

/**
 * Contains buttons for control for a ChartViewItem 
 */
export const ChartViewItemAttributeControls : React.FC<Props> = (props) => {
    const { state, dispatch } = useContext(ChartState.ChartContext);
    const editor = state.chartConfig.editor;
    const currentFeed = editor.availableFeeds.find(item=>item.name === props.item.feedName);
    const attributeOptions = currentFeed.attr;

    const handleAttributeChange = (value : any) => {
        const attributes = [ ...editor.attributes ];
        attributes[0] =  value.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});

        let item = ChartItem.copy(props.item);
        item.attributes[0] = value.value;
        dispatch({type:ActionTypes.UPDATE_CHART, id:props.item.id, updatedChart:item})
    }

    const options = attributeOptions.map((item:any) => { return { value:item, label:item }})

    return (
        <div className='chart-view-item-attribute-controls'>
            <div className='chart-editor-item'>
                <Select options={options} onChange={handleAttributeChange} value={{label: editor.attributes[0], value:editor.attributes[0]}}> </Select>
            </div>
        </div>
    );
};
