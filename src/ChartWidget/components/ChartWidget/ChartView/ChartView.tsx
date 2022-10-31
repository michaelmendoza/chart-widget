import React, { useEffect, useContext } from 'react';
import ChartState from '../../../state/ChartState';
import { ChartViewItemNoData } from './ChartViewItem';
import { ActionTypes } from '../../../reducers/ChartActionsTypes';
import SortableView from './SortableView';

//import {subscribeToEntityCacheUpdate} from '../../../../ChartWidget-Integration/EntityDataService';

let timer = new Date();
const debounceTime = 500;

/**
 * Contains a list of chart items to actively view. Chart properties and data are populated 
 * from chartList
 */
const ChartView = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    useEffect(() => {
       //subscribeToEntityCacheUpdate(handleEntityCacheUpdate);
    });

    const update = (updatedCharts : any) => {
        dispatch({type: ActionTypes.UPDATE_ALL_CHARTS, updatedCharts});
    };

    const handleEntityCacheUpdate = () => {
        const timeNow = new Date();
        const timeDebounce : number = timeNow.getTime() - timer.getTime();
        if (timeDebounce > debounceTime) {
            timer = new Date();
            dispatch({ type: ActionTypes.INCREMENT_UPDATE_COUNTER });
        }
    };

    return (
        <div className='chart-view'> 
            { state.chartList.length === 0 ? <ChartViewItemNoData></ChartViewItemNoData> : null }
            { <SortableView items={state.chartList} update={update}></SortableView> }
        </div>
    );
};

export default ChartView;