import React, { useContext } from 'react';
import PieChart from './charts/PieChart.jsx';
import HistogramChart from './charts/HistogramChart.jsx';
import BarChart from './charts/BarChart.jsx';
import LineAreaChart from './charts/LineAreaChart';
import Points from '../services/points';
import ChartState from '../states/ChartState';
import { ChartTypes } from '../models/ChartTypes';
import { ActionTypes } from '../reducers/ChartReducers';


const ChartView = () => {
    const _data = Points.gaussianModel(-3, 3, 100, 1, 0.5);

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    const handleAdd = () => {
        dispatch( { type:ActionTypes.ADD, item:{type:ChartTypes.Bar, data:[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}] }})
    }

    const handleClear = () => {
        dispatch({ type:ActionTypes.CLEAR })
    }

    return (
        <div> 
            <div><button onClick={handleAdd}> Add </button></div>
            <div><button onClick={handleClear}>Clear</button></div>
            {
                state.chartList.map((item : any, idx : number) => {
                    if(item.type == ChartTypes.Bar)
                        return <li> <BarChart width={500} height={500} data={item.data}></BarChart> </li> 
                })
            }
        </div>
    )
}

export default ChartView;

//<LineAreaChart width={500} height={500} data={_data}></LineAreaChart>
//<BarChart width={500} height={500} data={[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}></BarChart>
//<HistogramChart width={500} height={500} data={[2,2,2,2,2,4,6,7,3,4]}></HistogramChart>
//<PieChart width={500} height={500} data={[46, 28, 26]}></PieChart>