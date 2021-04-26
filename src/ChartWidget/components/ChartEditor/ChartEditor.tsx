import React, { useContext, useEffect } from 'react';
import ChartState from '../../states/ChartState';
import { ChartModes, ChartTypes } from '../../models/ChartTypes'
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import { ChartItem } from '../../models/ChartModels';
import ChartEditorOptions from './ChartEditorOptions';
import ChartEditorAdvOptions from './ChartEditorAdvOptions';
import ChartDataService from '../../services/ChartDataService';

/**
 * Contains input fields and dropsdown for setting a chart type, chart properties, 
 * and data properties 
 */ 
const ChartEditor = () => {
    const { state, dispatch, manager } = useContext(ChartState.ChartContext);
    const editor = state.chartConfig.editor;
   
    useEffect(()=> {
        const showCreator = state.chartConfig.mode === ChartModes.ShowChartCreator; 
        const showEditor = state.chartConfig.mode === ChartModes.ShowChartEditor; 
        
        if(showCreator) {
            const fetch = async () => {
                const availableCharts = await ChartDataService.fetchAvailableCharts();
                dispatch({ type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, 
                    availableFeeds: availableCharts, feed:availableCharts[0], feedId:availableCharts[0].id, feedName:availableCharts[0].name}});
            }
            fetch();
        }

        if(showEditor) {
            const chart = manager.getChartToEdit();
            if(!chart) return;
            // Initalize editor state with current chart meta data
            dispatch({
                type:ActionTypes.UPDATE_CHART_EDITOR, 
                editor: {...editor, 
                    chartType: chart.type, name:chart.name, feedName:chart.feedName, 
                    attributes:chart.attributes, metric:chart.dataMetric, history:chart.historyLength, 
                    multiChartTypes: [ChartTypes.Bar, ChartTypes.LineArea]
            }});
        }
    }, [])
    
    const handleSave = () => {
        // Create ChartItem based on editor properties
        let chartItem = new ChartItem(editor.name, 
            editor.chartType, 
            editor.feed,
            editor.feedId,
            editor.feedName, 
            editor.attributes,
            editor.metric,
            editor.history) 
        
        // Update ChartState with new Chart information 
        if(state.chartConfig.mode === ChartModes.ShowChartCreator) {
            dispatch({type:ActionTypes.ADD_CHART, item:chartItem});
            dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
        }
        else if(state.chartConfig.mode === ChartModes.ShowChartEditor) {
            const id = manager.getChartToEdit().id;
            dispatch({type:ActionTypes.UPDATE_CHART, id:id, updatedChart:chartItem})
            dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
        }
    }
    
    const handleCancel = () => {
        dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
    }
    
    return (
        <div className='chart-editor'> 
            
            <ChartEditorOptions></ChartEditorOptions>
            <ChartEditorAdvOptions></ChartEditorAdvOptions>
            
            <div className='chart-editor-save'>
                <button onClick={handleSave}> Save </button>
                <button onClick={handleCancel}> Cancel </button>
            </div>

        </div>
    )
}

export default ChartEditor;