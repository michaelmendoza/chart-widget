import React from 'react';
import ChartFilters from './ChartFilters';
import ChartView from './ChartView';

const Chart = () => {
    return (
        <div> 
            <div>Chart</div> 
            <ChartFilters></ChartFilters>
            <ChartView></ChartView>
        </div>
    )
}

export default Chart;