 import React, { useContext } from 'react';
import PieChart from './charts/PieChart.jsx';
import HistogramChart from './charts/HistogramChart.jsx';
import BarChart from './charts/BarChart.jsx';
import LineAreaChart from './charts/LineAreaChart';
import Points from '../modules/points';
import ChartState from '../states/ChartState';
import { ChartModes, ChartTypes } from '../models/ChartTypes'
import { ActionTypes } from '../reducers/ChartReducers';

interface Props {
    item?: any,
    index: number
}

const ChartItemControls: React.FC <Props> = (props) => {
    const { state, dispatch } = useContext(ChartState.ChartContext); 

    const handleDelete = (index : number) => {
        dispatch({type:ActionTypes.DELETE, index:index})
    }
    
    const handleEdit = () => {
        dispatch({type:ActionTypes.UPDATE, mode:ChartModes.ShowChartEditor})
    }

    return (
        <div className='chart-item-controls'>
            <button onClick={handleEdit}> Edit </button>
            <button onClick={() => handleDelete(props.index)}>Delete</button>
        </div>
    )
}

const ChartViewItem: React.FC <Props> = (props) => {

    const renderChartByChartType = () => {
        switch(props.item.type) {
            case ChartTypes.Bar:
                return <BarChart width={500} height={500} data={props.item.data}/>
            case ChartTypes.Pie:
                return <PieChart width={500} height={500} data={props.item.data}/>
            case ChartTypes.LineArea:
                return <LineAreaChart width={500} height={500} data={props.item.data}/>
            default:
                return null;
        }}
    
    return (
        <li className='chart-view-item'> 
            <div> { props.item.properties.name } </div>
            <ChartItemControls index={props.index}></ChartItemControls>
            { renderChartByChartType() }
        </li> 
    )
}

const NoDataChartItem = () => {
    return <div> Please add chart </div>
}

const ChartView = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    return (
        <div className='chart-view'> 

            { state.chartList.length == 0 ? <NoDataChartItem></NoDataChartItem> : null }
            
            {
                state.chartList.map((item : any, index : number) => {
                    return <ChartViewItem item={item} index={index}></ChartViewItem>
                })
            }
        </div>
    )
}

export default ChartView;