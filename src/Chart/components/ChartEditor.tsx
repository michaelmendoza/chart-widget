import React, { useContext, useState, useEffect } from 'react';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes, DataTypes } from '../models/ChartTypes'
import ChartDataService from '../services/ChartDataService';
import { ActionTypes } from '../reducers/ChartActionsTypes';
import { ChartItem } from '../models/ChartModels';
import { DataSource } from '../services/ChartDataPipeline';
import ScatterPlot from './Charts/ScatterPlot';

/**
 * Contains input fields and dropsdown for setting a chart type, chart properties, 
 * and data properties 
 */
const ChartEditor = () => {
    const { state, dispatch, manager } = useContext(ChartState.ChartContext);
    const [chartType, setChartType] = useState(ChartTypes.Bar);
    const [chartProperties, setChartProperties] = useState({
        name:'New Chart',
        feedName: 'Population',
        attribute: 'a'
    }); 
    const [timeSeriesOptions, setTimeSeriesOptions] = useState({
        chartTypes: [ChartTypes.Bar, ChartTypes.LineArea],
        attribute: 'b',  // Secondary Attribute 
        history: '30'
    })
    
    useEffect(()=> {
        const showEditor = state.chartConfig.mode == ChartModes.ShowChartEditor;
        const isTimeSeries = manager.getChartToEdit().type;
        if(showEditor) { 
            setChartType(manager.getChartToEdit().type);
            setChartProperties({ 
                name:manager.getChartToEdit().name,  
                feedName:manager.getChartToEdit().feedName,
                attribute:manager.getChartToEdit().attributes[0]
            })
        }
        if(showEditor && isTimeSeries) {
            setTimeSeriesOptions({
                chartTypes: [ChartTypes.Bar, ChartTypes.LineArea],
                attribute: 'b',  
                history: '30'
            })
        }

    }, [])
    
    const handleSave = () => {
        // Get attributes from editor 
        let attributes;
        if(chartType == ChartTypes.TimeSeries)
            attributes = [chartProperties.attribute, timeSeriesOptions.attribute]
        else
            attributes = [chartProperties.attribute]

        // Create ChartItem based on editor properties
        let chartItem = new ChartItem(chartProperties.name, 
            chartType, 
            chartProperties.feedName, 
            attributes) 
        
        // Update ChartState with new Chart information 
        if(state.chartConfig.mode == ChartModes.ShowChartCreator) {
            dispatch({type:ActionTypes.ADD_CHART, item:chartItem});
            dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
        }
        else if(state.chartConfig.mode == ChartModes.ShowChartEditor) {
            const id = manager.getChartToEdit().id;
            dispatch({type:ActionTypes.UPDATE_CHART, id:id, updatedChart:chartItem})
            dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
        }
    }
    
    const handleCancel = () => {
        dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
    }
    
    const handleTypeChange = (type : ChartTypes) => {
        setChartType(type);
    }

    const handleNameChange = (event : any) => {
        setChartProperties({ ...chartProperties, name:event.target.value });
    }

    const handleAttributeChange = (event : any) => {
        setChartProperties({ ...chartProperties, attribute:event.target.value})
    }

    const handleFeedChange = (event : any) => {
        setChartProperties({ ...chartProperties, feedName:event.target.value })
    }

    const handleTimeSeriesAttributeChange = (event : any) => {
        setTimeSeriesOptions({ ...timeSeriesOptions, attribute:event.target.value })
     }

     const handleTimeSeriesHistoryChange = (event : any) => {
        setTimeSeriesOptions({ ...timeSeriesOptions, history:event.target.value })
     }

     const handleTimeSeriesChartTypeChange = (event : any) => {
        const updatedChartType = timeSeriesOptions.chartTypes.map((item, index) => (index == 0 ? event.target.value : item))
        setTimeSeriesOptions({ ...timeSeriesOptions, chartTypes:updatedChartType})
     }

     const handleTimeSeriesChartType2Change = (event : any) => {
        const updatedChartType = timeSeriesOptions.chartTypes.map((item, index) => (index == 1 ? event.target.value : item))
        setTimeSeriesOptions({ ...timeSeriesOptions, chartTypes:updatedChartType})
     }

    const getButtonClassName = (type : ChartTypes) => { 
        return chartType == type ? 'chart-editor-button active' : 'chart-editor-button' 
    } 
    
    return (
        <div className='chart-editor'> 
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
                <input type="text" name="name" value={chartProperties.name} onChange={handleNameChange}/>
            </div>

            <div className='chart-editor-item'>
                <label>Data Source</label>
                <select onChange={handleFeedChange} value={chartProperties.feedName}> 
                    <option value="Lightning">Lightning</option>
                    <option value="Hospitals">Hospitals</option>
                    <option selected value="Traffic">Traffic</option>
                    <option value="Population">Population</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Aggregation Method</label>
                <select>
                    <option value="grapefruit">Count</option>
                    <option value="grapefruit">Sum</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Attribute to Plot</label>
                <select onChange={handleAttributeChange} value={chartProperties.attribute}>
                    <option value="a">Attribute A</option>
                    <option value="b">Attribute B</option>
                    <option value="c">Attribute C</option>
                    <option value="d">Attribute D</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Layer Shape</label>
                <select>
                    <option value="grapefruit">US States</option>
                </select>
            </div>

            {
                chartType == ChartTypes.TimeSeries ? 

                <section> 
                    <div> Advanced options </div>

                    <div className='chart-editor-item'>
                        <label>Primary Chart Type</label>
                        <select onChange={handleTimeSeriesChartTypeChange} value={timeSeriesOptions.chartTypes[0]}>
                            <option value="bar">Bar</option>
                            <option value="line">Line</option>
                        </select>
                    </div>
                    
                    <div className='chart-editor-item'>
                        <label>Secondary Chart Type</label>
                        <select onChange={handleTimeSeriesChartType2Change} value={timeSeriesOptions.chartTypes[1]}>
                            <option value="grapefruit">Bar</option>
                            <option value="grapefruit">Line</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <select onChange={handleTimeSeriesAttributeChange} value={timeSeriesOptions.attribute}>
                            <option value="a">Attribute A</option>
                            <option value="b">Attribute B</option>
                            <option value="c">Attribute C</option>
                            <option value="d">Attribute D</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>History</label>
                        <select onChange={handleTimeSeriesHistoryChange} value={timeSeriesOptions.history}>
                            <option value="30">30 days</option>
                            <option value="60">60 days</option>
                            <option value="90">90 days</option>
                        </select>
                    </div>
                    
                </section> : null
            }

            <div className='chart-editor-save'>
                <button onClick={handleSave}> Save </button>
                <button onClick={handleCancel}> Cancel </button>
            </div>

        </div>
    )
}

export default ChartEditor;