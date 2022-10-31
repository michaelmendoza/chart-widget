import React, { useContext } from 'react';
import ChartState from '../../../state/ChartState';
import { ChartTypes } from '../../../models/ChartEnums';
import { ActionTypes } from '../../../reducers/ChartActionsTypes';
import Select from '../../libraries/Selectors/Select';

const ChartEditorAdvOptions = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    const editor = state.chartConfig.editor;

    const handle2ndAttributeChange = (event : any) => {
        const attributes = [...editor.attributes];
        attributes[1] = event.value;
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes}});
    };

     const handleTimeSeriesHistoryChange = (event : any) => {
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, history: parseInt(event.value)}});
     };

     const handleTimeSeriesChartTypeChange = (event : any) => {
        const updatedChartType = editor.multiChartTypes.map((item: any, index: any) => (index === 0 ? event.value : item));
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, multiChartTypes: updatedChartType }});
    };

     const handleTimeSeriesChartType2Change = (event : any) => {
        const updatedChartType = editor.multiChartTypes.map((item: any, index: any) => (index === 1 ? event.value : item));
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, multiChartTypes: updatedChartType }});
     };

    const chartOptions = [
        { label: 'Bar', value: ChartTypes.Bar },
        { label: 'Line', value: ChartTypes.LineArea}
    ];
    const currentFeed = editor.availableFeeds.find(item => item.name === editor.feedName);
    const attributeOptions = currentFeed.attr.map((item : any) => ({ label: item, value: item }));
    attributeOptions.unshift({label: '--', value: ''});
    const historyOptions = [
        { label: '30 Days', value: 30 },
        { label: '60 Days', value: 60 },
        { label: '90 Days', value: 90 }
    ];

    return (
        <div className="chart-editor-adv-options">
            {
                editor.chartType === ChartTypes.Bar ? 

                <section> 
                    <div> Advanced options </div>
                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <Select options={attributeOptions} onChange={handle2ndAttributeChange} value={{label: editor.attributes[1], value: editor.attributes[1]}}></Select>
                    </div>
                </section> : null
            }          
           {
                editor.chartType === ChartTypes.TimeSeries ? 

                <section> 
                    <div> Advanced options </div>

                    <div className='chart-editor-item'>
                        <label>Primary Chart Type</label>
                        <Select options={chartOptions} onChange={handleTimeSeriesChartTypeChange} value={{label: editor.multiChartTypes[0].toString(), value: editor.multiChartTypes[0]}}></Select>
                    </div>
                    
                    <div className='chart-editor-item'>
                        <label>Secondary Chart Type</label>
                        <Select options={chartOptions} onChange={handleTimeSeriesChartType2Change} value={{label: editor.multiChartTypes[1].toString(), value: editor.multiChartTypes[1]}}></Select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <Select options={attributeOptions} onChange={handle2ndAttributeChange} value={{label: editor.attributes[1], value: editor.attributes[1]}}></Select> 
                    </div>

                    <div className='chart-editor-item'>
                        <label>History</label>
                        <Select options={historyOptions} onChange={handleTimeSeriesHistoryChange} value={{label: editor.history.toString(), value: editor.history}}></Select>
                    </div>
                    
                </section> : null
            }
        </div>
    );
};

export default ChartEditorAdvOptions;