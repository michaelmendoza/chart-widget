import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartViewItemNoData, ChartViewItem } from './ChartViewItem';
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import SortableView from './SortableView';

/**
 * Contains a list of chart items to actively view. Chart properties and data are populated 
 * from chartList
 */
const ChartView = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    const update = (updatedCharts : any) => {
        dispatch({type:ActionTypes.UPDATE_ALL_CHARTS, updatedCharts: updatedCharts})
    } 

    return (
        <div className='chart-view'> 
            { state.chartList.length === 0 ? <ChartViewItemNoData></ChartViewItemNoData> : null }

            { <SortableView items={state.chartList} update={update}></SortableView> }
        </div>
    )
}

export default ChartView;