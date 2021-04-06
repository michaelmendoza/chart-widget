import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartTypes, DataMetrics } from '../../models/ChartTypes'
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import Select from 'react-select';

const ChartEditorOptions = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    const editor = state.chartConfig.editor;

    const handleTypeChange = (type : ChartTypes) => {
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, chartType: type}});
    }

    const handleNameChange = (event : any) => {
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, name: event.target.value}});
    }
    
    const handleAttributeChange = (event : any) => {
        const attributes = [ ...editor.attributes ];
        attributes[0] =  event.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});
    }

    const handleFeedChange = (event : any) => {
        const feedName = event.value;
        const feed = editor.availableFeeds.find(item=>item.name === feedName);
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, feedId: feed.id, feedName: feed.name }});
    }
    
    const handleMetricChange = (event : any) => {
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, metric: event.value}});
    }
    
    const handle2ndAttributeChange = (event : any) => {
        const attributes = [ ...editor.attributes ];
        attributes[1] =  event.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});
    }

    const getButtonClassName = (type : ChartTypes) => { 
        return editor.chartType === type ? 'chart-editor-button active' : 'chart-editor-button' 
    } 

    const currentFeed = editor.availableFeeds.find(item=>item.name === editor.feedName);

    // Select Options
    const dataSourceOptions = editor.availableFeeds.map(item => { return { label: item.name, value: item.name }})
    const aggregationOptions = [
        { label:"Count", value:DataMetrics.Count},
        { label:"Sum", value:DataMetrics.Sum},
        { label:"Mean", value:DataMetrics.Mean},
        { label:"Median", value:DataMetrics.Median},
        { label:"Standard Devation", value:DataMetrics.StdDev}
    ]
    const attributeOptions = currentFeed.attr.map((item : any) => { return { label: item, value: item }})
    const shapesOptions = [{ label:"US States", value:"US States"}]

    return (
        <div className='chart-editor-options'> 
            <div className='chart-editor-item'>
                <button className={getButtonClassName(ChartTypes.Number)} onClick={()=>handleTypeChange(ChartTypes.Number)}> Number </button>
                <button className={getButtonClassName(ChartTypes.Bar)}onClick={()=>handleTypeChange(ChartTypes.Bar)}> Bar </button>
                <button className={getButtonClassName(ChartTypes.Pie)} onClick={()=>handleTypeChange(ChartTypes.Pie)}> Pie </button>
                <button className={getButtonClassName(ChartTypes.LineArea)} onClick={()=>handleTypeChange(ChartTypes.LineArea)}> Line </button>
                <button className={getButtonClassName(ChartTypes.ScatterPlot)} onClick={()=>handleTypeChange(ChartTypes.ScatterPlot)}> ScatterPlot </button>
                <button className={getButtonClassName(ChartTypes.TimeSeries)} onClick={()=>handleTypeChange(ChartTypes.TimeSeries)}> Time Series </button>
            </div>

            <div className='chart-editor-item'>
                <label>Name</label>
                <input type="text" name="name" value={editor.name} onChange={handleNameChange}/>
            </div>

            <div className='chart-editor-item'>
                <label>Data Source</label>
                <Select options={dataSourceOptions} onChange={handleFeedChange} value={{label:editor.feedName, value:editor.feedName}}></Select>
            </div>

            <div className='chart-editor-item'>
                <label>Aggregation Method</label>
                <Select options={aggregationOptions} onChange={handleMetricChange} value={{label:editor.metric.toString(), value:editor.metric}}></Select>
            </div>

            <div className='chart-editor-item'>
                <label>Attribute to Plot</label>
                <Select options={attributeOptions} onChange={handleAttributeChange} value={{label:editor.attributes[0], value:editor.attributes[0]}}></Select> 
            </div>

            <div className='chart-editor-item'>
                <label>Layer Shape</label>
                <Select options={shapesOptions}></Select>
            </div>

            {
                editor.chartType === ChartTypes.Bar ? 

                <section> 
                    <div> Advanced options </div>
                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <Select options={attributeOptions} onChange={handle2ndAttributeChange} value={{label:editor.attributes[1], value:editor.attributes[1]}}></Select>
                    </div>
                    
                </section> : null
            }          
        </div>
    )
}

export default ChartEditorOptions;