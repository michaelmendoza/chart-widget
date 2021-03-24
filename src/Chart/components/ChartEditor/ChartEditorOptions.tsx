import React, { useContext } from 'react';
import ChartState from '../../states/ChartState';
import { ChartTypes, DataMetrics } from '../../models/ChartTypes'
import { ActionTypes } from '../../reducers/ChartActionsTypes';

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
        attributes[0] =  event.target.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});
    }

    const handleFeedChange = (event : any) => {
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, feedName: event.target.value}});
    }

    const handleMetricChange = (event : any) => {
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, metric: event.target.value}});
    }
    
    const handle2ndAttributeChange = (event : any) => {
        const attributes = [ ...editor.attributes ];
        attributes[1] =  event.target.value;
        dispatch({type:ActionTypes.UPDATE_CHART_EDITOR, editor: {...editor, attributes:attributes}});
    }

    const getButtonClassName = (type : ChartTypes) => { 
        return editor.chartType === type ? 'chart-editor-button active' : 'chart-editor-button' 
    } 

    const currentFeed = editor.availableFeeds.find(item=>item.name === editor.feedName);
    const attributeOptions = currentFeed.attr;
    
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
                <select onChange={handleFeedChange} value={editor.feedName}> 
                {
                    editor.availableFeeds.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
                }
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Aggregation Method</label>
                <select onChange={handleMetricChange} value={editor.metric}>
                    <option value={DataMetrics.Count}>Count</option>
                    <option value={DataMetrics.Sum}>Sum</option>
                    <option value={DataMetrics.Mean}>Mean</option>
                    <option value={DataMetrics.Median}>Median</option>
                    <option value={DataMetrics.StdDev}>Standard Devation</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Attribute to Plot</label>
                <select onChange={handleAttributeChange} value={editor.attributes[0]}> 
                {
                    attributeOptions.map((item:any) => <option key={item} value={item}>{item}</option>)
                }
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Layer Shape</label>
                <select>
                    <option value="grapefruit">US States</option>
                </select>
            </div>

            {
                editor.chartType === ChartTypes.Bar ? 

                <section> 
                    <div> Advanced options </div>
                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <select onChange={handle2ndAttributeChange} value={editor.attributes[1]}>
                            <option value="">--</option>
                            {
                                attributeOptions.map((item:any) => <option key={item} value={item}>{item}</option>)
                            }
                        </select>
                    </div>
                    
                </section> : null
            }          
        </div>
    )
}

export default ChartEditorOptions;