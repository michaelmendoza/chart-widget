import React, { useState, useContext } from 'react';
import ChartFilters from './ChartFilters';
import ChartView from './ChartView/ChartView';
import ChartEditor from './ChartEditor';
import ChartHeader from './ChartHeader';
import ChartState from '../states/ChartState';
import { ChartModes } from '../models/ChartTypes';
import ChartControls from './ChartControls';

/**
 * Container component for ChartHeader, ChartFilters, ChartControls and ChartView.
 * Depends on chartView.mode to switch modes from showing chart and chart editor. 
 */
const ChartWidget = () => {

    const { state, dispatch } = useContext(ChartState.ChartContext);
    
    const showChartEditor = state.chartView.mode == ChartModes.ShowChartEditor || state.chartView.mode == ChartModes.ShowChartCreator;
    const showCharts = state.chartView.mode == ChartModes.ShowCharts;

    return ( 
        <div className="chart-widget"> 
            <ChartHeader></ChartHeader>
            { showCharts ? <ChartFilters></ChartFilters> : null } 
            { showCharts ? <ChartControls></ChartControls> :  null } 
            { showChartEditor ? <ChartEditor></ChartEditor> : null }
            { showCharts ? <ChartView></ChartView> : null }
        </div>
    )
}

export default ChartWidget;