 import React, { useContext } from 'react';
import PieChart from './charts/PieChart.jsx';
import HistogramChart from './charts/HistogramChart.jsx';
import BarChart from './charts/BarChart.jsx';
import LineAreaChart from './charts/LineAreaChart';
import Points from '../modules/points';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes } from '../models/ChartTypes'
import { ActionTypes } from '../reducers/ChartReducers';

const NoDataChartItem = () => {
    return <div> Please add chart </div>
}

const ChartItemControls = () => {
    const { state, dispatch } = useContext(ChartState.ChartContext); 

    const handleDelete = () => {

    }

    const handleEdit = () => {
        dispatch({type:ActionTypes.UPDATE, mode:ChartModes.ShowChartEditor})
    }

    return (
        <div className='chart-item-controls'>
            <button onClick={handleEdit}> Edit </button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

interface Props {
    item: any
}

const ChartViewItem: React.FC <Props> = (props) => {
    return (
        <li className='chart-view-item'> 
            <ChartItemControls></ChartItemControls>
            {
                props.item.type == ChartTypes.Bar ? <BarChart width={500} height={500} data={props.item.data}/> : null
            }
            
        </li> 
    )
}

const ChartView = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    return (
        <div className='chart-view'> 
            {
                state.chartList.length == 0 ? <NoDataChartItem></NoDataChartItem> : null
            }
            
            {
                state.chartList.map((item : any, idx : number) => {
                    return <ChartViewItem item={item}></ChartViewItem>
                })
            }
        </div>
    )
}

export default ChartView;
//const _data = Points.gaussianModel(-3, 3, 100, 1, 0.5);
//<LineAreaChart width={500} height={500} data={_data}></LineAreaChart>
//<BarChart width={500} height={500} data={[{x:'One',y:1},{x:'Two',y:2},{x:"Three",y:3}]}></BarChart>
//<HistogramChart width={500} height={500} data={[2,2,2,2,2,4,6,7,3,4]}></HistogramChart>
//<PieChart width={500} height={500} data={[46, 28, 26]}></PieChart>