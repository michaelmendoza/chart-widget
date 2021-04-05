import React, { useContext } from 'react';
import { ChartItem } from '../../models/ChartModels';
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import ChartState from '../../states/ChartState';

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

    const handleAttributeChange = (event : any) => {
        const attributes = [ ...editor.attributes ];
        attributes[0] =  event.target.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});

        let item = ChartItem.copy(props.item);
        item.attributes[0] = event.target.value;
        dispatch({type:ActionTypes.UPDATE_CHART, id:props.item.id, updatedChart:item})
    }

    return (
        <div className='chart-view-item-attribute-controls'>
            <div className='chart-editor-item'>
                <select className='chart-select' onChange={handleAttributeChange} value={editor.attributes[0]}>
                {
                    attributeOptions.map((item:any) => <option key={item} value={item}>{item}</option>)
                }
                </select>
            </div>

        </div>
    );
};
