import React, { useContext, useState, useEffect } from 'react';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes, DataTypes } from '../models/ChartTypes'
import ChartDataService from '../services/ChartDataService';
import { ActionTypes } from '../reducers/ChartActionsTypes';
import { ChartItem } from '../models/ChartModels';

/**
 * Contains input fields and dropsdown for setting a chart type, chart properties, 
 * and data properties 
 */
const ChartEditor = () => {
    const { state, dispatch } = useContext(ChartState.ChartContext);
    const [chartType, setChartType] = useState(ChartTypes.Bar);
    const [chartProperties, setChartProperties] = useState({
        name:'New Chart',
        feedName: 'Population',
        attributes: 'a'
    }); 
    
    useEffect(()=> {
        if(state.chartConfig.mode == ChartModes.ShowChartEditor) {
            setChartProperties({ 
                name:state.chartList[state.chartConfig.index].name,  
                feedName:state.chartList[state.chartConfig.index].feedName,
                attributes:state.chartList[state.chartConfig.index].attributes[0]
            })
        }
    }, [])
    
    const handleSave = () => {
        let chartItem = new ChartItem(chartProperties.name, 
            chartType, 
            chartProperties.feedName, 
            [chartProperties.attributes], 
            { type: DataTypes.ChartData, data:ChartDataService.getChartData(chartProperties.feedName, chartProperties.attributes).data}) 

        if(state.chartConfig.mode == ChartModes.ShowChartCreator) {
            dispatch({type:ActionTypes.ADD_CHART, item:chartItem});
            dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
        }
        else if(state.chartConfig.mode == ChartModes.ShowChartEditor) {
            const id = state.chartList[state.chartConfig.index].id;
            dispatch({type:ActionTypes.UPDATE_CHART, id:id, updatedChart:chartItem})
            dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
        }
    }
    
    const handleCancel = () => {
        dispatch({type:ActionTypes.UPDATE_CHART_MODE, mode:ChartModes.ShowCharts});
    }
    
    const handleNameChange = (event : any) => {
        setChartProperties({ ...chartProperties, name:event.target.value });
    }

    const handleTypeChange = (type : ChartTypes) => {
        setChartType(type);
    }

    const handleDataAttributeChange = (event : any) => {
        setChartProperties({ ...chartProperties, attributes:event.target.value})
    }

    const handleDataFeedChange = (event : any) => {
        setChartProperties({ ...chartProperties, feedName:event.target.value })
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
                <button className={getButtonClassName(ChartTypes.TimeSeries)} onClick={()=>handleTypeChange(ChartTypes.TimeSeries)}> Time Series </button>
            </div>

            <div className='chart-editor-item'>
                <label>Name</label>
                <input type="text" name="name" value={chartProperties.name} onChange={handleNameChange}/>
            </div>

            <div className='chart-editor-item'>
                <label>Data Source</label>
                <select onChange={handleDataFeedChange} value={chartProperties.feedName}> 
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
                <select onChange={handleDataAttributeChange} value={chartProperties.attributes}>
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
                        <label>Chart Type</label>
                        <select>
                            <option value="bar">Bar</option>
                            <option value="line">Line</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>History</label>
                        <select>
                            <option value="30">30 days</option>
                            <option value="60">60 days</option>
                            <option value="90">90 days</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>Secondary Attribute to Plot</label>
                        <select>
                            <option value="grapefruit">Bar</option>
                            <option value="grapefruit">Line</option>
                        </select>
                    </div>

                    <div className='chart-editor-item'>
                        <label>Chart Type</label>
                        <select>
                            <option value="grapefruit">Bar</option>
                            <option value="grapefruit">Line</option>
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