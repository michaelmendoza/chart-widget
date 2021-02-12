import React, { useContext, useState } from 'react';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes } from '../models/ChartTypes'
import { ActionTypes } from '../reducers/ChartReducers';
import LineAreaChart from './charts/LineAreaChart';
import ChartDataService from '../services/ChartDataService';

/**
 * Contains input fields and dropsdown for setting a chart type, chart properties, 
 * and data properties 
 */
const ChartEditor = () => {
    const { state, dispatch } = useContext(ChartState.ChartContext);
    const [chartType, setChartType] = useState(ChartTypes.Bar);
    const [chartProperties, setChartProperties] = useState({
        name:'Chart1',
        dataSouce: ''
    });

    const handleSave = () => {
        dispatch({type:ActionTypes.ADD, item:{type:chartType, data:ChartDataService.getChartDataItem(0), properties:chartProperties }});
        dispatch({type:ActionTypes.UPDATE, mode:ChartModes.ShowCharts});
    }
    
    const handleCancel = () => {
        dispatch({type:ActionTypes.UPDATE, mode:ChartModes.ShowCharts});
    }
    
    const handleNameChange = (event : any) => {
        setChartProperties({ ...chartProperties, name:event.target.value });
    }

    const handleTypeChange = (type : ChartTypes) => {
        setChartType(type);
    }

    return (
        <div className='chart-editor'> 
            <div className='chart-editor-item'>
                <button onClick={()=>handleTypeChange(ChartTypes.Number)}> Number </button>
                <button onClick={()=>handleTypeChange(ChartTypes.Bar)}> Bar </button>
                <button onClick={()=>handleTypeChange(ChartTypes.Pie)}> Pie </button>
                <button onClick={()=>handleTypeChange(ChartTypes.LineArea)}> Line </button>
                <button onClick={()=>handleTypeChange(ChartTypes.TimeSeries)}> Time Series </button>
            </div>

            <div className='chart-editor-item'>
                <label>Name</label>
                <input type="text" name="name" value={chartProperties.name} onChange={handleNameChange}/>
            </div>

            <div className='chart-editor-item'>
                <label>Data Source</label>
                <select>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option selected value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
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
                <select>
                    <option value="grapefruit">Awesomeness</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>Layer Shape</label>
                <select>
                    <option value="grapefruit">US States</option>
                </select>
            </div>

            Advanced options

            <div className='chart-editor-item'>
                <label>Chart Type</label>
                <select>
                    <option value="grapefruit">Bar</option>
                    <option value="grapefruit">Line</option>
                </select>
            </div>

            <div className='chart-editor-item'>
                <label>History</label>
                <select>
                    <option value="grapefruit">30 days</option>
                    <option value="grapefruit">60 days</option>
                    <option value="grapefruit">90 days</option>
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

            <div className='chart-editor-save'>
                <button onClick={handleSave}> Save </button>
                <button onClick={handleCancel}> Cancel </button>
            </div>

        </div>
    )
}

export default ChartEditor;