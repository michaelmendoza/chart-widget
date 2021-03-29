import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartTypes } from '../../models/ChartTypes'
import { ActionTypes } from '../../reducers/ChartActionsTypes';

const ChartEditorAdvOptions = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    const editor = state.chartConfig.editor;

    const handle2ndAttributeChange = (event : any) => {
        const attributes = [ ...editor.attributes ];
        attributes[1] =  event.target.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});
    }

     const handleTimeSeriesHistoryChange = (event : any) => {
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, history: parseInt(event.target.value)}});
     }

     const handleTimeSeriesChartTypeChange = (event : any) => {
        const updatedChartType = editor.multiChartTypes.map((item: any, index: any) => (index === 0 ? event.target.value : item))
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, multiChartTypes:updatedChartType }});
    }

     const handleTimeSeriesChartType2Change = (event : any) => {
        const updatedChartType = editor.multiChartTypes.map((item: any, index: any) => (index === 1 ? event.target.value : item))
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, multiChartTypes:updatedChartType }});
     }

    return (
        <div className="chart-editor-adv-options">
           {
                editor.chartType === ChartTypes.TimeSeries ? 

                <section> 
                    <div> Advanced options </div>

                    <div className='chart-editor-item'>
                        <label>Primary Chart Type</label>
                        <select onChange={handleTimeSeriesChartTypeChange} value={editor.multiChartTypes[0]}>
                            <option value="bar">Bar</option>
                            <option value="line">Line</option>
                        </select>
                    </div>
                    
                    <div className='chart-editor-item'>
                        <label>Secondary Chart Type</label>
                        <select onChange={handleTimeSeriesChartType2Change} value={editor.multiChartTypes[1]}>
                            <option value="grapefruit">Bar</option>
                            <option value="grapefruit">Line</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <select onChange={handle2ndAttributeChange} value={editor.attributes[1]}>
                            <option value="">--</option>
                            <option value="a">Attribute A</option>
                            <option value="b">Attribute B</option>
                            <option value="c">Attribute C</option>
                            <option value="d">Attribute D</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>History</label>
                        <select onChange={handleTimeSeriesHistoryChange} value={editor.history}>
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                        </select>
                    </div>
                    
                </section> : null
            }
        </div>
    )
}

export default ChartEditorAdvOptions;