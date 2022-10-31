import React, { useContext, useEffect } from 'react';
import ChartState from '../../../state/ChartState';
import { ChartTypes, DataMetrics } from '../../../models/ChartEnums';
import { ActionTypes } from '../../../reducers/ChartActionsTypes';
import Select from '../../libraries/Selectors/Select';

const ChartEditorOptions = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    const editor = state.chartConfig.editor;

    const handleTypeChange = (type : ChartTypes) => {
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, chartType: type}});
    };

    const handleNameChange = (event : any) => {
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, name: event.target.value}});
    };
    
    const handleAttributeChange = (event : any) => {
        const attributes = [...editor.attributes];
        attributes[0] = event.value;
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes}});
    };

    const handleFeedChange = (event : any) => {
        const feedName = event.value;
        const feed = editor.availableFeeds.find(item => item.name === feedName);
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, feed, feedId: feed.id, feedName: feed.name, attributes: ['', ''] }});
    };
    
    const handleMetricChange = (event : any) => {
        dispatch({type: ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, metric: event.value}});
    };
    
    const getButtonClassName = (type : ChartTypes) => (editor.chartType === type ? 'chart-editor-button active' : 'chart-editor-button'); 
    
    const currentFeed = editor.availableFeeds.find(item => item.name === editor.feedName);
    //const currentFeed : any = editor.getCurrentFeed();

    // Select Options
    const dataSourceOptions = editor.availableFeeds.map(item => ({ label: item.name, value: item.name }));
    const aggregationOptions = [
        { label: 'Count', value: DataMetrics.Count},
        { label: 'Sum', value: DataMetrics.Sum},
        { label: 'Mean', value: DataMetrics.Mean},
        { label: 'Median', value: DataMetrics.Median},
        { label: 'Standard Devation', value: DataMetrics.StdDev}
    ];
    const attributeOptions = currentFeed.attr.map((item : any) => ({ label: item, value: item }));
    const shapesOptions = [{ label: 'US States', value: 'US States'}];

    return (
        <div className='chart-editor-options'> 
            <div className='chart-editor-item'>
                <button className={getButtonClassName(ChartTypes.Number)} onClick={() => handleTypeChange(ChartTypes.Number)}> Number </button>
                <button className={getButtonClassName(ChartTypes.Bar)}onClick={() => handleTypeChange(ChartTypes.Bar)}> Bar </button>
                <button className={getButtonClassName(ChartTypes.Pie)} onClick={() => handleTypeChange(ChartTypes.Pie)}> Pie </button>
                <button className={getButtonClassName(ChartTypes.LineArea)} onClick={() => handleTypeChange(ChartTypes.LineArea)}> Line </button>
                <button className={getButtonClassName(ChartTypes.ScatterPlot)} onClick={() => handleTypeChange(ChartTypes.ScatterPlot)}> ScatterPlot </button>
                <button className={getButtonClassName(ChartTypes.TimeSeries)} onClick={() => handleTypeChange(ChartTypes.TimeSeries)}> Time Series </button>
            </div>

            <div className='chart-editor-item'>
                <label>Name</label>
                <input type="text" name="name" value={editor.name} onChange={handleNameChange}/>
            </div>

            <div className='chart-editor-item'>
                <label>Data Source</label>
                <Select options={dataSourceOptions} onChange={handleFeedChange} value={{label: editor.feedName, value: editor.feedName}}></Select>
            </div>

            {
                (editor.chartType === ChartTypes.Number || editor.chartType === ChartTypes.TimeSeries || editor.chartType === ChartTypes.HeatMap) ? 

                <div className='chart-editor-item'>
                    <label>Aggregation Method</label>
                    <Select options={aggregationOptions} onChange={handleMetricChange} value={{label: editor.metric.toString(), value: editor.metric}}></Select>
                </div> : null
            }

            <div className='chart-editor-item'>
                <label>Attribute to Plot</label>
                <Select options={attributeOptions} onChange={handleAttributeChange} value={{label: editor.attributes[0], value: editor.attributes[0]}}></Select> 
            </div>

            {
                //<div className='chart-editor-item'>
                //    <label>Layer Shape</label>
                //    <Select options={shapesOptions}></Select>
                //</div>
            }       
            
        </div>
    );
};

export default ChartEditorOptions;