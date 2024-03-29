import React, { useContext, useState } from 'react';
import { ChartItem } from '../../../models/ChartItem';
import { ChartTypes } from '../../../models/ChartEnums';
import { ActionTypes } from '../../../reducers/ChartActionsTypes';
import ChartState from '../../../state/ChartState';
import Select from '../../libraries/Selectors/Select';

interface Props {
    item: ChartItem
}

/**
 * Component that contains chart control buttons i.e. Adding new chart item 
 */
const ChartTypeSelect : React.FC<Props> = (props: Props) => {

    const { dispatch } = useContext(ChartState.ChartContext);
    const [chartType, setChartType] = useState(props.item.type);

    const handleTypeChange = (event : any) => {
        setChartType(event.value);
        const item = ChartItem.copy(props.item);
        item.clearData();
        item.type = event.value;
        dispatch({type: ActionTypes.UPDATE_CHART, id: props.item.id, updatedChart: item});
    };

    const options = [
        {label: 'Number', value: ChartTypes.Number},
        {label: 'Stats', value: ChartTypes.Stats},
        {label: 'Bar', value: ChartTypes.Bar},
        {label: 'Pie', value: ChartTypes.Pie},
        {label: 'Line', value: ChartTypes.LineArea},
        {label: 'ScatterPlot', value: ChartTypes.ScatterPlot},
        {label: 'TimeSeries', value: ChartTypes.TimeSeries},
        {label: 'HeatMap', value: ChartTypes.HeatMap},
        {label: 'Table', value: ChartTypes.Table}
    ];
    
    return (
        <div className='chart-type-select flex-20'>
            <Select options={options} onChange={handleTypeChange} value={{label: chartType.toString(), value: chartType}}></Select>
        </div>
    );
};

export default ChartTypeSelect;