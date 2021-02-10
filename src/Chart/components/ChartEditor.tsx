import React, { useContext } from 'react';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes } from '../models/ChartTypes'
import { ActionTypes } from '../reducers/ChartReducers';

const ChartEditor = () => {
    const { state, dispatch } = useContext(ChartState.ChartContext);

    const handleSave = () => {
        dispatch({type:ActionTypes.ADD, item:{type:ChartTypes.Bar, data:[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}] }});
        dispatch({type:ActionTypes.UPDATE, mode:ChartModes.ShowCharts});
    }
    
    const handleCancel = () => {
        dispatch({type:ActionTypes.UPDATE, mode:ChartModes.ShowCharts});
    }
    
    return (
        <div className='chart-editor'> 
            <div className='chart-editor-item'>
                <button> Number </button>
                <button> Bar </button>
                <button> Number </button>
                <button> Pie </button>
                <button> Line </button>
                <button> Time Series </button>
            </div>

            <div className='chart-editor-item'>
                <label>Name</label>
                <input type="text" name="name" />
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

            <div className='chart-editor-save'>
                <button onClick={handleSave}> Save </button>
                <button onClick={handleCancel}> Cancel </button>
            </div>

        </div>
    )
}

export default ChartEditor;