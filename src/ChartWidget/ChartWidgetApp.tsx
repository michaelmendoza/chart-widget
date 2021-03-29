import ChartWidget from './components/ChartWidget';
import ChartState from './states/ChartState';
import ChartStateDebugger from './states/ChartStateDebuger';
import React from 'react';

/**
 * Wrapper for ChartWidget component 
 */
const ChartWidgetApp = () => {
    
    return ( 
        <ChartState.ChartStateProvider>
            <ChartWidget></ChartWidget>
            <ChartStateDebugger></ChartStateDebugger>
        </ChartState.ChartStateProvider>
        
    )
}

export default ChartWidgetApp;