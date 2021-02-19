import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartModes } from '../../models/ChartTypes';
import { ActionTypes } from '../../reducers/ChartActionsTypes';

interface Props {
    item?: any
}

/**
 * Contains buttons for control for a ChartViewItem 
 */
export const ChartViewItemAttributeControls: React.FC<Props> = (props) => {
    const { state, dispatch } = useContext(ChartState.ChartContext);

    const handleAttributeChange = (event : any) => {
       
    }

    return (
        <div className='chart-view-item-attribute-controls'>
            <div className='chart-editor-item'>
                <label>Attribute to Plot</label>
                <select onChange={handleAttributeChange} value={props.item.attributes[0]}>
                    <option value="a">Attribute A</option>
                    <option value="b">Attribute B</option>
                    <option value="c">Attribute C</option>
                    <option value="d">Attribute D</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Attribute to Plot</label>
                <select onChange={handleAttributeChange} value={props.item.attributes[0]}>
                    <option value="a">Attribute A</option>
                    <option value="b">Attribute B</option>
                    <option value="c">Attribute C</option>
                    <option value="d">Attribute D</option>
                </select>
            </div>
        </div>
    );
};
