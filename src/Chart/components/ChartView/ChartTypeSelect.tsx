import React, { useContext, useState } from 'react';
import { ChartItem } from '../../models/ChartModels';
import { ChartTypes } from '../../models/ChartTypes';
import { ActionTypes } from '../../reducers/ChartActionsTypes';
import ChartState from '../../states/ChartState';

interface Props {
    item: ChartItem
}

/**
 * Component that contains chart control buttons i.e. Adding new chart item 
 */
const ChartTypeSelect : React.FC<Props> = (props) => {

    const { dispatch } = useContext(ChartState.ChartContext);
    const [chartType, setChartType] = useState(props.item.type);

    const handleTypeChange = (event : any) => {
        setChartType(event.target.value);
        let item = ChartItem.copy(props.item);
        item.type = event.target.value;
        dispatch({type:ActionTypes.UPDATE_CHART, id:props.item.id, updatedChart:item})
    }

    return (
        <div className='chart-type-select flex-20'>
            <select onChange={handleTypeChange} value={chartType}>
                <option value={ChartTypes.Number}>Number</option>
                <option value={ChartTypes.Stats}>Stats</option>
                <option value={ChartTypes.Bar}>Bar</option>
                <option value={ChartTypes.Pie}>Pie</option>
                <option value={ChartTypes.LineArea}>Line</option>
                <option value={ChartTypes.ScatterPlot}>ScatterPlot</option>
                <option value={ChartTypes.TimeSeries}>Time Series</option>
            </select>
        </div>
    )
}

export default ChartTypeSelect;