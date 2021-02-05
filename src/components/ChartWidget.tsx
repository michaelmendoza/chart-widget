import React from 'react';
import ChartFilters from './ChartFilters';
import ChartView from './ChartView';
import ChartEditor from './ChartEditor';

const ChartWidget = () => {
    return (
        <div> 
            <div>Chart Widget</div> 
            <ChartEditor></ChartEditor>
            <ChartFilters></ChartFilters>
            <ChartView></ChartView>
        </div>
    )
}

export default ChartWidget;